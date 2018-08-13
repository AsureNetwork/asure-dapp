'use strict';

const Web3 = require('web3');
const AsureHttpWalletProvider = require('./asure-http-wallet-provider');

const PensionUsersMetadata = require('smartcontracts/build/contracts/PensionUsers');
const PensionEuroTokenMetadata = require('smartcontracts/build/contracts/PensionEuroToken');
const PensionWalletMetadata = require('smartcontracts/build/contracts/PensionWallet');

class GpCommand {
  constructor(profile, providerUrl, mgmtMnemonic) {
    const web3Provider = this._createWeb3Provider(
      profile,
      providerUrl,
      mgmtMnemonic
    );

    this._web3 = new Web3(web3Provider);
    this._mgmtAccount = web3Provider.getAddress();
  }

  async init() {
    await this._createAllContracts();
  }

  _createWeb3Provider(profile, providerUrl, mgmtMnemonic) {
    providerUrl = process.env[`GP_${profile}_URL`] || providerUrl;
    mgmtMnemonic = process.env[`GP_${profile}_MGMT_MNEMONIC`] || mgmtMnemonic;

    return new AsureHttpWalletProvider(mgmtMnemonic, providerUrl);
  }

  _createContract(metadata, networkId) {
    const network = metadata.networks[networkId];
    if (!network) {
      throw new Error(
        `no address of ${
          metadata.contractName
        } contract for network ${networkId} available`
      );
    }

    return new this._web3.eth.Contract(metadata.abi, network.address, {
      from: this._mgmtAccount
    });
  }

  async _createAllContracts() {
    const networkId = await this._web3.eth.net.getId();

    this._pensionUsers = this._createContract(PensionUsersMetadata, networkId);
    this._pensionEuroToken = this._createContract(
      PensionEuroTokenMetadata,
      networkId
    );
    this._pensionWallet = this._createContract(
      PensionWalletMetadata,
      networkId
    );
  }
}

module.exports = GpCommand;
