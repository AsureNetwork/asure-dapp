/*
 * From https://raw.githubusercontent.com/trufflesuite/drizzle-react/2f414c7bc553f036f9e6ae0a0ba64051a52c6913/src/DrizzleProvider.js
 * Issue https://github.com/trufflesuite/drizzle-react/issues/24
 */
import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { Drizzle, generateStore } from 'drizzle';

class DrizzleProvider extends Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    store: PropTypes.object,
    drizzle: PropTypes.object
  };

  // you must specify what you’re adding to the context
  static childContextTypes = {
    drizzle: PropTypes.object.isRequired,
    drizzleStore: PropTypes.object.isRequired
  };

  getChildContext() {
    const drizzleStore = this.props.store
      ? this.props.store
      : generateStore(this.props.options);
    const drizzle =
      this.props.drizzle || new Drizzle(this.props.options, drizzleStore);

    return { drizzle, drizzleStore };
  }

  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children);
  }
}

export default DrizzleProvider;
