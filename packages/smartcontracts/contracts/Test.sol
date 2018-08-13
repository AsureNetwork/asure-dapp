pragma solidity ^0.4.23;


contract Test {
  int num;

  function helloWorld() public view returns (int) {
    return num;
  }

  function increment() public returns (int) {
    num++;

    return num;
  }
}
