import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Contracts from "./components/contracts/Contracts";
import { ActionTypes, initialState, reducer } from "./AppState";
import ContractsLayout from "./components/contracts/ContractsLayout";
import ContractLayout from "./components/contracts/ContractLayout";
import ContractTypeLayout from "./components/contracts/ContractTypeLayout";
import { default as IdentityRegistryInitialize } from "./components/contracts/IdentityRegistry/Initialize";
import ConcordiumWalletProvider, { useWallet } from "./components/WalletProvider";
import ConcordiumNodeClientProvider from "./components/NodeClientProvider";
import { Contract, ContractType } from "./components/contracts/ContractTypes";
import AddAgent from "./components/common/agentsContract/AddAgent";
import RemoveAgent from "./components/common/agentsContract/RemoveAgent";
import IsAgent from "./components/common/agentsContract/IsAgent";
import Agents from "./components/common/agentsContract/Agents";
import RegisterIdentity from "./components/contracts/IdentityRegistry/RegisterIdentity";
import GetIdentity from "./components/contracts/IdentityRegistry/GetIdentity";
import IsVerified from "./components/contracts/IdentityRegistry/IsVerified";
import DeleteIdentity from "./components/contracts/IdentityRegistry/DeleteIdentities";
import {
	ENTRYPOINTS as ID_REG_ENTRYPOINTS,
	ENTRYPOINT_NAMES as ID_REG_ENTRYPOINT_NAMES,
	errorString as isRegErrorString,
	addAgent as idRegAddAgent,
	removeAgent as idRegRemoveAgent,
	isAgent as idRegisAgent,
	getAgents as isRegGetAgents,
} from "./lib/IdentityRegistryContract";
import ErrorDisplay from "./components/common/ErrorDisplay";
import { default as ComplianceModuleAllowedNationalitiesInitialize } from "./components/contracts/compliance/modules/allowedNationalities/Initialize";
import {
	ENTRYPOINTS as CM_ENTRYPOINTS,
	ENTRYPOINT_NAMES as CM_ENTRYPOINT_NAMES,
	canTransfer as cmCanTransfer,
} from "./lib/ComplianceModuleAllowedNationalities";
import CanTransfer from "./components/contracts/compliance/CanTransfer";
import { default as ComplianceInitialize } from "./components/contracts/compliance/Initialize";
import {
	ENTRYPOINTS as COMPLIANCE_ENTRYPOINTS,
	ENTRYPOINT_NAMES as COMPLIANCE_ENTRYPOINT_NAMES,
	addAgent as compAddAgent,
	errorString as compErrorString,
	isAgent as compIsAgent,
	getAgents as compGetAgents,
	removeAgent as compRemoveAgent,
	canTransfer as compCanTransfer,
} from "./lib/Compliance";
import {
	ENTRYPOINTS as NFT_ENTRYPOINTS,
	ENTRYPOINT_NAMES as NFT_ENTRYPOINT_NAMES,
	isAgent as nftIsAgent,
	addAgent as nftAddAgent,
	errorString as nftErrorString,
	removeAgent as nftRemoveAgent,
	getAgents as nftGetAgents,
} from "./lib/NftContract";
import Initialize from "./components/contracts/securityNft/Initialize";
import Mint from "./components/contracts/securityNft/Mint";
import Transfer from "./components/contracts/securityNft/Transfer";
import Burn from "./components/contracts/securityNft/Burn";
import BalanceOf from "./components/contracts/securityNft/BalanceOf";

// Header component
function Header() {
	const [accounts, setAccounts] = useState([] as string[]);
	const { provider } = useWallet();
	provider?.requestAccounts().then(setAccounts);

	return (
		<AppBar position="static" sx={{ marginBottom: 2 }}>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="h6">Concordium RWA</Typography>
				{provider && accounts.length > 1 && (
					<Select
						value={accounts[0]}
						sx={{
							color: "white",
							"&:before": { borderColor: "white" },
							"&:after": { borderColor: "white" },
						}}
						inputProps={{
							classes: {
								icon: "white",
							},
						}}>
						{accounts.map((account) => (
							<MenuItem value={account} key={account}>
								{account}
							</MenuItem>
						))}
					</Select>
				)}
			</Toolbar>
		</AppBar>
	);
}

function Footer() {
	return (
		<Box
			sx={{
				width: "100%", // full width
				height: "60px", // fixed height
				backgroundColor: "grey.900", // dark background color
				color: "white", // white text color
				position: "fixed", // fixed position
				bottom: 0, // stick to bottom
				display: "flex", // use flexbox for centering content
				alignItems: "center", // center content vertically
				justifyContent: "center", // center content horizontally
				padding: "0 16px", // horizontal padding
			}}>
			{/* Footer content goes here */}
		</Box>
	);
}

