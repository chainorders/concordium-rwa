import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Contracts from "./components/contracts/Contracts";
import { ActionTypes, initialState, reducer } from "./AppState";
import ContractsLayout from "./components/contracts/ContractsLayout";
import ContractLayout from "./components/contracts/ContractLayout";
import { default as IdentityRegistryLayout } from "./components/contracts/IdentityRegistry/Layout";
import { default as IdentityRegistryInitialize } from "./components/contracts/IdentityRegistry/Initialize";
import ConcordiumWalletProvider, { useWallet } from "./components/WalletProvider";
import ConcordiumNodeClientProvider from "./components/NodeClientProvider";
import { Contract } from "./components/contracts/ContractTypes";
import AddAgent from "./components/common/AddAgent";
import RemoveAgent from "./components/contracts/IdentityRegistry/RemoveAgent";
import IsAgent from "./components/contracts/IdentityRegistry/IsAgent";
import Agents from "./components/contracts/IdentityRegistry/Agents";
import RegisterIdentity from "./components/contracts/IdentityRegistry/RegisterIdentity";
import GetIdentity from "./components/contracts/IdentityRegistry/GetIdentity";
import IsVerified from "./components/contracts/IdentityRegistry/IsVerified";
import DeleteIdentity from "./components/contracts/IdentityRegistry/DeleteIdentities";
import { addAgent as identityRegistryAddAgent } from "./lib/IdentityRegistryContract";

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

	return (
		<ConcordiumNodeClientProvider>
			<ConcordiumWalletProvider>
				<Router>
					<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
						<Header />
						<Routes>
							<Route path="contracts" element={<ContractsLayout />}>
								<Route path="" element={<Contracts contracts={state.contracts} />} />
								<Route
									path="IdentityRegistry/init"
									element={<IdentityRegistryInitialize onSuccess={onContractInitialized} />}
								/>
								<Route path=":index/:subIndex" element={<ContractLayout contracts={state.contracts} />}>
									<Route path="IdentityRegistry" element={<IdentityRegistryLayout />}>
										<Route path="addAgent" element={<AddAgent onClick={identityRegistryAddAgent} />} />
										<Route path="removeAgent" element={<RemoveAgent />} />
										<Route path="isAgent" element={<IsAgent />} />
										<Route path="agents" element={<Agents />} />
										<Route path="identities" element={<div>Identities</div>} />
										<Route path="registerIdentities" element={<RegisterIdentity />} />
										<Route path="getIdentity" element={<GetIdentity />} />
										<Route path="isVerified" element={<IsVerified />} />
										<Route path="deleteIdentities" element={<DeleteIdentity />} />
										<Route path="" element={<Navigate to="identities" />} />
									</Route>
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
