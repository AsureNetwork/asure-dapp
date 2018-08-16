import { call, select, take } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../actions/actions';
import { getCurrentAccount } from '../reducers/account';
import { AsureWsWalletProvider } from '../utils/asure-ws-wallet-provider';
import { getCurrentEthereumNetwork, getProtocol } from '../reducers/network';
import { AsureHttpWalletProvider } from '../utils/asure-http-wallet-provider';

// Override currentProvider from Mist/Metamask with our asure wallet for now
// This is picked up by drizzle.
function setWeb3Provider(mnemonic, protocol, currentEthereumNetwork) {
  window.web3 = {};

  const url = currentEthereumNetwork.urls[protocol];

  switch (protocol) {
    case 'http':
      window.web3.currentProvider = new AsureHttpWalletProvider(mnemonic, url);
      break;
    case 'ws':
      window.web3.currentProvider = new AsureWsWalletProvider(mnemonic, url);
      break;
    default:
      throw new Error(
        `Unsupported provider protocol "${protocol}". Please make sure that REACT_APP_PROVIDER_PROTOCOL is either "http" or "ws"`
      );
  }
}

export function* authFlowSaga() {
  yield take('persist/REHYDRATE');

  let account = yield select(getCurrentAccount);
  let currentEthereumNetwork = yield select(getCurrentEthereumNetwork);
  let protocol = yield call(getProtocol);

  let isAuthenticated = !!account;

  // In case the user in already logged in, we have to set the web3 provider.
  if (isAuthenticated) {
    yield call(
      setWeb3Provider,
      account.mnemonic,
      protocol,
      currentEthereumNetwork
    );
  }

  while (true) {
    if (!isAuthenticated) {
      yield take(LOGIN);
      isAuthenticated = true;
      console.log('User logged in.');

      account = yield select(getCurrentAccount);
      currentEthereumNetwork = yield select(getCurrentEthereumNetwork);
      protocol = yield call(getProtocol);
      yield call(
        setWeb3Provider,
        account.mnemonic,
        protocol,
        currentEthereumNetwork
      );
    }

    yield take(LOGOUT);
    isAuthenticated = false;
    window.location.hash = '/';
  }
}
