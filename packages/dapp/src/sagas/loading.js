import { call, cancelled, put, take, takeLatest } from 'redux-saga/effects';
import { delay, END, eventChannel } from 'redux-saga';
import {
  hideLoadingAnimation,
  SHOW_LOADING_ANIMATION,
  updateLoadingAnimation
} from '../actions/loading';

export function* watchShowLoadingAnimation() {
  yield takeLatest(SHOW_LOADING_ANIMATION, animateLoadingAnimation);
}

function counter(goal, interval) {
  let counter = 0;
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      counter += 1;
      if (goal > counter) {
        emitter(counter);
      } else {
        // this causes the channel to close
        emitter(END);
      }
    }, interval);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

function* animateLoadingAnimation(action) {
  const chan = yield call(counter, action.duration * 4, 250);
  let percentage;
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const seconds = yield take(chan);
      percentage = Math.floor((25 / action.duration) * seconds);
      yield put(updateLoadingAnimation(percentage));
    }
  } finally {
    if (yield cancelled()) {
      yield put(updateLoadingAnimation(0));
    } else {
      yield put(hideLoadingAnimation());
      yield call(delay, 500);
      yield put(updateLoadingAnimation(0));
    }
  }
}
