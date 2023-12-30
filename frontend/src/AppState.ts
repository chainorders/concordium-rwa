import { Contract } from "./components/contracts/ContractTypes";

export interface AppState {
	contracts: Contract[];
}

function setLocalStorage(state: AppState) {
	localStorage.setItem("contracts", JSON.stringify(state.contracts));
}

function getLocalStorage(): AppState {
	return {
		contracts: JSON.parse(localStorage.getItem("contracts") || "[]"),
	};
}

export function initialState(): AppState {
	return getLocalStorage();
}

export enum ActionTypes {
	AddContract = "addContract",
}

export type Action = { type: ActionTypes.AddContract; contract: Contract };

export function reducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case ActionTypes.AddContract: {
			const updatedState = {
				...state,
				contracts: [...state.contracts, action.contract],
			};
			setLocalStorage(updatedState);
			return updatedState;
		}
		default:
			return state;
	}
}
