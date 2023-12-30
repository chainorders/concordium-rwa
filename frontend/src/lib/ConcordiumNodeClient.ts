const concordiumNodeClient = new concordiumWebSdk.ConcordiumGRPCWebClient(
	import.meta.env.VITE_CONCORDIUM_NODE_URL!,
	Number(import.meta.env.VITE_CONCORDIUM_NODE_PORT!)
);

import * as concordiumWebSdk from "@concordium/web-sdk";
export type AccountAddress = concordiumWebSdk.AccountAddress.Type;
export default concordiumNodeClient;