// Main layout component
function Layout() {
	const [state, dispatch] = useReducer(reducer, initialState());
	const onContractInitialized = (contract: Contract) => {
		dispatch({ type: ActionTypes.AddContract, contract });
	};
	const onDeleteContract = (contract: Contract) => {
		dispatch({ type: ActionTypes.RemoveContract, contract });
	};

	return (
		<ConcordiumNodeClientProvider>
			<ConcordiumWalletProvider>
				<Router>
					<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
						<Header />
						<Routes>
							<Route path="contracts" element={<ContractsLayout />}>
								<Route path="" element={<Contracts contracts={state.contracts} onDelete={onDeleteContract} />} />
								<Route path="init">
									<Route
										path="IdentityRegistry"
										element={<IdentityRegistryInitialize onSuccess={onContractInitialized} />}
									/>
									<Route
										path="ComplianceModule/AllowedNationalities"
										element={
											<ComplianceModuleAllowedNationalitiesInitialize
												onSuccess={onContractInitialized}
												identityRegistries={state.contracts.filter((c) => c.type == ContractType.IdentityRegistry)}
											/>
										}
									/>
									<Route
										path="Compliance"
										element={
											<ComplianceInitialize
												onSuccess={onContractInitialized}
												complianceModules={state.contracts.filter((c) => c.type == ContractType.ComplianceModule)}
											/>
										}
									/>
									<Route
										path="Nft"
										element={
											<Initialize
												onSuccess={onContractInitialized}
												complianceContracts={state.contracts.filter((c) => c.type == ContractType.Compliance)}
												identityRegistries={state.contracts.filter((c) => c.type == ContractType.IdentityRegistry)}
											/>
										}
									/>
									<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
								</Route>
								<Route path=":index/:subIndex" element={<ContractLayout contracts={state.contracts} />}>
									<Route
										path="IdentityRegistry"
										element={ContractTypeLayout({
											entrypoints: ID_REG_ENTRYPOINTS,
											entrypointDisplayNames: ID_REG_ENTRYPOINT_NAMES,
										})}>
										<Route
											path="addAgent"
											element={<AddAgent onClick={idRegAddAgent} errorString={isRegErrorString} />}
										/>
										<Route
											path="removeAgent"
											element={<RemoveAgent onClick={idRegRemoveAgent} errorString={isRegErrorString} />}
										/>
										<Route path="isAgent" element={<IsAgent isAgent={idRegisAgent} />} />
										<Route path="agents" element={<Agents getAgents={isRegGetAgents} />} />
										<Route path="identities" element={<div>Identities</div>} />
										<Route path="registerIdentities" element={<RegisterIdentity />} />
										<Route path="getIdentity" element={<GetIdentity />} />
										<Route path="isVerified" element={<IsVerified />} />
										<Route path="deleteIdentities" element={<DeleteIdentity />} />
										<Route path="" element={<Navigate to="identities" />} />
										<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
									</Route>
									<Route
										path="ComplianceModule"
										element={ContractTypeLayout({
											entrypoints: CM_ENTRYPOINTS,
											entrypointDisplayNames: CM_ENTRYPOINT_NAMES,
										})}>
										<Route path="canTransfer" element={<CanTransfer canTransfer={cmCanTransfer} />} />
										<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
									</Route>
									<Route
										path="Compliance"
										element={ContractTypeLayout({
											entrypoints: COMPLIANCE_ENTRYPOINTS,
											entrypointDisplayNames: COMPLIANCE_ENTRYPOINT_NAMES,
										})}>
										<Route
											path="addAgent"
											element={<AddAgent onClick={compAddAgent} errorString={compErrorString} />}
										/>
										<Route
											path="removeAgent"
											element={<RemoveAgent onClick={compRemoveAgent} errorString={compErrorString} />}
										/>
										<Route path="isAgent" element={<IsAgent isAgent={compIsAgent} />} />
										<Route path="agents" element={<Agents getAgents={compGetAgents} />} />
										<Route path="canTransfer" element={<CanTransfer canTransfer={compCanTransfer} />} />
										<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
									</Route>
									<Route
										path="Nft"
										element={ContractTypeLayout({
											entrypoints: NFT_ENTRYPOINTS,
											entrypointDisplayNames: NFT_ENTRYPOINT_NAMES,
										})}>
										<Route path="addAgent" element={<AddAgent onClick={nftAddAgent} errorString={nftErrorString} />} />
										<Route
											path="removeAgent"
											element={<RemoveAgent onClick={nftRemoveAgent} errorString={nftErrorString} />}
										/>
										<Route path="isAgent" element={<IsAgent isAgent={nftIsAgent} />} />
										<Route path="agents" element={<Agents getAgents={nftGetAgents} />} />
										<Route path="mint" element={<Mint />} />
										<Route path="transfer" element={<Transfer />} />
										<Route path="burn" element={<Burn />} />
										<Route path="balanceOf" element={<BalanceOf />} />
										<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
									</Route>
									<Route path="*" element={<ErrorDisplay text="Invalid Contract Type" />} />
								</Route>
							</Route>
						</Routes>
						<Footer />
					</Box>
				</Router>
			</ConcordiumWalletProvider>
		</ConcordiumNodeClientProvider>
	);
}

export default Layout;
