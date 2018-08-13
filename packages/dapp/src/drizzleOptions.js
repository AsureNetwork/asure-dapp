import Test from 'smartcontracts/build/contracts/Test.json';
import PensionEuroToken from 'smartcontracts/build/contracts/PensionEuroToken.json';
import PensionPoints from 'smartcontracts/build/contracts/PensionPoints.json';
import PensionRegistry from 'smartcontracts/build/contracts/PensionRegistry.json';
import PensionSettings from 'smartcontracts/build/contracts/PensionSettings.json';
import PensionUsers from 'smartcontracts/build/contracts/PensionUsers.json';
import PensionWallet from 'smartcontracts/build/contracts/PensionWallet.json';
import Pension from 'smartcontracts/build/contracts/Pension.json';

export const drizzleOptions = {
  contracts: [
    Test,
    PensionEuroToken,
    PensionPoints,
    PensionRegistry,
    PensionSettings,
    PensionUsers,
    PensionWallet,
    Pension
  ],
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  polls: {
    accounts: 4000
  },
  syncAlways: true
};
