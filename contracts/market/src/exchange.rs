use concordium_cis2::{AdditionalData, Cis2Client, TokenAmountU64, Transfer};
use concordium_std::{
    ops::{Add, Sub},
    *,
};

use crate::state::TokenOwnerUId;

use super::{
    error::Error,
    event::{Event, PaymentAmount, PaymentTokenUId, TokenDeListed, TokenExchanged},
    state::State,
    types::{ContractResult, ExchangeRate, *},
};

#[derive(Serialize, SchemaType)]
pub struct ExchangeParams {
    /// Listed token id.
    pub token_id: TokenUId,
    /// Listed token owner.
    pub owner:    AccountAddress,
    /// Amount of listed token to exchange.
    pub amount:   Cis2TokenAmount,
    /// Exchange rate to use.
    pub rate:     ExchangeRate,
    /// Payer Account
    pub payer:    AccountAddress,
}

pub struct AmountsRaw {
    pub pay:        u64,
    pub buy:        u64,
    pub commission: u64,
}

#[derive(Serialize, SchemaType)]
pub struct Amounts {
    /// Amount of listed token to buy.
    pub buy:        Cis2TokenAmount,
    /// Amount of payment token which will be credited to the seller of Buy
    /// Token.
    pub pay:        PaymentAmount,
    /// The token which will be used to pay the seller of Listed / Buy Token.
    pub pay_token:  PaymentTokenUId,
    /// Amount of payment token which will be credited to the contract owner as
    /// commission.
    pub commission: PaymentAmount,
}

#[receive(
    contract = "rwa_market",
    name = "exchange",
    enable_logger,
    mutable,
    payable,
    parameter = "ExchangeParams",
    error = "super::error::Error"
)]
pub fn exchange(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    amount_paid: Amount,
    logger: &mut Logger,
) -> ContractResult<()> {
    let params: ExchangeParams = ctx.parameter_cursor().get()?;
    ensure!(ctx.sender().matches_account(&params.payer), Error::Unauthorized);

    exchange_internal(ctx.self_address(), ctx.owner(), params, amount_paid, host, logger)
}

