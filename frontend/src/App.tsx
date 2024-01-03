import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useReducer, useState } from "react";
import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Contracts from "./components/contracts/Contracts";
import { ActionTypes, initialState, reducer } from "./AppState";
import ContractsLayout from "./components/contracts/ContractsLayout";
import { default as IdentityRegistryInitialize } from "./components/contracts/IdentityRegistry/Initialize";
import ConcordiumWalletProvider, { useWallet } from "./components/WalletProvider";
import ConcordiumNodeClientProvider from "./components/NodeClientProvider";
import { Contract, ContractType } from "./components/contracts/ContractTypes";
import ErrorDisplay from "./components/common/ErrorDisplay";
import { default as ComplianceModuleAllowedNationalitiesInitialize } from "./components/contracts/compliance/modules/allowedNationalities/Initialize";
import { default as ComplianceInitialize } from "./components/contracts/compliance/Initialize";
import Initialize from "./components/contracts/securityNft/Initialize";
import { default as ContractComponent } from "./components/contracts/Contract";

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
								<Route path=":index/:subIndex/*" element={<ContractComponent contracts={state.contracts} />} />
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
