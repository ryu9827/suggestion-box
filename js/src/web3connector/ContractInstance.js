
const contract = require("truffle-contract");
let Suggestion_abi =require('../Suggestion.json');

function contractProvider(){
    let suggestion = contract(Suggestion_abi);

    //set provider to the contract
    suggestion.setProvider(window.web3.currentProvider);
    if (typeof suggestion.currentProvider.sendAsync !== "function") {
        suggestion.currentProvider.sendAsync = function() {
            return suggestion.currentProvider.send.apply(
                suggestion.currentProvider,
                arguments
                );
            };
        }
    
    //set MetaMask account as default user, or you cannot call contract's function
    suggestion.web3.eth.defaultAccount = suggestion.web3.eth.coinbase;
    let contract_suggestion = suggestion.at(global.contract.Suggestion)
    return contract_suggestion;
}

async function suggestionArray(contract, status){
    let statusNumber;
    switch (status){
        case "unhandled":
            statusNumber = 0;
            break;
        case "undergoing":
            statusNumber = 1;
            break;
        case "rejected":
            statusNumber = 2;
            break;
        case "completed":
            statusNumber = 3;
            break;
        case "deleted":
            statusNumber = 4;
            break;
    }
    // console.log(statusNumber)
    let arr = [];
    let counter = (await contract.counter_suggestion.call()).toNumber();
    for(let i = 0; i < counter; i++){
        let obj_sugg = await contract.getSignleSuggestion(i);
        if(obj_sugg[1]==statusNumber){
            // console.log(typeof obj_sugg[0])
            for(let x in obj_sugg){
                if(typeof obj_sugg[x] == "object"){
                    obj_sugg[x] = obj_sugg[x].toNumber();
                }
            }
            console.log(typeof obj_sugg);
            arr.push(obj_sugg)
        }

    }
    return arr;
}

export {contractProvider};
export {suggestionArray};