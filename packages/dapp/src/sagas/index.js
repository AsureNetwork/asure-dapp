import { all } from 'redux-saga/effects';
import { authFlowSaga } from './auth';
import { watchLoadPension, watchPayIntoPension } from './pension';
import { watchDrizzleInitialized } from './wallet';
import { watchShowLoadingAnimation } from './loading';

export function* pensionSagas() {
  yield all([
    authFlowSaga(),
    watchLoadPension(),
    watchPayIntoPension(),
    watchDrizzleInitialized(),
    watchShowLoadingAnimation()
  ]);
}
