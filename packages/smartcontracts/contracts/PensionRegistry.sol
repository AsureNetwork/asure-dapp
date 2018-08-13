pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import "./PensionLib.sol";

contract PensionRegistry is Ownable {
  address pensionPoints;
  mapping(uint => address) contracts;

  function getContract(PensionLib.ContractType _contract) public view returns (address _addr) {
    return contracts[uint(_contract)];
  }

  function setContract(PensionLib.ContractType _contract, address _addr) onlyOwner public returns (bool _success) {
    contracts[uint(_contract)] = _addr;
    return true;
  }

  function setContracts(PensionLib.ContractType[] _contracts, address[] _addrs) onlyOwner public returns (bool _success) {
    require(_contracts.length == _addrs.length, "_contracts and _addr must be of same length");

    for (uint i = 0; i < _addrs.length; i++) {
      contracts[uint(_contracts[i])] = _addrs[i];
    }

    return true;
  }
}
