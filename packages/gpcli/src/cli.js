#!/usr/bin/env node

'use strict';

require('./utils/env');
const program = require('commander');
const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .option(
    '--profile <profile>',
    'profile name - used in env variables',
    'development'
  )
  .option(
    '--url <url>',
    'provider url (env variable "GP_$profile$_URL")',
    'http://127.0.0.1:8545'
  )
  .option(
    '--mgmt-mnemonic <mgmtMnemonic>',
    'management mnemonic (env variable "GP_$profile$_MGMT_MNEMONIC")',
    'prevent swarm candy monitor uniform pass gun melt enlist dune west language'
  );

require('./RegisterUserCommand').register();

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}
