use concordium_std::*;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct OperatorsState<S> {
    pub addresses: StateMap<Address, StateSet<Address, S>, S>,
}

impl<S: HasStateApi> OperatorsState<S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        OperatorsState {
            addresses: state_builder.new_map(),
        }
    }

    /// Returns true if the given address is an operator for the given owner
    pub fn is_operator(&self, owner: &Address, operator: &Address) -> bool {
        self.addresses.get(owner).map(|set| set.contains(operator)).unwrap_or(false)
    }

    /// Adds the given address as an operator for the given owner
    pub fn add_operator(
        &mut self,
        owner: Address,
        operator: Address,
        state_builder: &mut StateBuilder<S>,
    ) {
        self.addresses
            .entry(owner)
            .or_insert_with(|| state_builder.new_set())
            .modify(|set| set.insert(operator));
    }

    /// Removes the given address as an operator for the given owner
    /// If the `operator` is not an operator for the owner, this is a no-op.
    pub fn remove_operator(&mut self, owner: Address, operator: &Address) {
        self.addresses.entry(owner).and_modify(|set| {
            set.remove(operator);
        });

        // Remove the entry if the set is empty.
        if let Some(set) = self.addresses.get(&owner) {
            if set.is_empty() {
                self.addresses.remove(&owner);
            }
        }
    }
}

pub trait HasOperatorsState<S> {
    fn operators_state(&self) -> &OperatorsState<S>;
    fn operators_state_mut(&mut self) -> &mut OperatorsState<S>;
}
