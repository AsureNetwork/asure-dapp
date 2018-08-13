const Migrations = artifacts.require('./Migrations.sol');
const Test = artifacts.require('./Test.sol');
const DateTime = artifacts.require('./DateTime.sol');
const PensionEuroToken = artifacts.require('./PensionEuroToken.sol');
const PensionRegistry = artifacts.require('./PensionRegistry.sol');
const PensionSettings = artifacts.require('./PensionSettings.sol');
const PensionWallet = artifacts.require('./PensionWallet.sol');
const Pension = artifacts.require('./Pension.sol');
const PensionPoints = artifacts.require('./PensionPoints.sol');
const PensionUsers = artifacts.require('./PensionUsers.sol');

const ContractType = {
  PensionPoints: 0,
  PensionSettings: 1,
  PensionUsers: 2,
  Pension: 3,
  PensionWallet: 4
};

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    deployer.deploy(Migrations);
    deployer.deploy(Test);

    const instances = {};

    instances.DateTime = await deployer.deploy(DateTime);
    instances.PensionEuroToken = await deployer.deploy(PensionEuroToken);
    instances.PensionRegistry = await deployer.deploy(PensionRegistry);
    instances.PensionSettings = await deployer.deploy(PensionSettings);

    instances.PensionWallet = await deployer.deploy(
      PensionWallet,
      instances.PensionRegistry.address,
      instances.PensionEuroToken.address,
      instances.DateTime.address
    );

    instances.PensionPoints = await deployer.deploy(
      PensionPoints,
      instances.PensionRegistry.address
    );

    instances.PensionUsers = await deployer.deploy(PensionUsers);

    instances.Pension = await deployer.deploy(
      Pension,
      instances.PensionRegistry.address
    );

    await PensionRegistry.deployed();
    console.log('Initializing PensionRegistry');

    const contracts = {
      [ContractType.Pension]: instances.Pension.address,
      [ContractType.PensionPoints]: instances.PensionPoints.address,
      [ContractType.PensionSettings]: instances.PensionSettings.address,
      [ContractType.PensionUsers]: instances.PensionUsers.address,
      [ContractType.PensionWallet]: instances.PensionWallet.address
    };

    await instances.PensionRegistry.setContracts(
      Object.keys(contracts),
      Object.values(contracts)
    );
  });
};
