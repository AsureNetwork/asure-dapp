pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

import "./PensionRegistry.sol";
import "./PensionPoints.sol";
import "./PensionSettings.sol";
import "./PensionUsers.sol";

contract Pension is Ownable {
  PensionRegistry registry;

  constructor(address _pensionRegistryAddr) public {
    registry = PensionRegistry(_pensionRegistryAddr);
  }

  function pensionOf(address _user, uint16 year) public view returns (uint256 amount) {
    PensionUsers users = PensionUsers(registry.getContract(PensionLib.ContractType.PensionUsers));
    PensionPoints points = PensionPoints(registry.getContract(PensionLib.ContractType.PensionPoints));
    PensionSettings settings = PensionSettings(registry.getContract(PensionLib.ContractType.PensionSettings));

    uint256 ep = points.pointsOf(_user); //40000
    uint256 zf = 100;
    uint256 raf = settings.getPensionFactor(users.getUserPensionType(_user));
    uint256 arw = settings.getPensionAmount(year);

    // EP * ZF * RAF * aRW
    //40 * 1 * 1 * 20
    //40000 * 100 * 100 * 20*10**18

    return ep * zf * raf * arw / 10**7;
  }

  function expectedPensionOf(address _user) public view returns (uint256 amount) {
    PensionUsers users = PensionUsers(registry.getContract(PensionLib.ContractType.PensionUsers));
    PensionSettings settings = PensionSettings(registry.getContract(PensionLib.ContractType.PensionSettings));

    uint256 ep = 4000; //4000
    uint256 zf = 100;
    PensionLib.PensionType pt = users.getUserPensionType(_user);
    uint256 raf = settings.getPensionFactor(pt);
    uint256 arw = settings.getPensionAmount(2040);

    // EP * ZF * RAF * aRW
    //40 * 1 * 1 * 20
    //4000 * 100 * 100 * 2000

    return ep * zf * raf * arw * 10**10;
  }


  function calculatePension(uint16 _accessYear, uint16 _actualYear, uint256 _actualPensionPoints, uint256 _yearlyIncome, uint256 _accessFactor, uint256 _pensionTypeFactor) public view returns (uint256 amount) {
    PensionSettings settings = PensionSettings(registry.getContract(PensionLib.ContractType.PensionSettings));

    uint256 _pensionPointValue = settings.getPensionAmount(_accessYear);

    //TODO: calculate yearlyPensionPoints
    uint256 _averageIncome = settings.getAverageIncomeByYear(2030);

    uint256 _yearlyPensionPoints = _yearlyIncome*(10**3) / _averageIncome; //TODO: (getPointsByYearForAmount) we have to calculate the average income for every year until retirement starts

    uint256 _calculatedPensionPoints = ((_accessYear - _actualYear) * _yearlyPensionPoints) + _actualPensionPoints;

    return _calculatedPensionPoints * _accessFactor * _pensionTypeFactor * _pensionPointValue; //TODO: AccessFactor has to be calculated within smart contract (accessAge - actualAge)
  }

  function calculatePensionPoints(uint16 _actualYear, uint256 _yearlyIncome) public view returns (uint256 amount) {
    PensionSettings settings = PensionSettings(registry.getContract(PensionLib.ContractType.PensionSettings));

    uint256 _averageIncome = settings.getAverageIncomeByYear(_actualYear);

    return  _yearlyIncome*(10**3) / _averageIncome;
  }
}
