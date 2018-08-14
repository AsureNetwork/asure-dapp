# Asure dApp

The Asure dApp is a technical feasibility study of the german
statutory pension system implemented on the Ethereum Blockchain.

## Demo

You can try out the dApp at [https://dapp.asure.io](https://dapp.asure.io).

Also, you can try our the dApp on IPFS at [https://ipfs.asure.io/ipns/dapp.asure.io](https://ipfs.asure.io/ipns/dapp.asure.io).

## Project Status

[![Build Status](https://travis-ci.org/AsureFoundation/asure-dapp.svg?branch=master)](https://travis-ci.org/AsureFoundation/asure-dapp)

This implementation is still very much a work in progress. It can be used for testing,
but it should not be used for real funds. We do our best to identify and fix problems,
and implement missing features.

Any help testing the implementation, reporting bugs, or helping with outstanding issues
is very welcome.

## Quick Overview

```sh
# We require a recent version of  npm.
npm install -g npm

# NOTE: Only for Windows users.
# All our npm scripts expect to be run in a
# sh shell. On Windows we use the npm config option
# `script-shell` and point it to the Git Bash shell.
# This config option can be set globally or per npm
# package by using an .npmrc file.
# We prepared a little script that creates a .npmrc
# in each npm package and sets script-shell to
# `C:\Program Files\Git\bin\bash.exe`. It also adds
# `C:\Program Files\Git\bin` to your PATH variable.
tools/init-win.cmd

# Install dependencies.
npm install

# Start Ganache. Ganache will deploy all smart
# contracts and test data.  This will take a
# few minutes.
npm run start-smartcontracts

# Start the dapp.
npm run start-dapp
```

## Develop

We've set up a separate document for [developers](https://github.com/AsureFoundation/asure-dapp/blob/master/DEVELOPERS.md).

## License

The Asure dApp is open source software [licensed as ISC](https://github.com/AsureFoundation/asure-dapp/blob/master/LICENSE).
