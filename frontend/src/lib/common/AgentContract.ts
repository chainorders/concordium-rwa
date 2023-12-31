import { EntrypointName } from "@concordium/web-sdk";

export const AGENT_CONTRACT_ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	isAgent: EntrypointName.fromString("isAgent"),
	agents: EntrypointName.fromString("agents"),
};

export const AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	removeAgent: "Remove Agent",
	isAgent: "Is Agent",
	agents: "Agents",
};
