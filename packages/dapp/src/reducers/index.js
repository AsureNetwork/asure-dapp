import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';
import account, { initialState as accountInitialState } from './account';
import wallet, { initialState as walletInitialState } from './wallet';
import network, { initialState as networkInitialState } from './network';
import pension, { initialState as pensionInitialState } from './pension';
import intro, { initialState as introInitialState } from './intro';
import loading, { initialState as loadingInitialState } from './loading';

export const initialState = {
  app: {
    network: networkInitialState,
    account: accountInitialState,
    wallet: walletInitialState,
    products: { pension: pensionInitialState },
    intro: introInitialState,
    loading: loadingInitialState
  }
};

export default combineReducers({
  app: combineReducers({
    network,
    account,
    wallet,
    products: combineReducers({ pension }),
    intro,
    loading
  }),
  ...drizzleReducers
});
