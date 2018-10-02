const Web3 = require('web3');

exports.web3Checker = (web3Instance)=>{
    if (!web3Instance) {
        window.alert('Please install MetaMask first.');
        return;
    }
    if (!web3Instance) {
        // We don't know window.web3 version, so we use our own instance of web3
        // with provider given by window.web3
        web3Instance = new Web3(window.web3.currentProvider);
        // return;
    }
    if (!web3Instance.eth.coinbase) {
        window.alert('Please activate MetaMask first.');
        return;
    }
    return web3Instance;
}

