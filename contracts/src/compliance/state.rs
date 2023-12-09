use concordium_std::*;

#[derive(Serial)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    modules: StateSet<ContractAddress, S>,
}

impl State {
    pub fn new(state_builder: &mut StateBuilder) -> Self {
        Self {
            modules: state_builder.new_set(),
        }
    }

    pub fn add_module(&mut self, module: ContractAddress) {
        self.modules.insert(module);
    }

    pub fn remove_module(&mut self, module: &ContractAddress) {
        self.modules.remove(module);
    }

    pub fn has_module(&self, module: &ContractAddress) -> bool {
        self.modules.contains(module)
    }
}
