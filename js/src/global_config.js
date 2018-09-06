const Web3 =require('web3');
const contract = require("truffle-contract");
let Person_abi =require('./Person.json');
// let Suggestion_abi = require("./Suggestion.json");


let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let person = contract(Person_abi);
person.setProvider(web3.currentProvider);
if (typeof person.currentProvider.sendAsync !== "function") {
    person.currentProvider.sendAsync = function() {
        return person.currentProvider.send.apply(
            person.currentProvider,
            arguments
        );
    };
}
// let suggestion = contract() 

global.contract ={
    Person: person.at("0x0aEfFAadf7AAb48C70C9134e953da85d84EF7e51"),
    // Suggestion:"0x0aEfFAadf7AAb48C70C9134e953da85d84EF7e51",
}