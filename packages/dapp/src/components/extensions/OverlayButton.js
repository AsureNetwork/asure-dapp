import React from 'react';
import { AsureStoreIco } from '../../thumbs';
import { withRouter } from 'react-router';

class OverlayButton extends React.Component {
  render() {
    return (
      <div className="overlay-button">
        <a
          onClick={() => {
            this.props.history.push(this.props.href);
          }}
        >
          <img src={AsureStoreIco} alt="overlay button" />
        </a>
      </div>
    );
  }
}

OverlayButton = withRouter(OverlayButton);

export { OverlayButton };
