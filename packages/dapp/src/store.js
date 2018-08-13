import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducer from './reducers';
import { drizzleSagas, generateContractsInitialState } from 'drizzle';
import { all, fork } from 'redux-saga/effects';
import { drizzleOptions } from './drizzleOptions';
import { loadState, saveState } from './utils/state';
import { pensionSagas } from './sagas';

const initialState = loadState() || {};
initialState.contracts = generateContractsInitialState(drizzleOptions);

function* rootSaga() {
  yield all([...drizzleSagas.map(saga => fork(saga)), pensionSagas()]);
}

export const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const state = store.getState();
  saveState({
    app: state.app
  });
});

export default store;
