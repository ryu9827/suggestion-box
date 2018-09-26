pragma solidity ^0.4.24;

// File: D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/access/rbac/Roles.sol

/**
 * @title Roles
 * @author Francisco Giordano (@frangio)
 * @dev Library for managing addresses assigned to a Role.
 * See RBAC.sol for example usage.
 */
library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an address access to this role
   */
  function add(Role storage _role, address _addr)
    internal
  {
    _role.bearer[_addr] = true;
  }

  /**
   * @dev remove an address' access to this role
   */
  function remove(Role storage _role, address _addr)
    internal
  {
    _role.bearer[_addr] = false;
  }

  /**
   * @dev check if an address has this role
   * // reverts
   */
  function check(Role storage _role, address _addr)
    internal
    view
  {
    require(has(_role, _addr));
  }

  /**
   * @dev check if an address has this role
   * @return bool
   */
  function has(Role storage _role, address _addr)
    internal
    view
    returns (bool)
  {
    return _role.bearer[_addr];
  }
}

// File: D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/access/rbac/RBAC.sol

/**
 * @title RBAC (Role-Based Access Control)
 * @author Matt Condon (@Shrugs)
 * @dev Stores and provides setters and getters for roles and addresses.
 * Supports unlimited numbers of roles and addresses.
 * See //contracts/mocks/RBACMock.sol for an example of usage.
 * This RBAC method uses strings to key roles. It may be beneficial
 * for you to write your own implementation of this interface using Enums or similar.
 */
contract RBAC {
  using Roles for Roles.Role;

  mapping (string => Roles.Role) private roles;

  event RoleAdded(address indexed operator, string role);
  event RoleRemoved(address indexed operator, string role);

  /**
   * @dev reverts if addr does not have role
   * @param _operator address
   * @param _role the name of the role
   * // reverts
   */
  function checkRole(address _operator, string _role)
    public
    view
  {
    roles[_role].check(_operator);
  }

  /**
   * @dev determine if addr has role
   * @param _operator address
   * @param _role the name of the role
   * @return bool
   */
  function hasRole(address _operator, string _role)
    public
    view
    returns (bool)
  {
    return roles[_role].has(_operator);
  }

  /**
   * @dev add a role to an address
   * @param _operator address
   * @param _role the name of the role
   */
  function addRole(address _operator, string _role)
    internal
  {
    roles[_role].add(_operator);
    emit RoleAdded(_operator, _role);
  }

  /**
   * @dev remove a role from an address
   * @param _operator address
   * @param _role the name of the role
   */
  function removeRole(address _operator, string _role)
    internal
  {
    roles[_role].remove(_operator);
    emit RoleRemoved(_operator, _role);
  }

  /**
   * @dev modifier to scope access to a single role (uses msg.sender as addr)
   * @param _role the name of the role
   * // reverts
   */
  modifier onlyRole(string _role)
  {
    checkRole(msg.sender, _role);
    _;
  }

  /**
   * @dev modifier to scope access to a set of roles (uses msg.sender as addr)
   * @param _roles the names of the roles to scope access to
   * // reverts
   *
   * @TODO - when solidity supports dynamic arrays as arguments to modifiers, provide this
   *  see: https://github.com/ethereum/solidity/issues/2467
   */
  // modifier onlyRoles(string[] _roles) {
  //     bool hasAnyRole = false;
  //     for (uint8 i = 0; i < _roles.length; i++) {
  //         if (hasRole(msg.sender, _roles[i])) {
  //             hasAnyRole = true;
  //             break;
  //         }
  //     }

  //     require(hasAnyRole);

  //     _;
  // }
}

// File: D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

// File: contracts\Person.sol

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
    
    function isManager(bytes32 _nameBytes) view public returns(bool){
        return hasRole(persons[_nameBytes].addr,MANAGER);
    }

    function isAdmin(bytes32 _nameBytes) view public returns(bool){
        return hasRole(persons[_nameBytes].addr,ADMIN);
    }

    // function getPersons() constant returns(mapping(string => Person)){
    //     return persons;
    // }

    event PersonRegistered(bytes32 _nameBytes, string _name, address addr);
    event StaffRemoved(bytes32 _nameBytes, string _name, address addr);
    event ManagerRemoved(bytes32 _nameBytes, string _name, address addr);
}
