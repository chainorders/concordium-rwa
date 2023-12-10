# Concordium Real World Asset Contracts

## Contracts

### [Security Token Contract](./src/security_nft/mod.rs) : `rwa_security_nft` CIS2 compatible contract for security NFTs

#### Functions Security Token Contract

* [isAgent](./src/security_nft/agent.rs): Verifies if a specific address is designated as an agent within the contract.
* [addAgent](./src/security_nft/agent.rs): Appoints a new agent to the contract, granting them certain permissions.
* [removeAgent](./src/security_nft/agent.rs): Revokes an existing agent from the contract, removing their permissions.
* [balanceOf](./src/security_nft/balance_of.rs): Fetches the token balance of a specific holder.
* [burn](./src/security_nft/burn.rs): Destroys a specific amount of tokens, reducing the total supply.
* [freeze](./src/security_nft/freeze.rs): Temporarily suspends the transferability of a specific token.
* [unfreeze](./src/security_nft/freeze.rs): Reverses the freeze on a specific token, restoring its transferability.
* [balanceOfFrozen](./src/security_nft/freeze.rs): Fetches the balance of frozen tokens for a specific holder.
* [unFrozenBalanceOf](./src/security_nft/freeze.rs): Fetches the balance of unfrozen (transferable) tokens for a specific holder.
* [init](./src/security_nft/init.rs): Initializes the contract with the provided parameters.
* [identityRegistry](./src/security_nft/init.rs): Returns the contract address of the associated identity registry.
* [compliance](./src/security_nft/init.rs): Returns the contract address of the associated compliance contract.
* [mint](./src/security_nft/mint.rs): Creates a new token and adds it to the total supply.
* [operatorOf](./src/security_nft/operator.rs): Verifies if a given address is authorized to manage tokens for a specific owner.
* [updateOperator](./src/security_nft/operator.rs): Updates the operator authorized to manage tokens for a specific owner.
* [pause](./src/security_nft/pause.rs): Pauses all operations for a specific token.
* [unpause](./src/security_nft/pause.rs): Resumes all operations for a specific token.
* [isPaused](./src/security_nft/pause.rs): Verifies if operations for a specific token are currently paused.
* [recover](./src/security_nft/recover.rs): Facilitates the recovery of a lost account, typically by assigning a new owner.
* [recoveryAddress](./src/security_nft/recovery.rs): Retrieves the address that is authorized to recover a specific account.
* [supports](./src/security_nft/supports.rs): Checks if the contract implements a specific interface, returning true if it does.
* [tokenMetadata](./src/security_nft/token_metadata.rs): Provides detailed information about a specific token, including its properties and attributes.
* [transfer](./src/security_nft/transfer.rs): Executes a compliant transfer of a token from the holder to another account. This operation can be performed by the token holder, an authorized operator, or a sponsor contract.
* [forcedTransfer](./src/security_nft/transfer.rs): Executes a transfer of a token even if the transfer is non-compliant, such as when the tokens are frozen or the receiver is not a compliant token holder. This operation can only be performed by an agent.

#### Events Security Token Contract

### [Identity Registry Contract](./src/identity_registry/mod.rs) : `rwa_identity_registry`

### [Compliance Contract](./src/compliance/mod.rs) : `rwa_compliance`

### [Sponsor Contract](./src/sponsor/mod.rs) : `rwa_sponsor` CIS3 compatible contract

#### Functions Sponsor Contract

* [init](./src/sponsor/init.rs): Initializes the contract with the given parameters.
* [permit](./src/sponsor/permit.rs): Calls the functions of the target contract with the given parameters if the caller has provided a valid signature.
* [supportsPermit](./src/sponsor/supports_permit.rs): Returns Supports result containing true if the sponsor contract supports calling the provided input function names
