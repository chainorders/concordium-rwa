use concordium_std::*;

use concordium_rwa_utils::{agents_state::IsAgentsState, clients::contract_client::IContractState};

pub type Module = ContractAddress;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    pub modules: StateSet<Module, S>,
    pub agents:  StateSet<Address, S>,
}

impl State {
    pub fn new(modules: Vec<Module>, state_builder: &mut StateBuilder) -> Self {
        let mut res = Self {
            modules: state_builder.new_set(),
            agents:  state_builder.new_set(),
        };

        for module in modules {
            res.modules.insert(module);
        }

        res
    }
}

impl IContractState for State {}
impl IsAgentsState<StateApi> for State {
    fn agents(&self) -> &StateSet<Address, StateApi> { &self.agents }

    fn agents_mut(&mut self) -> &mut StateSet<Address, StateApi> { &mut self.agents }
}
