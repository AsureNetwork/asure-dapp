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

contract('PensionTest', async accounts => {
  it('check PensionPoints', async () => {
    const pension = await Pension.deployed();
    const result = await pension.calculatePensionPoints(
      2018,
      web3.utils.toWei(`${2500 * 12}`, 'ether')
    );
    assert.equal(result.toNumber(), 1000);
  });
});
