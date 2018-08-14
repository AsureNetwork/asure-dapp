import React, { Children, Component } from 'react';
import { AppLogo } from './Logo';
import { Progress, WingBlank } from 'antd-mobile';
import { drizzleConnect } from 'drizzle-react';

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  };
};

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 10,
      init: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ init: true }), 2000);
    setTimeout(() => this.setState({ percent: 20 }), 200);
    setTimeout(() => this.setState({ percent: 40 }), 400);
    setTimeout(() => this.setState({ percent: 70 }), 1000);
    setTimeout(() => this.setState({ percent: 100 }), 1300);
    //delete in production
    this.setState({ init: true });
  }

  render() {
    if (this.props.web3.status === 'failed') {
      return (
        // Display a web3 warning.
        <div>
          <div className="splash background bg-gray" />
          <WingBlank size="md">
            <div style={{ textAlign: 'center', padding: '30% 0 0 0' }}>
              <AppLogo styleName="lg" />
              <h1 className="title">ASURE App</h1>
              <h1>⚠</h1>
              <p>
                This browser has no connection to the Ethereum network. Please
                use the Chrome/FireFox extension MetaMask, or dedicated Ethereum
                browsers Mist or Parity.
              </p>
              <div
                style={{
                  position: 'fixed',
                  bottom: '0',
                  left: '0',
                  right: '0'
                }}
              >
                <p>www.asure.io</p>
              </div>
            </div>
          </WingBlank>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized && this.state.init) {
      //&& this.state.init
      // Load the dapp.
      return Children.only(this.props.children);
    }

    return (
      // Display a loading indicator.
      <div>
        <div className="splash background" />
        <WingBlank size="md">
          <div style={{ textAlign: 'center', padding: '30% 0 0 0' }}>
            <AppLogo styleName="lg" />
            <h1 className="title">ASURE</h1>
            <h4>RETHINK INSURANCE</h4>
            <Progress percent={this.state.percent} position="normal" />
            <div
              style={{ position: 'fixed', bottom: '0', left: '0', right: '0' }}
            >
              <p>www.asure.io</p>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}

Loading = drizzleConnect(Loading, mapStateToProps);

export { Loading };
