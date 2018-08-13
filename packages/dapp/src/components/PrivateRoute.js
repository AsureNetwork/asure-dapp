import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentAccount } from '../reducers/account';

const mapStateToProps = state => {
  return {
    isAuthenticated: !!getCurrentAccount(state)
  };
};

let PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/" />;
      }
    }}
  />
);

PrivateRoute = connect(mapStateToProps)(PrivateRouteInternal);

export { PrivateRoute };
