use std::collections::BTreeMap;

use super::sponsor_client::{Error as SponsorClientError, SponsorClient};
use crate::shared::api::{ApiAccountAddress, ApiContractAddress};
use concordium_rust_sdk::{
    base::contracts_common::{
        AccountSignatures, CredentialSignatures, OwnedEntrypointName, ParseError, Signature,
        SignatureEd25519, Timestamp,
    },
    types::{ContractAddress, Energy, WalletAccount},
};
use concordium_rwa_sponsor::types::{PermitMessage, PermitParam};
use poem_openapi::{payload::Json, ApiResponse, Object, OpenApi};

#[derive(Debug, ApiResponse)]
pub enum Error {
    #[oai(status = 400)]
    BadRequest,
    #[oai(status = 500)]
    InternalServer,
    #[oai(status = 404)]
    NotFound,
}

impl From<SponsorClientError> for Error {
    fn from(_: SponsorClientError) -> Self { Error::InternalServer }
}

#[derive(Object)]
pub struct ApiAccountSignature {
    pub credential_index: u8,
    pub key_index:        u8,
    /// Signature Hex
    pub signature:        String,
}

#[derive(Object)]
pub struct ApiPermitMessage {
    pub contract_address: ApiContractAddress,
    pub nonce:            u64,
    pub timestamp:        u64,
    pub entry_point:      String,
    pub payload:          Vec<u8>,
}

impl TryFrom<ApiPermitMessage> for PermitMessage {
    type Error = ParseError;

    fn try_from(value: ApiPermitMessage) -> Result<Self, Self::Error> {
        Ok(PermitMessage {
            contract_address: value.contract_address.into(),
            nonce:            value.nonce,
            timestamp:        Timestamp::from_timestamp_millis(value.timestamp),
            entry_point:      OwnedEntrypointName::new(value.entry_point)
                .map_err(|_| ParseError::default())?,
            payload:          value.payload,
        })
    }
}

#[derive(Object)]
pub struct ApiKeySignature {
    pub key_index: u8,
    pub signature: String,
}

#[derive(Object)]
pub struct ApiCredentialSignature {
    pub credential_index: u8,
    pub sigs:             Vec<ApiKeySignature>,
}

#[derive(Object)]
pub struct ApiAccountSignatures {
    sigs: Vec<ApiCredentialSignature>,
}

impl TryFrom<ApiAccountSignatures> for AccountSignatures {
    type Error = ParseError;

    fn try_from(value: ApiAccountSignatures) -> Result<Self, Self::Error> {
        Ok(AccountSignatures {
            sigs: value
                .sigs
                .into_iter()
                .map(|s| {
                    let sigs = to_credential_signatures(s.sigs)?;
                    Ok((s.credential_index, sigs))
                })
                .collect::<Result<Vec<_>, ParseError>>()?
                .into_iter()
                .collect(),
        })
    }
}

fn to_credential_signatures(
    sigs: Vec<ApiKeySignature>,
) -> Result<CredentialSignatures, ParseError> {
    let sigs: BTreeMap<u8, Signature> = sigs
        .into_iter()
        .map(|s| {
            let sig = to_key_signature(s.signature)?;
            Ok((s.key_index, sig))
        })
        .collect::<Result<Vec<_>, ParseError>>()?
        .into_iter()
        .collect();
    Ok(CredentialSignatures {
        sigs,
    })
}

fn to_key_signature(signature: String) -> Result<Signature, ParseError> {
    let mut sig: [u8; 64] = [0; 64];
    hex::decode_to_slice(signature, &mut sig).map_err(|_| ParseError::default())?;
    Ok(Signature::Ed25519(SignatureEd25519(sig)))
}

#[derive(Object)]
pub struct ApiPermitParam {
    signer:    ApiAccountAddress,
    signature: ApiAccountSignatures,
    message:   ApiPermitMessage,
}

impl TryFrom<ApiPermitParam> for PermitParam {
    type Error = ParseError;

    fn try_from(value: ApiPermitParam) -> Result<Self, Self::Error> {
        Ok(PermitParam {
            signer:    value.signer.parse().map_err(|_| ParseError::default())?,
            signature: value.signature.try_into()?,
            message:   value.message.try_into()?,
        })
    }
}

#[derive(Object)]
pub struct ApiPermitResponse {
    pub txn_hash: String,
}

pub struct Api {
    pub contract:          ContractAddress,
    pub wallet:            WalletAccount,
    pub concordium_client: concordium_rust_sdk::v2::Client,
    pub max_energy:        Energy,
}

#[OpenApi]
impl Api {
    #[oai(path = "/sponsor/permit", method = "post")]
    pub async fn permit(
        &self,
        request: Json<ApiPermitParam>,
    ) -> Result<Json<ApiPermitResponse>, Error> {
        let permit_param: PermitParam = request.0.try_into().map_err(|_| Error::BadRequest)?;
        let txn_hash = SponsorClient::new(self.concordium_client.clone(), self.contract)
            .permit(&self.wallet, self.max_energy, permit_param)
            .await?;

        Ok(Json(ApiPermitResponse {
            txn_hash: txn_hash.to_string(),
        }))
    }
}
