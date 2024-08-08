#![allow(clippy::too_many_arguments)]

use super::{
    cis2_conversions::to_token_id_vec,
    cis2_security_test_contract::ICis2SecurityTestContract,
    cis2_test_contract::{ICis2Contract, ICis2ContractExt},
    security_nft::{ISecurityNftContractExt, SecurityNftContract},
    test_contract_client::*,
};
use concordium_cis2::{AdditionalData, Cis2Event, Receiver, TokenIdU32, TokenIdU8, TransferParams};
use concordium_rwa_security_sft::types::*;
use concordium_smart_contract_testing::*;

pub const CONTRACT_NAME: &str = "init_rwa_security_sft";

pub trait ISecuritySftModule: ITestModule {
    fn rwa_security_sft(&self) -> GenericInit<InitParam, Event> {
        GenericInit::<InitParam, Event>::new(self.module_ref(), CONTRACT_NAME)
    }
}

pub trait ISecuritySftContract:
    ITestContract + ICis2SecurityTestContract<TokenId, TokenAmount, Event> {
    fn add_tokens(&self) -> GenericReceive<AddParams, (), Event> {
        GenericReceive::<AddParams, (), Event>::new(
            self.contract_address(),
            Self::contract_name(),
            "addTokens",
            self.max_energy(),
        )
    }

    fn mint(&self) -> GenericReceive<MintParam, (), Event> {
        GenericReceive::<MintParam, (), Event>::new(
            self.contract_address(),
            Self::contract_name(),
            "mint",
            self.max_energy(),
        )
    }

    fn deposit(&self) -> GenericReceive<DepositParams, (), Event> {
        GenericReceive::<DepositParams, (), Event>::new(
            self.contract_address(),
            Self::contract_name(),
            "deposit",
            self.max_energy(),
        )
    }

    fn withdraw(&self) -> GenericReceive<WithdrawParams, (), Event> {
        GenericReceive::<WithdrawParams, (), Event>::new(
            self.contract_address(),
            Self::contract_name(),
            "withdraw",
            self.max_energy(),
        )
    }

    fn balance_of_deposited(&self) -> GenericReceive<BalanceOfDepositParams, (), Event> {
        GenericReceive::<BalanceOfDepositParams, (), Event>::new(
            self.contract_address(),
            Self::contract_name(),
            "balanceOfDeposited",
            self.max_energy(),
        )
    }
}

pub trait ISecuritySftContractExt: ISecuritySftContract {
    fn mint_via_deposit(
        &self,
        chain: &mut Chain,
        agent: &Account,
        nft_contract: &SecurityNftContract,
        owner: &Account,
        nft_metadata: concordium_rwa_security_nft::types::ContractMetadataUrl,
        sft_metadata: concordium_rwa_security_sft::types::ContractMetadataUrl,
        fractions: u64,
    ) -> (TokenIdU8, TokenIdU32) {
        let (nft_token_id, sft_added_token_id) = self.add_single_token_nft_mint(
            chain,
            agent,
            nft_contract,
            owner,
            nft_metadata,
            sft_metadata,
            fractions,
        );

        let mint_params = MintParam {
            deposited_token_id:    NftTokenUId {
                contract: nft_contract.contract_address(),
                id:       to_token_id_vec(nft_token_id),
            },
            deposited_amount:      concordium_cis2::TokenAmountU8(1),
            deposited_token_owner: owner.address,
            owner:                 Receiver::Account(owner.address),
        };

        nft_contract
            .transfer()
            .update(
                chain,
                owner,
                &TransferParams(vec![concordium_cis2::Transfer {
                    amount:   concordium_cis2::TokenAmountU8(1),
                    from:     Address::Account(owner.address),
                    to:       concordium_cis2::Receiver::Contract(
                        self.contract_address(),
                        OwnedEntrypointName::new_unchecked("deposit".to_string()),
                    ),
                    token_id: nft_token_id,
                    data:     AdditionalData::empty(),
                }]),
            )
            .expect("NFT: Transfer");

        let mint_res = self.mint().update(chain, owner, &mint_params).expect("SFT: Mint");
        let sft_minted_token_ids = self
            .deposit()
            .parse_events(&mint_res)
            .expect("SFT: Deposit parsing events")
            .iter()
            .filter_map(|e| {
                if let Event::Cis2(Cis2Event::Mint(e)) = e {
                    Some(e.token_id)
                } else {
                    None
                }
            })
            .collect::<Vec<_>>();
        let sft_minted_token_id =
            *sft_minted_token_ids.first().expect("SFT: First minted token Id");
        assert_eq!(sft_minted_token_id, sft_added_token_id);

        (nft_token_id, sft_added_token_id)
    }

