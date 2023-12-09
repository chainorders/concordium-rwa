use concordium_cis2::{IsTokenAmount, IsTokenId};
use concordium_std::{Address, ContractAddress};

pub struct ComplianceClient {}

pub enum ComplianceError {}

impl ComplianceClient {
    pub fn new(_compliance: ContractAddress) -> Self {
        ComplianceClient {}
    }

    pub fn can_transfer(
        &self,
        _token_id: impl IsTokenId,
        _from: Address,
        _to: Address,
        _amount: impl IsTokenAmount,
    ) -> Result<bool, ComplianceError> {
        // todo: implement
        Ok(true)
    }

    pub fn transferred(
        &self,
        _token_id: impl IsTokenId,
        _from: Address,
        _to: Address,
        _amount: impl IsTokenAmount,
    ) -> Result<(), ComplianceError> {
        // todo: implement
        Ok(())
    }

    pub fn minted(
        &self,
        _token_id: impl IsTokenId,
        _owner: Address,
        _amount: impl IsTokenAmount,
    ) -> Result<(), ComplianceError> {
        // todo: implement
        Ok(())
    }

    pub fn burned(
        &self,
        _token_id: impl IsTokenId,
        _owner: Address,
        _amount: impl IsTokenAmount,
    ) -> Result<(), ComplianceError> {
        // todo: implement
        Ok(())
    }
}
