# Asure dApp

Asure is an open decentralized autonomous insurance platform built around
transparency, privacy and fairness, powered by blockchain innovation that
brings together **individuals**, **companies** and **governments** in a digital world.

Please find out more about the Asure protocol and platform on our website [https://asure.io](https://asure.io) and also in our
[Whitepaper](https://www.asure.io/asure_io_whitepaper_en.pdf).

The Asure dApp will become the reference implementation for dApps
using the Asure protocol and platform. It will feature

- a technical feasibility study of the german
  statutory pension system implemented on the Ethereum
  blockchain and the Asure protocol / platform.
- a complete wallet implementation.
- an overview and management of my insurance policies.
- an insurance store to find and buy insurance policies.

## Demo

You can try out the dApp at [https://dapp.asure.io](https://dapp.asure.io).

Also, you can try our the dApp on IPFS at [https://ipfs.asure.io/ipns/dapp.asure.io](https://ipfs.asure.io/ipns/dapp.asure.io).

## Project Status

[![Build Status](https://travis-ci.org/AsureFoundation/asure-dapp.svg?branch=master)](https://travis-ci.org/AsureFoundation/asure-dapp)
[![Twitter](https://img.shields.io/twitter/follow/espadrine.svg?style=social&label=Follow)](https://twitter.com/intent/user?screen_name=Asure_io)

**This implementation is still very much a work in progress.** It can be used for testing,
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
# We prepared a little script that creates an .npmrc
# file in each npm package and sets script-shell to
# `C:\Program Files\Git\bin\bash.exe`. It also adds
# `C:\Program Files\Git\bin` to your PATH variable.
call tools/init-win.cmd

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