    fn mint_via_transfer(
        &self,
        chain: &mut Chain,
        agent: &Account,
        nft_contract: &SecurityNftContract,
        owner: &Account,
        nft_metadata: concordium_rwa_security_nft::types::ContractMetadataUrl,
        sft_metadata: concordium_rwa_security_sft::types::ContractMetadataUrl,
        fractions: u64,
    ) -> (TokenIdU8, TokenIdU32) {
        let (nft_token_id, sft_added_token_id) = self.add_single_token_nft_mint(
            chain,
            agent,
            nft_contract,
            owner,
            nft_metadata,
            sft_metadata,
            fractions,
        );

        let mint_params = MintParam {
            deposited_token_id:    NftTokenUId {
                contract: nft_contract.contract_address(),
                id:       to_token_id_vec(nft_token_id),
            },
            deposited_amount:      concordium_cis2::TokenAmountU8(1),
            deposited_token_owner: owner.address,
            owner:                 Receiver::Account(owner.address),
        };

        // Transfer Nft token to Sft contract and mint Sft token
        let sft_minted_token_id = {
            let nft_transfer_res = nft_contract
                .transfer()
                .update(
                    chain,
                    owner,
                    &TransferParams(vec![concordium_cis2::Transfer {
                        amount:   concordium_cis2::TokenAmountU8(1),
                        from:     Address::Account(owner.address),
                        to:       concordium_cis2::Receiver::Contract(
                            self.contract_address(),
                            OwnedEntrypointName::new_unchecked("deposit".to_string()),
                        ),
                        token_id: nft_token_id,
                        data:     AdditionalData::from(to_bytes(&mint_params)),
                    }]),
                )
                .expect("NFT: Transfer & SFT Mint");
            let sft_minted_token_ids = self
                .deposit()
                .parse_events(&nft_transfer_res)
                .expect("SFT: Deposit parsing events")
                .iter()
                .filter_map(|e| {
                    if let Event::Cis2(Cis2Event::Mint(e)) = e {
                        Some(e.token_id)
                    } else {
                        None
                    }
                })
                .collect::<Vec<_>>();
            *sft_minted_token_ids.first().expect("SFT: First minted token Id")
        };
        // Assert that the minted token id is the same as the added token id
        assert_eq!(sft_minted_token_id, sft_added_token_id);

        (nft_token_id, sft_added_token_id)
    }

    fn add_single_token_nft_mint(
        &self,
        chain: &mut Chain,
        agent: &Account,
        nft_contract: &SecurityNftContract,
        owner: &Account,
        nft_metadata: concordium_rwa_security_nft::types::ContractMetadataUrl,
        sft_metadata: ContractMetadataUrl,
        fractions: u64,
    ) -> (TokenIdU8, TokenIdU32) {
        let nft_token_id = nft_contract
            .mint_single_update(chain, agent, Receiver::Account(owner.address), nft_metadata)
            .expect("NFT: Mint");
        let sft_token_id = self
            .add_single_token_update(
                chain,
                agent,
                NftTokenUId {
                    contract: nft_contract.contract_address(),
                    id:       to_token_id_vec(nft_token_id),
                },
                sft_metadata,
                Rate::new(fractions, 1).expect("Rate"),
            )
            .expect("SFT: Add Single Token");
        (nft_token_id, sft_token_id)
    }

    fn add_single_token_update(
        &self,
        chain: &mut Chain,
        sender: &Account,
        deposit_token_id: NftTokenUId,
        metadata_url: ContractMetadataUrl,
        fractions_rate: Rate,
    ) -> Result<TokenId, ContractInvokeError> {
        self.add_tokens()
            .update(chain, sender, &AddParams {
                tokens: vec![AddParam {
                    deposit_token_id,
                    metadata_url,
                    fractions_rate,
                }],
            })
            .map(|r| {
                let sft_token_ids: Vec<_> = self
                    .add_tokens()
                    .parse_events(&r)
                    .expect("SFT: Add Tokens parsing events")
                    .iter()
                    .filter_map(|e| {
                        if let Event::Cis2(Cis2Event::TokenMetadata(e)) = e {
                            Some(e.token_id)
                        } else {
                            None
                        }
                    })
                    .collect();
                *sft_token_ids.first().expect("SFT: First Token Id")
            })
    }
}

pub struct SecuritySftModule {
    pub module_path: String,
}
impl ITestModule for SecuritySftModule {
    fn module_path(&self) -> String { self.module_path.to_owned() }
}
impl ISecuritySftModule for SecuritySftModule {}

pub struct SecuritySftContract(pub ContractAddress);
impl ITestContract for SecuritySftContract {
    fn contract_name() -> OwnedContractName {
        OwnedContractName::new_unchecked(CONTRACT_NAME.to_owned())
    }

    fn contract_address(&self) -> ContractAddress { self.0 }
}
impl ICis2SecurityTestContract<TokenId, TokenAmount, Event> for SecuritySftContract {}
impl ISecuritySftContract for SecuritySftContract {}
impl ISecuritySftContractExt for SecuritySftContract {}
impl ICis2Contract<TokenId, TokenAmount, Event> for SecuritySftContract {}
impl ICis2ContractExt<TokenId, TokenAmount, Event> for SecuritySftContract {}
