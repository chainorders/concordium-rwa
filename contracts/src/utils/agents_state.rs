use concordium_std::*;

/// Represents the state of agents in the system.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct AgentsState<S> {
    /// A set of agent addresses.
    agents: StateSet<Address, S>,
}

impl<S: HasStateApi> AgentsState<S> {
    /// Creates a new AgentsState.
    ///
    /// # Arguments
    ///
    /// * `agents` - A vector of agent addresses.
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn new(agents: Vec<Address>, state_builder: &mut StateBuilder<S>) -> Self {
        let mut ret = Self {
            agents: state_builder.new_set(),
        };

        for agent in agents {
            ret.add_agent(agent);
        }

        ret
    }

    /// Checks if the given address is an agent.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to check.
    pub fn is_agent(&self, address: &Address) -> bool {
        self.agents.contains(address)
    }

    /// Returns a vector of all agent addresses.
    pub fn get_agents(&self) -> Vec<Address> {
        self.agents.iter().map(|a| *a).collect()
    }

    /// Adds an agent to the state.
    ///
    /// # Arguments
    ///
    /// * `address` - The address of the agent to add.
    pub fn add_agent(&mut self, address: Address) {
        self.agents.insert(address);
    }

    /// Removes an agent from the state.
    ///
    /// # Arguments
    ///
    /// * `address` - The address of the agent to remove.
    pub fn remove_agent(&mut self, address: &Address) {
        self.agents.remove(address);
    }
}

/// Trait for types that have an AgentsState.
pub trait HasAgentsState<S> {
    /// Returns a reference to the AgentsState.
    fn agent_state(&self) -> &AgentsState<S>;

    /// Returns a mutable reference to the AgentsState.
    fn agent_state_mut(&mut self) -> &mut AgentsState<S>;
}