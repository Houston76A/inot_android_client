const observableModule = require("data/observable");

function ChatsViewModel() {
    const viewModel = observableModule.fromObject({});

    return viewModel;
}

module.exports = ChatsViewModel;
