pragma solidity ^0.4.23;

import "./PensionRegistry.sol";
import "./PensionSettings.sol";

contract PensionPoints {
  PensionRegistry registry;

  mapping(address => uint16[]) private yearsByUser;
  mapping(address => mapping(uint16 => uint256)) private totalUserPointsPerYear;
  mapping(address => mapping(uint16 => uint256)) private totalAmountPerYear;
  mapping(address => mapping(uint16 => mapping(uint8 => uint256))) private totalAmountPerMonth;

  constructor(address _pensionRegistryAddr) public {
    registry = PensionRegistry(_pensionRegistryAddr);
  }

  // Pension points are scaled by 1000 because we cant use floating
  // points.
  function pointsOf(address _user) public view returns (uint256 points) {
    uint pensionPoints;

    uint16[] memory pensionPointYears = yearsByUser[_user];
    for (uint i = 0; i < pensionPointYears.length; i++) {
      pensionPoints += totalUserPointsPerYear[_user][pensionPointYears[i]];
    }

    return pensionPoints;
  }

  function payTo(address _user, uint16 _year, uint8 _month, uint256 _amount) public returns (bool _success) {
    require(msg.sender == registry.getContract(PensionLib.ContractType.PensionWallet));
    require(_month < 12, "_month must be between 0 and 11");

    if (!contains(yearsByUser[_user], _year)) {
      yearsByUser[_user].push(_year);
    }

    totalAmountPerYear[_user][_year] += _amount;
    totalAmountPerMonth[_user][_year][_month] += _amount;
    totalUserPointsPerYear[_user][_year] = getPointsByYearForAmount(_year, totalAmountPerYear[_user][_year]);

    return true;
  }

  function getPaymentsByYear(address _user, uint16 _year) public view returns (uint256[12]) {
    uint256[12] memory _payments;

    for (uint8 month = 0; month < 12; month++) {
      _payments[month] = totalAmountPerMonth[_user][_year][month];
    }

    return _payments;
  }

  function getPointsByYear(address _user, uint16 _year) public view returns (uint) {
    return getPointsByYearForAmount(_year, totalAmountPerYear[_user][_year]);
  }

  // Pension points are scaled by 1000 because we cant use floating
  // points.
  function getPointsByYearForAmount(uint16 _year, uint256 _amount) public view returns (uint) {
    PensionSettings settings = PensionSettings(registry.getContract(PensionLib.ContractType.PensionSettings));

    uint averageIncomeByYear = settings.getAverageIncomeByYear(_year);
    uint pensionSalaryPercentage = settings.getPensionSalaryPercentage(_year);

    uint averagePensionByYear = (averageIncomeByYear * pensionSalaryPercentage) / 10000;

    return (settings.getPensionPointPrecision() * _amount) / averagePensionByYear;
  }

  function contains(uint16[] arr, uint16 elm) private pure returns (bool) {
    for (uint i = 0; i < arr.length; i++) {
      if (arr[i] == elm) {
        return true;
      }
    }

    return false;
  }
}
