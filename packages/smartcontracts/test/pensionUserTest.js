const timeTravel = require('../util/timeTravel');

const DateTime = artifacts.require('DateTime');
const PensionEuroToken = artifacts.require('PensionEuroToken');
const PensionRegistry = artifacts.require('PensionRegistry');
const PensionSettings = artifacts.require('PensionSettings');
const PensionWallet = artifacts.require('PensionWallet');
const Pension = artifacts.require('Pension');
const PensionPoints = artifacts.require('PensionPoints');
const PensionUsers = artifacts.require('PensionUsers');

const testUser = {
  salary: 2500, // salary in €
  pensionRate: 465 // 18.6% of 2500€ (salary)
};

contract('PensionUserTest', async accounts => {
  it('checkUser', async () => {
    const pensionUsers = await PensionUsers.deployed();

    const isUserResult = await pensionUsers.isUser(accounts[1]);
    assert.equal(isUserResult, false);
    const getUserCountResult = await pensionUsers.getTotalUsers();
    assert.equal(getUserCountResult.toNumber(), 0);
  });

  it('registerUser', async () => {
    const pensionUsers = await PensionUsers.deployed();

    let birthday = new Date(1980, 1, 1).valueOf() / 1000;
    let pensionDate = new Date(2040, 1, 1).valueOf() / 1000;

    await pensionUsers.registerUser(accounts[1], birthday, pensionDate);
    const result = await pensionUsers.getUserPensionDate.call(accounts[1]);
    assert.equal(result.toNumber(), pensionDate);

    const getUserCountResult = await pensionUsers.getTotalUsers();
    assert.equal(getUserCountResult.toNumber(), 1);
  });

  it('getStats', async () => {
    const pensionUsers = await PensionUsers.deployed();

    const result1 = await pensionUsers.getStats();
    assert.equal(result1[0].toNumber(), 1);
    assert.equal(result1[1].toNumber(), 0);

    await pensionUsers.setUserPensioner(accounts[1], true);

    const result2 = await pensionUsers.getStats();
    assert.equal(result2[0].toNumber(), 1);
    assert.equal(result2[1].toNumber(), 1);
  });

  it('getUserPensionDate', async () => {
    const pensionUsers = await PensionUsers.deployed();
    let result = await pensionUsers.getUserPensionDate.call(accounts[1]);
    let pensionDate = new Date(2040, 1, 1).valueOf() / 1000;
    assert.equal(result.toNumber(), pensionDate);
  });

  it('unregisterUser', async () => {
    const pensionUsers = await PensionUsers.deployed();

    const result = await pensionUsers.unregisterUser(accounts[1], {
      from: accounts[1]
    });
    //console.log(JSON.stringify(result));
    //assert.equal(result, true);

    const getUserCountResult = await pensionUsers.getTotalUsers();
    assert.equal(getUserCountResult.toNumber(), 0);
  });
});