#[receive(
    contract = "rwa_market",
    name = "calculateAmounts",
    parameter = "ExchangeParams",
    error = "super::error::Error",
    return_value = "Amounts"
)]
pub fn calculate_amounts(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Amounts> {
    let params: ExchangeParams = ctx.parameter_cursor().get()?;
    let commission_rate = host.state().commission();
    let amounts = calculate_amounts_internal(&params, &commission_rate)?;

    Ok(amounts)
}

pub fn exchange_internal(
    self_address: ContractAddress,
    contract_owner: AccountAddress,
    params: ExchangeParams,
    ccd_amount_paid: Amount,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let buy_token_id = TokenOwnerUId::new(params.token_id.clone(), params.owner);
    let amounts = {
        let state = host.state();
        let commission_rate = state.commission();
        let amounts = calculate_amounts_internal(&params, &commission_rate)?;

        //validations
        ensure!(state.listed_amount(&buy_token_id).ge(&amounts.buy), Error::InsufficientSupply);
        match (&amounts.pay_token, &amounts.pay, &amounts.commission) {
            (
                PaymentTokenUId::CCD,
                PaymentAmount::CCD(pay_amount),
                PaymentAmount::CCD(commission),
            ) => {
                let total_payment_amount = pay_amount.add(*commission);
                ensure!(total_payment_amount.gt(&Amount::zero()), Error::InsufficientPayment);
                ensure!(ccd_amount_paid.ge(&total_payment_amount), Error::InsufficientPayment);
            }
            (
                PaymentTokenUId::Cis2(pay_token_id),
                PaymentAmount::Cis2(pay_amount),
                PaymentAmount::Cis2(commission),
            ) => {
                let total_payment_amount = pay_amount.add(*commission);
                ensure!(total_payment_amount.gt(&0.into()), Error::InsufficientPayment);
                ensure!(ccd_amount_paid.eq(&Amount::zero()), Error::PaymentNotRequired);
                ensure!(state.can_be_paid_by(pay_token_id), Error::InvalidPaymentToken);
                ensure!(
                    state.unlisted_amount(pay_token_id, &params.payer).ge(&total_payment_amount),
                    Error::InsufficientDeposits
                );
            }
            _ => unreachable!(),
        }

        amounts
    };

    //settlement
    Cis2Client::new(buy_token_id.token_id.contract)
        .transfer::<_, _, _, ()>(host, Transfer {
            token_id: buy_token_id.token_id.id.to_owned(),
            amount:   amounts.buy,
            from:     Address::Contract(self_address),
            to:       concordium_cis2::Receiver::Account(params.payer),
            data:     AdditionalData::empty(),
        })
        .map_err(|_| Error::Cis2SettlementError)?;

    let is_de_listed = {
        let state = host.state_mut();
        let is_de_listed = state.decrease_listed_amount(&buy_token_id, &amounts.buy);
        state.decrease_deposit(&buy_token_id, &amounts.buy);
        is_de_listed
    };

    match (&amounts.pay_token, &amounts.pay, &amounts.commission) {
        (
            PaymentTokenUId::CCD,
            PaymentAmount::CCD(pay_amount),
            PaymentAmount::CCD(commission_amount),
        ) => {
            if pay_amount.gt(&Amount::zero()) {
                host.invoke_transfer(&params.owner, *pay_amount)
                    .map_err(|_| Error::CCDPaymentError)?;
            }
            if commission_amount.gt(&Amount::zero()) {
                host.invoke_transfer(&contract_owner, *commission_amount)
                    .map_err(|_| Error::CCDCommissionPaymentError)?;
            }
        }
        (
            PaymentTokenUId::Cis2(pay_token_id),
            PaymentAmount::Cis2(pay_amount),
            PaymentAmount::Cis2(commission_amount),
        ) => {
            let pay_token_contract = Cis2Client::new(pay_token_id.contract);
            pay_token_contract
                .transfer::<_, _, _, ()>(host, Transfer {
                    token_id: pay_token_id.id.to_owned(),
                    amount:   *pay_amount,
                    from:     Address::Contract(self_address),
                    to:       concordium_cis2::Receiver::Account(params.owner),
                    data:     AdditionalData::empty(),
                })
                .map_err(|_| Error::Cis2PaymentError)?;
            pay_token_contract
                .transfer::<_, _, _, ()>(host, Transfer {
                    token_id: pay_token_id.id.to_owned(),
                    amount:   *commission_amount,
                    from:     Address::Contract(self_address),
                    to:       concordium_cis2::Receiver::Account(contract_owner),
                    data:     AdditionalData::empty(),
                })
                .map_err(|_| Error::Cis2CommissionPaymentError)?;
            // Decrease the deposited amount from the payer account.
            host.state_mut().decrease_deposit(
                &TokenOwnerUId::new(pay_token_id.to_owned(), params.payer),
                &pay_amount.add(*commission_amount),
            );
        }
        _ => unreachable!(),
    }

    logger.log(&Event::Exchanged(TokenExchanged {
        buy_token_id:      buy_token_id.token_id.to_owned(),
        buy_token_owner:   buy_token_id.owner,
        buy_amount:        amounts.buy,
        pay_token_id:      amounts.pay_token,
        pay_token_owner:   params.payer,
        pay_amount:        amounts.pay,
        commission_amount: amounts.commission,
    }))?;

    // De Listed Event is logged after the exchange event to ensure that the
    // exchange event is processed before the de listed event.
    if is_de_listed {
        logger.log(&Event::DeListed(TokenDeListed {
            token_id: buy_token_id.token_id,
            owner:    buy_token_id.owner,
        }))?;
    }
    Ok(())
}

fn calculate_amounts_internal(
    params: &ExchangeParams,
    commission_rate: &Rate,
) -> Result<Amounts, Error> {
    let amounts = match &params.rate {
        ExchangeRate::Ccd(rate) => {
            let amounts = calculate_amounts_raw(rate, &params.amount.0, commission_rate)?;
            let pay_amount = Amount::from_ccd(amounts.pay);
            let commission_amount = Amount::from_ccd(amounts.commission);
            let buy_amount = TokenAmountU64(amounts.buy);

            Amounts {
                buy:        buy_amount,
                pay:        PaymentAmount::CCD(pay_amount),
                pay_token:  PaymentTokenUId::CCD,
                commission: PaymentAmount::CCD(commission_amount),
            }
        }
        ExchangeRate::Cis2((pay_token_id, rate)) => {
            let amounts = calculate_amounts_raw(rate, &params.amount.0, commission_rate)?;
            let pay_amount = TokenAmountU64(amounts.pay);
            let commission_amount = TokenAmountU64(amounts.commission);
            let buy_amount = TokenAmountU64(amounts.buy);

            Amounts {
                buy:        buy_amount,
                pay:        PaymentAmount::Cis2(pay_amount),
                pay_token:  PaymentTokenUId::Cis2(pay_token_id.clone()),
                commission: PaymentAmount::Cis2(commission_amount),
            }
        }
    };

    Ok(amounts)
}

fn calculate_amounts_raw(
    conversion_rate: &Rate,
    buy_amount: &u64,
    commission_rate: &Rate,
) -> Result<AmountsRaw, Error> {
    let (pay_amount, remaining_buy_amount) = conversion_rate.convert(buy_amount)?;
    let buy_amount = buy_amount.sub(remaining_buy_amount);
    let (commission_amount, _) = commission_rate.convert(&pay_amount)?;
    ensure!(commission_amount.le(&pay_amount), Error::InvalidCommission);
    let pay_amount = pay_amount.sub(commission_amount);

    Ok(AmountsRaw {
        pay:        pay_amount,
        buy:        buy_amount,
        commission: commission_amount,
    })
}

#[cfg(test)]
mod test {
    use concordium_cis2::{TokenAmountU64, TokenAmountU8, TokenIdU8, TokenIdVec};
    use concordium_std::{Cursor, Deserial, Serial};

    #[test]
    fn test_calculate_amounts() {
        use super::*;
        let conversion_rate = Rate::new(1, 2).unwrap();
        let commission_rate = Rate::new(1, 10).unwrap();
        let amounts = calculate_amounts_raw(&conversion_rate, &10, &commission_rate).unwrap();
        assert_eq!(amounts.pay, 5);
        assert_eq!(amounts.buy, 10);
        assert_eq!(amounts.commission, 0);

        let conversion_rate = Rate::new(1, 2).unwrap();
        let commission_rate = Rate::new(1, 10).unwrap();
        let amounts = calculate_amounts_raw(&conversion_rate, &11, &commission_rate).unwrap();
        assert_eq!(amounts.pay, 5);
        assert_eq!(amounts.buy, 10);
        assert_eq!(amounts.commission, 0);

        let conversion_rate = Rate::new(1, 2).unwrap();
        let commission_rate = Rate::new(1, 10).unwrap();
        let amounts = calculate_amounts_raw(&conversion_rate, &120, &commission_rate).unwrap();
        assert_eq!(amounts.pay, 54);
        assert_eq!(amounts.buy, 120);
        assert_eq!(amounts.commission, 6);

        let conversion_rate = Rate::new(2, 1).unwrap();
        let commission_rate = Rate::new(1, 10).unwrap();
        let amounts = calculate_amounts_raw(&conversion_rate, &120, &commission_rate).unwrap();
        assert_eq!(amounts.pay, (120 * 2) - amounts.commission);
        assert_eq!(amounts.buy, 120);
        assert_eq!(amounts.commission, 24);
    }

    #[test]
    fn convert_token_amount_u64_to_u8() {
        let token_amount = TokenAmountU64(1);
        let mut token_amount_bytes: Vec<u8> = Vec::new();
        token_amount.serial(&mut token_amount_bytes).unwrap();
        let mut cursor = Cursor::new(token_amount_bytes);
        let token_amount_u8 = TokenAmountU8::deserial(&mut cursor).unwrap();
        assert!(token_amount_u8.eq(&TokenAmountU8(1)));
    }

    #[test]
    fn convert_token_amount_u8_to_u64() {
        let token_amount = TokenAmountU8(1);
        let mut token_amount_bytes: Vec<u8> = Vec::new();
        token_amount.serial(&mut token_amount_bytes).unwrap();
        let mut cursor = Cursor::new(token_amount_bytes);
        let token_amount_u64 = TokenAmountU64::deserial(&mut cursor).unwrap();
        assert!(token_amount_u64.eq(&TokenAmountU64(1)));
    }

    #[test]
    fn convert_token_id_vec_to_u8() {
        let token_id_u8 = TokenIdU8(255);
        let mut token_id_bytes: Vec<u8> = Vec::new();
        token_id_u8.serial(&mut token_id_bytes).unwrap();
        let mut cursor = Cursor::new(token_id_bytes);

        let token_id_vec = TokenIdVec::deserial(&mut cursor).unwrap();
        let mut token_id_bytes: Vec<u8> = Vec::new();
        token_id_vec.serial(&mut token_id_bytes).unwrap();
        let mut cursor = Cursor::new(token_id_bytes);

        let token_id_u8 = TokenIdU8::deserial(&mut cursor).unwrap();
        assert!(token_id_u8.eq(&TokenIdU8(255)));
    }
}
