import React from 'react';
import {
  ActivityIndicator,
  Button,
  InputItem,
  Result,
  Tabs,
  WhiteSpace,
  WingBlank
} from 'antd-mobile';
import { Faucet as FaucetThumb } from '../../thumbs';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { createForm } from 'rc-form';
import { Sticky, StickyContainer } from 'react-sticky';
import {
  completeLongstandingOperation,
  startLongstandingOperation
} from '../../actions/loading';

class Faucet extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      animating: false,
      address: this.props.accounts[0]
    };
  }

  sendTx = val => {
    if (!this.props.drizzleStatus.initialized) {
      console.warn('sendTx', 'drizzle not initialized.');
      return;
    }

    if (!this.props.accounts[0]) {
      console.warn('sendTx', 'no accounts - unlock MetaMask.');
      return;
    }
    this.showToast();
    this.props.startLongstandingOperation();
    const tx = this.context.drizzle.contracts.PensionEuroToken.methods
      .mint(this.props.accounts[0], (val * 10 ** 18).toString(16))
      .send({ from: this.props.accounts[0] });

    console.log('sendTx', 'tx sent');
    tx.then(
      result => {
        console.log('sendTx', result);
        setTimeout(() => {
          this.props.history.push('/wallet');
        }, 500);
      },
      error => {
        console.error('sendTx', error);
      }
    ).finally(() => {
      this.props.completeLongstandingOperation();
    });
  };

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
  };

  renderTabBar = props => {
    return (
      <Sticky topOffset={-45}>
        {({ style, isSticky }) => (
          <div
            style={{ ...style, zIndex: 1, marginTop: isSticky ? '45px' : '0' }}
          >
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Result
          img={<img src={FaucetThumb} alt="pension" className="spe" />}
          title={'Faucet'}
          message=""
        />

        <StickyContainer>
          <Tabs
            tabs={[{ title: 'EUR' }, { title: 'ETH' }]}
            initialPage={0}
            renderTabBar={this.renderTabBar}
            onChange={(tab, index) => {
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab);
            }}
          >
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <WingBlank>
                <h2>How does this work?</h2>
                <p>
                  This <strong>Euro Token</strong> faucet is running on the
                  Rinkeby network. To prevent malicious actors from exhausting
                  all available funds or accumulating enough EUR to mount long
                  running spam attacks, requests are tied to common 3rd party
                  social network accounts. Anyone having a Twitter, Google+ or
                  Facebook account may request funds within the permitted
                  limits.
                </p>
                <p>
                  To request funds via Twitter,{' '}
                  <strong>
                    <a
                      href={
                        'https://twitter.com/intent/tweet?text=Requesting%20faucet%20EUR%20funds%20@asure_io%20into%20' +
                        this.state.address +
                        '%20on%20the%20%23Rinkeby%20%23Ethereum%20test%20network.'
                      }
                      target="_blank"
                    >
                      make a tweet
                    </a>
                  </strong>{' '}
                  with your Ethereum address pasted into the contents
                  (surrounding text doesn't matter). Copy-paste the tweets URL
                  into the above input box and fire away!
                </p>
                <p>
                  The faucet is running invisible reCaptcha protection against
                  bots.
                </p>
                <div className="center">
                  <InputItem
                    {...getFieldProps('control')}
                    labelNumber={2}
                    placeholder="Tweet link"
                  >
                    Url
                  </InputItem>

                  <Button
                    type="primary"
                    size="small"
                    style={{ width: '100%' }}
                    onClick={() => this.sendTx(1000)}
                  >
                    1.000 EUR
                  </Button>
                  <WhiteSpace />
                  <Button
                    type="primary"
                    size="small"
                    style={{ width: '100%' }}
                    onClick={() => this.sendTx(100000)}
                  >
                    100.000 EUR
                  </Button>
                  <WhiteSpace />
                  <Button
                    type="primary"
                    size="small"
                    style={{ width: '100%' }}
                    onClick={() => this.sendTx(1000000)}
                  >
                    1.000.000 EUR
                  </Button>
                </div>
              </WingBlank>
              <WhiteSpace />
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <WingBlank>
                <h2>
                  How does this work? Your address: https://faucet.rinkeby.io/
                </h2>
              </WingBlank>
            </div>
          </Tabs>
        </StickyContainer>

        <ActivityIndicator
          toast
          text="Loading..."
          animating={this.state.animating}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts
    //contracts: state.contracts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLongstandingOperation: () => dispatch(startLongstandingOperation()),
    completeLongstandingOperation: () =>
      dispatch(completeLongstandingOperation())
  };
};

Faucet = drizzleConnect(
  withRouter(createForm()(Faucet)),
  mapStateToProps,
  mapDispatchToProps
);

export { Faucet };
