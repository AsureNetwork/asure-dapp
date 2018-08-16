import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import { drizzleSagas, generateContractsInitialState } from 'drizzle';
import { all, fork } from 'redux-saga/effects';
import { drizzleOptions } from './drizzleOptions';
import { pensionSagas } from './sagas';
import { persistReducer, persistStore, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { migrations } from './store/migrations';

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['app'],
  version: Object.keys(migrations).length - 1,
  migrate: createMigrate(migrations, {
    debug: process.env.NODE_ENV === 'development'
  })
};

const persistedReducer = persistReducer(
  persistConfig,
  connectRouter(history)(rootReducer)
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

export const persistor = persistStore(store);

function* rootSaga() {
  yield all([...drizzleSagas.map(saga => fork(saga)), pensionSagas()]);
}
sagaMiddleware.run(rootSaga);

export default store;
