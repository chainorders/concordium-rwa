import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useReducer, useState } from "react";
import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Contracts from "./components/contracts/Contracts";
import { ActionTypes, initialState, reducer } from "./AppState";
import ContractsLayout from "./components/contracts/ContractsLayout";
import ConcordiumWalletProvider, { useWallet } from "./components/WalletProvider";
import ConcordiumNodeClientProvider from "./components/NodeClientProvider";
import { Contract, ContractType } from "./components/contracts/ContractTypes";
import ErrorDisplay from "./components/common/ErrorDisplay";
import { default as RwaSecurityNftInitialize } from "./components/contracts/RwaSecurityNftInitialize";
import ContractLayout from "./components/contracts/ContractLayout";
import ConcordiumContract from "./components/contracts/ConcordiumContract";
import {
	ENTRYPOINTS as rwaSecurityNftEntrypoints,
	ENTRYPOINT_DISPLAY_NAMES as rwaSecurityNftEntrypointNames,
} from "./lib/rwaSecurityNft";
import { ENTRYPOINTS_UI as rwaSecurityNftEntrypointsUI } from "./lib/rwaSecurityNftUi";
import { default as IdentityRegistryInitialize } from "./components/contracts/RwaIdentityRegistryInitialize";
import {
	ENTRYPOINT_DISPLAY_NAMES as rwaIdentityRegistryEntrypointNames,
	ENTRYPOINTS as rwaIdentityRegistryEntrypoints,
} from "./lib/rwaIdentityRegistry";
import { ENTRYPOINTS_UI as rwaIdentityRegistryEntrypointsUI } from "./lib/rwaIdentityRegistryUi";
import { default as ComplianceInitialize } from "./components/contracts/RwaComplianceInitialize";
import {
	ENTRYPOINT_DISPLAY_NAMES as rwaComplianceEntrypointNames,
	ENTRYPOINTS as rwaComplianceEntrypoints,
} from "./lib/rwaCompliance";
import { ENTRYPOINTS_UI as rwaComplianceEntrypointsUI } from "./lib/rwaComplianceUi";
import { default as RWAComplianceModuleInitialize } from "./components/contracts/RwaComplianceModuleAllowedNationalitiesInitialize";
import {
	ENTRYPOINT_DISPLAY_NAMES as rwaComplianceModuleEntrypointNames,
	ENTRYPOINTS as rwaComplianceModuleEntrypoints,
} from "./lib/rwaComplianceModuleAllowedNationalities";
import { ENTRYPOINTS_UI as rwaComplianceModuleEntrypointsUI } from "./lib/rwaComplianceModuleAllowedNationalitiesUi";

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
								<Route path={ContractType.RwaIdentityRegistry}>
									<Route path="init" element={<IdentityRegistryInitialize onSuccess={onContractInitialized} />} />
									<Route path=":index/:subIndex/*" element={<ContractLayout contracts={state.contracts} />}>
										<Route
											path="*"
											element={
												<ConcordiumContract
													entrypoints={rwaIdentityRegistryEntrypoints}
													entrypointDisplayNames={rwaIdentityRegistryEntrypointNames}
													entrypointUi={rwaIdentityRegistryEntrypointsUI}
												/>
											}
										/>
									</Route>
								</Route>
								<Route path={ContractType.RwaCompliance}>
									<Route
										path="init"
										element={
											<ComplianceInitialize
												onSuccess={onContractInitialized}
												complianceModules={state.contracts.filter((c) => c.type == ContractType.RwaComplianceModule)}
											/>
										}
									/>
									<Route path=":index/:subIndex/*" element={<ContractLayout contracts={state.contracts} />}>
										<Route
											path="*"
											element={
												<ConcordiumContract
													entrypoints={rwaComplianceEntrypoints}
													entrypointDisplayNames={rwaComplianceEntrypointNames}
													entrypointUi={rwaComplianceEntrypointsUI}
												/>
											}
										/>
									</Route>
								</Route>
								<Route path={ContractType.RwaSecurityNft}>
									<Route
										path="init"
										element={
											<RwaSecurityNftInitialize
												onSuccess={onContractInitialized}
												identityRegistries={state.contracts.filter(
													(contract) => contract.type === ContractType.RwaIdentityRegistry
												)}
												complianceContracts={state.contracts.filter(
													(contract) => contract.type === ContractType.RwaCompliance
												)}
											/>
										}
									/>
									<Route path=":index/:subIndex/*" element={<ContractLayout contracts={state.contracts} />}>
										<Route
											path="*"
											element={
												<ConcordiumContract
													entrypoints={rwaSecurityNftEntrypoints}
													entrypointDisplayNames={rwaSecurityNftEntrypointNames}
													entrypointUi={rwaSecurityNftEntrypointsUI}
												/>
											}
										/>
									</Route>
								</Route>
								<Route path={ContractType.RwaComplianceModule}>
									<Route
										path="init"
										element={
											<RWAComplianceModuleInitialize
												onSuccess={onContractInitialized}
												identityRegistries={state.contracts.filter(
													(contract) => contract.type === ContractType.RwaIdentityRegistry
												)}
											/>
										}
									/>
									<Route path=":index/:subIndex/*" element={<ContractLayout contracts={state.contracts} />}>
										<Route
											path="*"
											element={
												<ConcordiumContract
													entrypoints={rwaComplianceModuleEntrypoints}
													entrypointDisplayNames={rwaComplianceModuleEntrypointNames}
													entrypointUi={rwaComplianceModuleEntrypointsUI}
												/>
											}
										/>
									</Route>
								</Route>

								<Route path="*" element={<ErrorDisplay text="Not Found" />} />
							</Route>
							<Route path="*" element={<ErrorDisplay text="Not Found" />} />
						</Routes>
						<Footer />
					</Box>
				</Router>
			</ConcordiumWalletProvider>
		</ConcordiumNodeClientProvider>
	);
}

export default Layout;
