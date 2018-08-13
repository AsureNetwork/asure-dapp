import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { history, sagaMiddleware } from './store';

import './App.css';
import { Login } from './Login';
import { Main } from './Main';
import { ConnectedRouter } from 'connected-react-router';
import DrizzleProvider from './components/extensions/DrizzleProvider';
import { drizzleOptions } from './drizzleOptions';
import { Loading } from './components/Loading';
import { Drizzle } from 'drizzle';
import { getCurrentAccount } from './reducers/account';
import { isIntroDisabled } from './reducers/intro';

const mapStateToProps = state => {
  return {
    isAuthenticated: !!getCurrentAccount(state),
    skipIntro: isIntroDisabled(state)
  };
};

class App extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Login />;
    } else {
      // TODO: find better way to initialize drizzle and use it in our own sagas
      const drizzle = new Drizzle(drizzleOptions, store);
      sagaMiddleware.setContext({ drizzle });

      return (
        <DrizzleProvider
          options={drizzleOptions}
          store={store}
          drizzle={drizzle}
        >
          <Loading>
            <ConnectedRouter history={history}>
              <HashRouter>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to={'/home'} />}
                  />
                  <Route path="/:tab" component={Main} />
                </Switch>
              </HashRouter>
            </ConnectedRouter>
          </Loading>
        </DrizzleProvider>
      );
    }
  }
}

App = connect(mapStateToProps)(App);

export { App };
