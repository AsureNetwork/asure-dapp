#!/usr/bin/env node

// https://github.com/etherisc/tokensale/blob/master/bin/ganache.js

const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const Ganache = require('ganache-cli');
const log = require('../util/logger');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const options = {
  port: 8545,
  network_id: 1234567890,
  accounts: [
    {
      secretKey:
        '0x9bc670d2cf4adf0a20cb44f5ff32cf2b3f5d7c3629e6f1be3600af17a1fc2fc7',
      balance: 500 * 10 ** 18,
      usecase: 'owner main'
    },
    {
      secretKey:
        '0x646f3ee8a04290ca5a6f41b05d3f365192803fda07df5540f957db265871609c',
      balance: 500 * 10 ** 18,
      usecase: 'owner test user in unit tests'
    },
    {
      secretKey:
        '0x3354bc2a5a15140770d54384e96b2d2a09c03f793395e116789a14a5e20b3a38',
      balance: 50 * 10 ** 18,
      usecase: 'owner unused'
    },
    {
      secretKey:
        '0x1f943318127832a56aadc8f23925501c342d29144b400eb28128cea9d2d5f61c',
      balance: 50 * 10 ** 18,
      usecase: 'owner unused'
    },
    {
      secretKey:
        '0x0d04c7cd724628994376ed1a8a230d5440497c92633f2ebdef02064d57ae9e25',
      balance: 50 * 10 ** 18,
      usecase: 'test user <pmizel@asure.io>'
    },
    {
      secretKey:
        '0x92a2d8a63b4dbd7f942e0d16da24df6b9ad2b1caac87d41ad321f262f8f77407',
      balance: 50 * 10 ** 18,
      usecase: 'test user <fraetz@asure.io>'
    },
    {
      secretKey:
        '0x04b0390e9baa7dde1bfc135eadb0dc8b0af15df905ac74d965a91e03207dafbf',
      balance: 50 * 10 ** 18,
      usecase: 'test user <gschmuck@asure.io>'
    },
    {
      secretKey:
        '0x7bd310f008415a83ede5f1e84000d95a7591b26c9a38838320f9cfbe47132548',
      balance: 50 * 10 ** 18,
      usecase: 'test user <mlurz@asure.io>'
    }
  ],
  // debug: true,
  logger: { log: log.info },
  blocktime: 0,
  vmErrorsOnRPCResponse: true
};

const server = Ganache.server(options);

const getUseCase = secretKey => {
  const acc = options.accounts.find(a => a.secretKey === `0x${secretKey}`);
  return acc ? acc.usecase : 'null';
};

server.listen(options.port, async (err, result) => {
  if (err) {
    log.error(err);
  } else {
    const state = result || server.provider.manager.state;
    log.info('EthereumJS TestRPC');

    log.info('Accounts:');
    Object.keys(state.accounts).forEach((address, index) => {
      const secretKey = state.accounts[address].secretKey.toString('hex');
      log.info(
        `(${index}) ${address}${
          state.isUnlocked(address) === false ? ' 🔒' : ''
        }, pKey: ${secretKey}, ${getUseCase(secretKey)}`
      );
    });

    log.info(`Listening on ${options.hostname || 'localhost'}:${options.port}`);

    try {
      if (process.argv.includes('--migrate')) {
        log.info('Deploying smart contracts ...');
        await exec('npm run migrate-dev');
        log.info('Deployment of smart contracts was successful.');
      }

      if (process.argv.includes('--deploy-test-data')) {
        log.info('Deploying test data. This will take a few minutes ...');
        await delay(2500);
        await await exec('npm run deploy-dev', {
          cwd: path.resolve(__dirname, '../../gpcli')
        });
        log.info('Deployment of test data was successful');
      }

      log.info(`Started successfully`);
    } catch (error) {
      log.error(error);
      process.exit(1);
    }
  }
});

process.on('uncaughtException', error => {
  log.error(error.stack);
  process.exit(1);
});

// See http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
if (process.platform === 'win32') {
  require('readline')
    .createInterface({
      input: process.stdin,
      output: process.stdout
    })
    .on('SIGINT', () => {
      process.emit('SIGINT');
    });
}

process.on('SIGINT', () => {
  // graceful shutdown
  server.close(error => {
    if (error) {
      log.error(error.stack || error);
    }
    process.exit();
  });
});
