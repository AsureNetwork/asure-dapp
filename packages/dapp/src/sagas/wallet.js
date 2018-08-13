import { call, getContext, put, select, takeEvery } from 'redux-saga/effects';
import { loadingWalletBalance } from '../actions/wallet';

export function* watchDrizzleInitialized() {
  yield takeEvery('DRIZZLE_INITIALIZED', fetchBalances);
}

const getAccount = state => state.accounts[0];

function* fetchBalances() {
  const drizzle = yield getContext('drizzle');
  const PensionEuroToken = drizzle.contracts.PensionEuroToken;

  const ethAccount = yield select(getAccount);

  const cacheIds = {
    PensionEuroToken: yield call(
      PensionEuroToken.methods.balanceOf.cacheCall,
      ethAccount
    )
  };

  yield put(loadingWalletBalance(ethAccount, cacheIds));
}
