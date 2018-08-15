import {
  cancel,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  COMPLETE_LONGSTANDING_OPERATION,
  INCREMENT_PROGRESS,
  incrementProgress,
  resetLongstandingOperations,
  setProgressVisibility,
  START_LONGSTANDING_OPERATION,
  updateProgress
} from '../actions/loading';
import { getLoading } from '../reducers/loading';
import { all } from '../../node_modules/redux-saga/effects';

export function* loadingSaga() {
  yield all([
    yield takeEvery(START_LONGSTANDING_OPERATION, doStartLongstandingOperation),
    yield takeEvery(
      COMPLETE_LONGSTANDING_OPERATION,
      doCompleteLongstandingOperation
    ),
    yield takeLatest(INCREMENT_PROGRESS, doIncrementProgress)
  ]);
}

function* doStartLongstandingOperation() {
  const loading = yield select(getLoading);

  if (loading.operationsTotal === 1) {
    yield startProgress();
  }

  yield doUpdateProgress(loading.operationsCompleted / loading.operationsTotal);
}

function* doCompleteLongstandingOperation() {
  const loading = yield select(getLoading);

  if (loading.operationsCompleted >= loading.operationsTotal) {
    yield completeProgress();
  } else {
    yield doUpdateProgress(
      loading.operationsCompleted / loading.operationsTotal
    );
  }
}

function* startProgress() {
  yield doUpdateProgress(0.02);
  yield put(setProgressVisibility(true));
}

function* completeProgress() {
  yield doUpdateProgress(1);

  const bgTask = yield fork(doResetLongstandingOperation);

  yield take(START_LONGSTANDING_OPERATION);
  yield cancel(bgTask);
}

function* doUpdateProgress(status) {
  yield put(updateProgress(status));
  yield put(incrementProgress());
}

function* doIncrementProgress() {
  yield delay(250);

  const loading = yield select(getLoading);
  const status = loading.status;

  if (status >= 1) {
    return;
  }

  let rnd = 0;
  if (status >= 0 && status < 0.25) {
    // Start out between 3 - 6% increments
    rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
  } else if (status >= 0.25 && status < 0.65) {
    // increment between 0 - 3%
    rnd = (Math.random() * 3) / 100;
  } else if (status >= 0.65 && status < 0.9) {
    // increment between 0 - 2%
    rnd = (Math.random() * 2) / 100;
  } else if (status >= 0.9 && status < 0.95) {
    // finally, increment it .5 %
    rnd = 0.005;
  } else {
    // after 95%, don't increment:
    rnd = 0;
  }

  yield doUpdateProgress(status + rnd);
}

function* doResetLongstandingOperation() {
  yield delay(300);
  yield put(setProgressVisibility(false));
  yield put(resetLongstandingOperations());
  yield delay(300);
  yield put(updateProgress(0));
}
