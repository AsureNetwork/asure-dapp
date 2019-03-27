# Developing Asure dApp

Loving the Asure dApp and want to get involved? Thanks! There are plenty of ways
you can help.

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the
developers managing and developing this open source project. In return, they
should reciprocate that respect in addressing your issue or assessing patches
and features.

# NPM Packages

## dapp

The [dapp package](https://github.com/AsureFoundation/asure-dapp/tree/master/packages/dapp) contains the Asure dapp.

It is a mobile web application
based on [create-react-app](https://github.com/facebook/create-react-app).

## gpcli

The [gpcli package](https://github.com/AsureFoundation/asure-dapp/tree/master/packages/gpcli)
is our swiss army cli tool and is used to run the simulation of our german pension
product including

- creating test data
- paying into the pension system
- getting money out of the pension system
- etc.

## smartcontracts

The [smartcontracts package](https://github.com/AsureFoundation/asure-dapp/tree/master/packages/smartcontracts) contains all smartcontracts of the german statutory pension system.

The project is based on the [Truffle Suite](https://www.truffleframework.com/).

## Development Environment

### Automerge package-lock.json

We rely on package-lock.json to lock down out dependencies. The
package-lock.json format is not very merge friendly which is why we
recommend that you install the
[npm-merge-driver](https://www.npmjs.com/package/npm-merge-driver) npm package.
This will resolve merge conflicts of package-lock.json files automatically.

```sh
cd asure-dapp
npx npm-merge-driver install
```

### Webstorm / Intellij

If you're using an IDE from Jetbrains like Webstorm or Intellij we recommend
the following plugins and configurations.

#### Prettier

We're using Prettier to format our JavaSript code. The default formating done
by Webstrom / IntelliJ (Alt-Shift-Cmd-L / Alt-Shift-Ctrl-L) formats your code
differently. Newer versions of Intellij support formating of source code with
prettier though. Just use the following shortcuts instead.

- macOS: Alt-Shift-Cmd-P
- Windows: Alt-Shift-Ctrl-P

See https://prettier.io/docs/en/webstorm.html

#### Editorconfig

Install the EditorConfig plugin. It ensures that you're using the correct
settings from out .editorconfig

## Deployment

We deploy our smartcontracts to the Rinkeby network.
Out Asure dApp is hosted on Github pages and in IPFS.

## Miscellaneous

Python 2.7.15 not 3+
https://www.python.org/downloads/release/python-2715/

Microsoft Build Tools 2015
https://www.microsoft.com/de-de/download/details.aspx?id=48159
https://support.microsoft.com/de-de/help/2977003/the-latest-supported-visual-c-downloads

```sh
npm config set msvs_version 2015 --global
```
