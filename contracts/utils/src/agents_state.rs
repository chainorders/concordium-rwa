use concordium_std::{Address, HasStateApi, StateSet};

pub type Agent = Address;

/// Trait for managing agents in a state.
pub trait IsAgentsState<S: HasStateApi> {
    /// Returns a reference to the set of agents.
    ///
    /// # Returns
    ///
    /// A reference to the set of agents.
    fn agents(&self) -> &StateSet<Agent, S>;

    /// Returns a mutable reference to the set of agents.
    ///
    /// # Returns
    ///
    /// A mutable reference to the set of agents.
    fn agents_mut(&mut self) -> &mut StateSet<Agent, S>;

    /// Checks if the given address is an agent.
    ///
    /// # Arguments
    ///
    /// * `agent` - An address to check.
    ///
    /// # Returns
    ///
    /// A boolean indicating whether the address is an agent.
    fn is_agent(&self, agent: &Agent) -> bool { self.agents().contains(agent) }

    /// Adds the given address to the set of agents.
    ///
    /// # Arguments
    ///
    /// * `agent` - An address to add.
    ///
    /// # Returns
    ///
    /// A boolean indicating whether the address was added successfully.
    fn add_agent(&mut self, agent: Agent) -> bool { self.agents_mut().insert(agent) }

    /// Removes the given address from the set of agents.
    ///
    /// # Arguments
    ///
    /// * `agent` - An address to remove.
    ///
    /// # Returns
    ///
    /// A boolean indicating whether the address was removed successfully.
    fn remove_agent(&mut self, agent: &Agent) -> bool { self.agents_mut().remove(agent) }

    /// Returns a list of all agents.
    ///
    /// # Returns
    ///
    /// A vector containing all agents.
    fn list_agents(&self) -> Vec<Agent> { self.agents().iter().map(|a| *a).collect() }
}
