use concordium_std::*;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct AgentState<S = StateApi> {
    agents: StateSet<Address, S>,
}

impl AgentState {
    pub fn new(agents: Vec<Address>, state_builder: &mut StateBuilder) -> Self {
        let mut ret = Self {
            agents: state_builder.new_set(),
        };

        for agent in agents {
            ret.add_agent(agent);
        }

        ret
    }

    pub fn is_agent(&self, address: &Address) -> bool {
        self.agents.contains(address)
    }

    pub fn get_agents(&self) -> Vec<Address> {
        self.agents.iter().map(|a| *a).collect()
    }

    pub fn add_agent(&mut self, address: Address) {
        self.agents.insert(address);
    }

    pub fn remove_agent(&mut self, address: &Address) {
        self.agents.remove(address);
    }
}

pub trait HasAgentState<S = StateApi> {
    fn agent_state(&self) -> &AgentState<S>;
    fn agent_state_mut(&mut self) -> &mut AgentState<S>;
}
