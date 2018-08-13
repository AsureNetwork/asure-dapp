import React, { Component } from 'react';
import { DeviceWrapper } from './DeviceWrapper';

class App extends Component {
  render() {
    return (
      <DeviceWrapper>
        <iframe
          title="app"
          src={process.env.REACT_APP_IFRAME_SRC}
          style={{ width: '100%', height: '100%' }}
          frameBorder="0"
        />
      </DeviceWrapper>
    );
  }
}

export default App;
