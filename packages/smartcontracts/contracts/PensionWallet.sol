pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

import "./PensionRegistry.sol";
import "./PensionPoints.sol";
import "./Pension.sol";
import "./PensionLib.sol";
import "./DateTime.sol";

contract PensionWallet {
  PensionRegistry registry;
  ERC20 token;
  DateTime dateTime;
  mapping(address => mapping(uint => bool)) paidPensions;
  uint256 totalAmount_;

  /**
  * @dev Total number of amount in existence
  */
  function totalAmount() public view returns (uint256) {
    return totalAmount_;
  }

  constructor(address _pensionRegistryAddr, address _erc20, address _dateTime) public {
    registry = PensionRegistry(_pensionRegistryAddr);
    token = ERC20(_erc20);
    dateTime = DateTime(_dateTime);
  }

  function() public payable {
    revert();
  }

  function depositMany(address[] _users, uint16[] _years, uint8[] _months, uint256[] _amounts) public returns (bool _success) {
    require(_users.length == _years.length, "all arrays must be of same length");
    require(_users.length == _months.length, "all arrays must be of same length");
    require(_users.length == _amounts.length, "all arrays must be of same length");

    for (uint i = 0; i < _users.length; i++) {
      deposit(_users[i], _years[i], _months[i], _amounts[i]);
    }

    return true;
  }

  function deposit(address _user, uint16 _year, uint8 _month, uint256 _amount) public returns (bool _success) {
    token.transferFrom(msg.sender, this, _amount);

    PensionPoints points = PensionPoints(registry.getContract(PensionLib.ContractType.PensionPoints));
    points.payTo(_user, _year, _month, _amount);
    totalAmount_ += _amount;

    return true;
  }

  function amountOf(address _user) public view returns (uint256 _pensionAmount) {
    require(_user == msg.sender, "_user must equal msg.sender");

    PensionUsers pensionUsers = PensionUsers(registry.getContract(PensionLib.ContractType.PensionUsers));
    uint256 pensionDate = pensionUsers.getUserPensionDate(_user);

    uint16 minYear = dateTime.getYear(pensionDate);
    uint minMonth = dateTime.getMonth(pensionDate);
    uint256 min = (minYear * 12 + minMonth);

    uint16 maxYear = dateTime.getYear(now);
    uint maxMonth = dateTime.getMonth(now);
    uint256 max = (maxYear * 12 + maxMonth);

    if (paidPensions[_user][max]) {
      return 0;
    }

    Pension pension = Pension(registry.getContract(PensionLib.ContractType.Pension));
    uint256 pensionAmount = 0;

    while (max > min && !paidPensions[_user][max - 1]) {
      max--;

      pensionAmount += pension.pensionOf(_user, uint16(max / 12));
    }

    return pensionAmount;
  }

  function withdraw(address _user) public returns (bool _success) {
    require(_user == msg.sender, "_user must equal msg.sender");

    PensionUsers pensionUsers = PensionUsers(registry.getContract(PensionLib.ContractType.PensionUsers));
    uint256 pensionDate = pensionUsers.getUserPensionDate(_user);

    uint16 minYear = dateTime.getYear(pensionDate);
    uint minMonth = dateTime.getMonth(pensionDate);
    uint256 min = (minYear * 12 + minMonth);

    uint16 maxYear = dateTime.getYear(now);
    uint maxMonth = dateTime.getMonth(now);
    uint256 max = (maxYear * 12 + maxMonth);

    if (paidPensions[_user][max]) {
      return false;
    }

    Pension pension = Pension(registry.getContract(PensionLib.ContractType.Pension));
    uint256 pensionAmount = 0;
    while (max > min && !paidPensions[_user][max - 1]) {
      max--;

      pensionAmount += pension.pensionOf(_user, uint16(max / 12));
      paidPensions[_user][max] = true;
    }

    // TODO: if we do not have enough, we have to get it from somewhere (e.g. the goverment)
    require(totalAmount_ >= pensionAmount, "totalAmount must be greater then pensionAmount");
    if (pensionAmount != 0) {
      totalAmount_ -= pensionAmount;
      token.transfer(_user, pensionAmount);
    }

    return true;
  }
}
