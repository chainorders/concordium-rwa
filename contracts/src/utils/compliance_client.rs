use concordium_cis2::{IsTokenAmount, IsTokenId};
use concordium_std::{Address, ContractAddress};

pub struct ComplianceClient {
    compliance: ContractAddress,
}

pub enum ComplianceError {}

impl ComplianceClient {
    pub fn new(compliance: ContractAddress) -> Self {
        ComplianceClient {
            compliance,
        }
    }

    pub fn transferred(
        &self,
        token_id: impl IsTokenId,
        from: Address,
        to: Address,
        amount: impl IsTokenAmount,
    ) -> Result<(), ComplianceError> {
        // todo: implement
        Ok(())
    }
}
