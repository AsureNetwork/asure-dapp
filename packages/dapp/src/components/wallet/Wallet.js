import React from 'react';
import { Badge, List, Result, Toast } from 'antd-mobile';
import {
  Faucet,
  Friend,
  Receive,
  Send,
  tokenBnb,
  tokenDai,
  tokenEthereum,
  tokenEuro
} from '../../thumbs';

import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { ContractDataExt } from '../extensions/ContractDataExt';
import { withRouter } from 'react-router';
import * as web3 from 'web3';
import { getCurrentAccount } from '../../reducers/account';
import EthIcon from '../extensions/EthIcon';

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts,
    accountBalances: state.accountBalances,
    account: getCurrentAccount(state),
    contracts: state.contracts
  };
};

class Wallet extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    let address = this.props.accounts[0];
    let ethBalance = 0;
    if (this.props.accountBalances) {
      ethBalance = web3.utils.fromWei(
        this.props.accountBalances[address],
        'ether'
      );
    }
    this.state = {
      ethBalance: ethBalance,
      address: address,
      network: '' //rinkeby or empty for default
    };
  }

  navigate = path => {
    if (path !== this.props.history.location.pathname) {
      this.props.history.push(path);
    }
  };

  infoDemo = () => {
    Toast.info('just for demonstration purposes', 1);
  };
  infoFaucet = () => {
    Toast.info('you can request the funds in the Faucet menu', 3);
  };

  render() {
    return (
      <div>
        <Result
          img={
            <EthIcon
              // Address to draw
              address={this.state.address}
              // scale * 8 pixel image size
              scale={32}
              // <img> props
              style={{
                width: '128px',
                height: '128px',
                borderRadius: '50%',
                background: 'white'
              }}
            />
          }
          title="Wallet"
          message={
            <div>
              <h6>
                <a
                  href={
                    'https://' +
                    (this.state.network ? this.state.network + '.' : '') +
                    'etherscan.io/address/' +
                    this.state.address
                  }
                  target="_blank"
                >
                  {this.state.address}
                </a>
              </h6>
            </div>
          }
        />

        <List>
          <List.Item
            thumb={tokenEthereum}
            extra={Number(this.state.ethBalance || 0.0).toFixed(5) + ' ETH'}
            onClick={() => {
              this.infoFaucet();
            }}
          >
            Ethereum <Badge dot style={{ top: '-10px' }} />
          </List.Item>

          <List.Item
            thumb={tokenEuro}
            extra={
              <ContractDataExt
                contract="PensionEuroToken"
                method="balanceOf"
                render={data => (
                  <div className="myStyle">
                    {Math.floor(data / 10 ** 18)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' EUR'}
                  </div>
                )}
                methodArgs={[
                  this.props.accounts[0],
                  { from: this.props.accounts[0] }
                ]}
              />
            }
            onClick={() => {
              this.infoFaucet();
            }}
          >
            Euro <Badge dot style={{ top: '-10px' }} />
          </List.Item>
          <List.Item
            thumb={tokenBnb}
            extra={'BNB 120.12'}
            onClick={() => {
              this.infoDemo();
            }}
          >
            BNB
          </List.Item>
          <List.Item
            thumb={tokenDai}
            extra={'DAI 598.38'}
            onClick={() => {
              this.infoDemo();
            }}
          >
            DAI
          </List.Item>
        </List>

        {/*
        <List renderHeader={() => 'Align Vertical Center'} className="my-list">
          <List.Item multipleLine extra="extra content">
            Title <List.Item.Brief>subtitle</List.Item.Brief>
          </List.Item>
        </List>
        */}

        <List renderHeader={() => 'Wallet'}>
          {/*
          <List.Item thumb={Wallet} arrow="horizontal" onClick={() => {}}>
            Wallet
          </List.Item>
          */}

          <List.Item
            thumb={Send}
            arrow="horizontal"
            onClick={() => {
              this.navigate('/wallet/send');
            }}
          >
            Send <Badge dot style={{ top: '-10px' }} />
          </List.Item>

          <List.Item
            thumb={Receive}
            arrow="horizontal"
            onClick={() => {
              this.navigate('/wallet/receive');
            }}
          >
            Receive <Badge dot style={{ top: '-10px' }} />
          </List.Item>

          <List.Item
            thumb={Faucet}
            arrow="horizontal"
            onClick={() => {
              this.navigate('/wallet/faucet');
            }}
          >
            Faucet <Badge dot style={{ top: '-10px' }} />
          </List.Item>

          <List.Item
            thumb={Friend}
            onClick={() => {
              this.infoDemo();
              //this.navigate('/wallet/sayfriend');
            }}
          >
            Say friend
          </List.Item>
          {/*
          <List.Item
            thumb={History}
            arrow="horizontal"
            onClick={() => {
              this.props.history.push('/wallet/paymenthistory');
            }}
          >
            Payment history
            <Badge text={'1'} style={{ marginLeft: 12 }} />
          </List.Item>

          <List.Item thumb={PieChart} onClick={() => {}} arrow="horizontal">
            My Cost Ratio
          </List.Item>
          */}
        </List>
      </div>
    );
  }
}

Wallet = drizzleConnect(withRouter(Wallet), mapStateToProps);

export { Wallet };
