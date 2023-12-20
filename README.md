# Real World Asset (RWA) for Concordium

## Contracts

Please find descriptions for all the available contracts [here](./concordium-rwa/README.md).

### Build Contracts

```bash
yarn run build:contracts
```

### Deploy Contracts

* Edit the [env file](./.env.yarn) with the correct values. These values are used directly with `concordium-client` params to deploy
* Run the following command to deploy the contracts

```bash
yarn run deploy:contracts
```

Kindly note that since the contracts are deployed using the `concordium-client` cli. Which is interactive, you will have to manually enter the password for the account. For every contract being deployed

### Test Contracts

// TODO

### Format Contracts

Install rust nightly

```bash
rustup install nightly-2022-06-09
```

```bash
yarn run format:contracts
```
