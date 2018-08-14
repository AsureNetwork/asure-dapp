pragma solidity ^0.4.23;

import "./PensionLib.sol";

contract PensionSettings {
  function getPensionFactor(PensionLib.PensionType _pensionType) public pure returns (uint256) {
    //scaled to 100%
    return 100;
  }

  //TODO: rename to "getPensionPointValue"
  function getPensionAmount(uint16 _year) public view returns (uint256) {
    return 29*10**18;
  }

  function getPensionSalaryPercentage(uint16 _year) public pure returns (uint256) {
    //18,6 % //scaled to 100%
    return 1860;
  }

  //TODO: "Income" or "Salary".
  function getAverageIncomeByYear(uint16 _year) public pure returns (uint256) {
    return (2500 * 10 ** 18) * 12;
  }

  function getPensionPointPrecision() public pure returns (uint _precision){
    return 1000;
  }

  function getMaxPensionPointsByYear(uint16 _year) public pure returns (uint _maxYearlyPensionPoints) {
    return 2000;
  }

}
