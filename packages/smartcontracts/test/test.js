const Test = artifacts.require('Test');

contract('Test', async accounts => {
  it('HelloWorld should return 0', async () => {
    const instance = await Test.deployed();

    const result = await instance.helloWorld.call();

    assert.equal(result.toNumber(), 0);
  });
});
