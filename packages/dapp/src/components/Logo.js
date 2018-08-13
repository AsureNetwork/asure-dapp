import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AppLogo extends Component {
  static propTypes = {
    styleName: PropTypes.string
  };

  render() {
    return (
      <svg
        className={`asr-logo ${this.props.styleName || ''}`}
        viewBox="0 0 434.295 499.072"
        overflow="visible"
        enableBackground="new 0 0 434.295 499.072"
      >
        <polygon
          fill="#7FC6B7"
          stroke="#000000"
          strokeWidth="4"
          points="217.589,495.608 217.588,250.12 430.188,372.864 "
        />
        <polygon
          fill="#7FC6B7"
          stroke="#000000"
          strokeWidth="4"
          points="216.914,3.464 216.914,248.952 4.315,126.208 "
        />
        <polygon
          fill="#69ACD6"
          stroke="#000000"
          strokeWidth="4"
          points="4,372.646 216.601,249.901 216.599,495.391 "
        />
        <polygon
          fill="#7FC6B7"
          stroke="#000000"
          strokeWidth="4"
          points="217.725,249.83 430.325,127.084 430.324,372.573 "
        />
        <polygon
          fill="#7FC6B7"
          stroke="#000000"
          strokeWidth="4"
          points="430.295,126.677 217.694,249.422 217.696,3.934 "
        />
        <polygon
          fill="#69ACD6"
          stroke="#000000"
          strokeWidth="4"
          points="216.569,249.494 3.97,372.239 3.971,126.75 "
        />
      </svg>
    );
  }
}
