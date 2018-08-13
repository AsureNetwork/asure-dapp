pragma solidity ^0.4.23;

import "./PensionLib.sol";
//https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity

contract PensionUsers {
  mapping(address => PensionLib.UserData) userData;
  address[] public userList;
  uint256 totalPensioners;

  function isUser(address _user) public constant returns (bool _isIndeed) {
    if (userList.length == 0) return false;
    return (userList[userData[_user].listPointer] == _user);
  }

  /*
   * Management functions
   */

  function registerUser(address _user, int256 _birthDate, uint256 _pensionDate) public returns (bool success) {
    // TODO: Should only be callable by the user itself?
    //require(msg.sender == _user);
    require(!isUser(_user));

    userData[_user].birthDate = _birthDate;
    userData[_user].pensionDate = _pensionDate;
    userData[_user].pensionType = PensionLib.PensionType.Default;

    userData[_user].listPointer = userList.push(_user) - 1;
    return true;
  }

  function unregisterUser(address _user) public returns (bool _success) {
    require(msg.sender == _user);
    require(isUser(_user));

    uint rowToDelete = userData[_user].listPointer;
    address keyToMove = userList[userList.length - 1];
    userList[rowToDelete] = keyToMove;
    userData[keyToMove].listPointer = rowToDelete;
    userList.length--;
    delete userData[_user];
    return true;
  }

  /*
   * Global functions
   */

  function getStats() public constant returns (uint256 _totalUsers, uint256 _totalPensioners) {
    return (getTotalUsers(), getTotalPensioners());
  }

  function getTotalPensioners() public constant returns (uint256 _totalPensioners) {
    return totalPensioners;
  }

  function getTotalUsers() public constant returns (uint _totalUsers) {
    return userList.length;
  }

  /*
   * User functions
   */

  function updateUser(address _user, int256 _birthDate, uint256 _pensionDate, PensionLib.PensionType _type) public returns (bool _success) {
    require(msg.sender == _user);
    require(isUser(_user));

    userData[_user].birthDate = _birthDate;
    userData[_user].pensionDate = _pensionDate;
    userData[_user].pensionType = _type;

    return true;
  }

  function getUserPensionDate(address _user) public view returns (uint256 _pensionDate) {
    return userData[_user].pensionDate;
  }

  function setUserPensionDate(address _user, uint256 _pensionDate) public returns (bool _success) {
    require(msg.sender == _user);
    require(isUser(_user));

    userData[_user].pensionDate = _pensionDate;
    return true;
  }

  function isPensioner(address _user) public view returns (bool _isPensioner) {
    return userData[_user].isPensioner;
  }

  function setUserPensioner(address _user, bool _isPensioner) public returns (bool _success) {
    // TODO: Should only be callable by the user itself or also by the PensionWallet?
    //require(msg.sender == _user);
    require(isUser(_user));

    if (userData[_user].isPensioner == _isPensioner) {
      return false;
    }

    _isPensioner ? totalPensioners++ : totalPensioners--;
    userData[_user].isPensioner = _isPensioner;
    return true;
  }

  function getUserBirthDate(address _user) public view returns (int256 _birthDate) {
    return userData[_user].birthDate;
  }

  function setUserBirthDate(address _user, int256 _birthDate) public returns (bool _success) {
    require(msg.sender == _user);
    require(isUser(_user));

    userData[_user].birthDate = _birthDate;
    return true;
  }

  function getUserPensionType(address _user) public pure returns (PensionLib.PensionType _pensionType) {
    return PensionLib.PensionType.Default;
  }

  function setUserPensionType(address _user, PensionLib.PensionType _type) public returns (bool _success) {
    require(msg.sender == _user);
    require(isUser(_user));

    userData[_user].pensionType = _type;
    return true;
  }
}
