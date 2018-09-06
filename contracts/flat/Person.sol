pragma solidity ^0.4.24;

import "D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/access/rbac/RBAC.sol";
import "D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Person is RBAC, Ownable{
    string internal constant ADMIN      = "admin";
    string internal constant MANAGER    = "manager";
    string internal constant STAFF      = "staff";

    struct Person {
        string  name;
        address addr;
        bytes32 password;
    }

    mapping(bytes32 => Person) public persons; // use keccak"name" to retrieve Person info

    constructor() public{
        addRole(msg.sender, ADMIN);
        addRole(msg.sender, MANAGER);
    }

    function register(bytes32 _nameBytes, string _name, bytes32 _password) public {
        require(!isExisted(_nameBytes),"This name exists already. Please provide a unique name.");
        Person memory person;
        person.name = _name;
        person.addr = msg.sender;
        person.password = _password;
        persons[_nameBytes] = person;
        addStaff(_nameBytes);
        emit PersonRegistered(_nameBytes, _name, persons[_nameBytes].addr);
    }

    function addManager(bytes32 _nameBytes) public onlyOwner{
        addRole(persons[_nameBytes].addr, MANAGER);
    }

    function removeManager(bytes32 _nameBytes) public onlyOwner{
        removeRole(persons[_nameBytes].addr, MANAGER);
        delete persons[_nameBytes];
        emit ManagerRemoved(_nameBytes, persons[_nameBytes].name, persons[_nameBytes].addr);
    }

    function addStaff(bytes32 _nameBytes) internal{
        addRole(persons[_nameBytes].addr, STAFF);
    }

    function removeStaff(bytes32 _nameBytes) public onlyOwner{
        removeRole(persons[_nameBytes].addr, STAFF);
        delete persons[_nameBytes];
        emit StaffRemoved(_nameBytes, persons[_nameBytes].name, persons[_nameBytes].addr);
    }

    function isPasswordCorrect(bytes32 _nameBytes, bytes32 _password) view public returns(bool){
        if(!isExisted(_nameBytes)){
            return false;
        }else{
            return _password == persons[_nameBytes].password;
        }
    }

    function isExisted(bytes32 _nameBytes) view public returns(bool){
        return persons[_nameBytes].addr != 0x0; 
    }

    // function getPersons() constant returns(mapping(string => Person)){
    //     return persons;
    // }

    event PersonRegistered(bytes32 _nameBytes, string _name, address addr);
    event StaffRemoved(bytes32 _nameBytes, string _name, address addr);
    event ManagerRemoved(bytes32 _nameBytes, string _name, address addr);
}