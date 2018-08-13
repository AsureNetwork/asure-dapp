import { LOADING_WALLET_BALANCE } from '../actions/wallet';

export const initialState = {
  cacheIds: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_WALLET_BALANCE:
      return Object.assign({}, state, { cacheIds: action.cacheIds });
    default:
      return state;
  }
};

export const getWallet = state => state.app.wallet;

export const getErc20TokenBalance = (state, contract) => {
  const cacheIds = getWallet(state).cacheIds;
  if (!cacheIds) {
    return;
  }

  const tokenContract = state.contracts[contract];
  if (tokenContract.balanceOf[cacheIds[contract]]) {
    return tokenContract.balanceOf[cacheIds[contract]].value;
  }
};

export const getWalletData = state => {
  return {
    balances: {
      PensionEuroToken: getErc20TokenBalance(state, 'PensionEuroToken')
    }
  };
};
