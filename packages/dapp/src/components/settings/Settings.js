import React from 'react';
import { List, Result, Tabs, Toast } from 'antd-mobile';
import {
  Asure,
  Calendar,
  Country,
  FacebookCircle,
  Flasks,
  JobIco,
  Language,
  LinkedinCircle,
  Name,
  Networking,
  Privacy,
  RedditCircle,
  Social,
  TelegramCircle,
  Tou,
  TwitterCircle
} from '../../thumbs';
import { withRouter } from 'react-router-dom';
import { ContractData } from 'drizzle-react-components';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { Sticky, StickyContainer } from 'react-sticky';
import { getCurrentEthereumNetwork, getProtocol } from '../../reducers/network';
import { getCurrentAccount } from '../../reducers/account';
import { Constants } from '../Constants';
import { AppLogo } from '../Logo';
import {
  completeLongstandingOperation,
  startLongstandingOperation
} from '../../actions/loading';
import moment from 'moment';

const mapStateToProps = state => {
  return {
    protocol: getProtocol(),
    currentEthereumNetwork: getCurrentEthereumNetwork(state),
    drizzleStatus: state.drizzleStatus,
    account: getCurrentAccount(state)
  };
};

const mapDipatchToProps = dispatch => {
  return {
    startLongstandingOperation: () => dispatch(startLongstandingOperation()),
    completeLongstandingOperation: () =>
      dispatch(completeLongstandingOperation())
  };
};

class Settings extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.contracts = context.drizzle.contracts;
    this.state = { index: 0 };
  }

  onSendTestTx = () => {
    if (!this.props.drizzleStatus.initialized) {
      console.warn('onSendTestTx', 'drizzle not initialized.');
      return;
    }

    Toast.success(
      'Your changes will be persisted to the blockchain now. This can take a several seconds ...',
      3
    );
    this.props.startLongstandingOperation();
    const tx = this.contracts.Test.methods.increment().send();

    console.log('onSendTestTx', 'tx sent');
    tx.then(
      result => {
        console.log('onSendTestTx', result);
      },
      error => {
        console.error('onSendTestTx', error);
      }
    ).finally(() => {
      this.props.completeLongstandingOperation();
    });
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

  renderResult = () => {
    if (this.state.index !== 3) {
      return (
        <Result
          img={<img src={this.props.account.img} className="spe" alt="" />}
          title={this.props.account.fullName}
          message={<div>{this.props.account.username}</div>}
        />
      );
    } else {
      return (
        <Result
          img={<AppLogo styleName="lg" />}
          title={Constants.NAME}
          message={'Version ' + Constants.VERSION}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderResult()}

        <StickyContainer>
          <Tabs
            tabs={[
              { title: 'Profile' },
              { title: 'Settings' },
              { title: 'Security' },
              { title: 'About' }
            ]}
            initialPage={0}
            renderTabBar={this.renderTabBar}
            onChange={(tab, index) => {
              this.setState({ index });
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              this.setState({ index });
              console.log('onTabClick', index, tab);
            }}
          >
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List className="my-list">
                <List.Item thumb={Name}>
                  Name
                  <List.Item.Brief>
                    {this.props.account.fullName}
                  </List.Item.Brief>
                </List.Item>
                <List.Item thumb={Calendar}>
                  Birthday
                  <List.Item.Brief>
                    {moment(this.props.account.birthDate).format('YYYY-MM-DD')}{' '}
                    ({moment().diff(
                      moment(this.props.account.birthDate),
                      'years'
                    )})
                  </List.Item.Brief>
                </List.Item>
                <List.Item thumb={Social}>
                  Social Security Number
                  <List.Item.Brief>DE213134551234123</List.Item.Brief>
                </List.Item>
                <List.Item thumb={JobIco}>
                  Job
                  <List.Item.Brief>Asure Foundation</List.Item.Brief>
                </List.Item>
              </List>
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List className="my-list">
                <List.Item
                  thumb={Language}
                  multipleLine
                  onClick={() => {
                    //this.props.history.push('/settings/language');
                  }}
                >
                  Language
                  <List.Item.Brief>English</List.Item.Brief>
                </List.Item>
                <List.Item thumb={Country}>
                  Country
                  <List.Item.Brief>Germany</List.Item.Brief>
                </List.Item>
                <List.Item thumb={Networking}>
                  Ethereum Network
                  <List.Item.Brief>
                    {this.props.currentEthereumNetwork.title} -{' '}
                    {
                      this.props.currentEthereumNetwork.urls[
                        this.props.protocol
                      ]
                    }
                  </List.Item.Brief>
                </List.Item>
                <List.Item thumb={Flasks} onClick={this.onSendTestTx}>
                  Test contract{' '}
                  <ContractData contract="Test" method="helloWorld" />
                </List.Item>
              </List>
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List className="my-list">
                <List.Item
                  arrow="horizontal"
                  thumb={Privacy}
                  onClick={() => {
                    this.props.history.push('/settings/privacy');
                  }}
                >
                  Privacy
                </List.Item>
                <List.Item
                  arrow="horizontal"
                  thumb={Tou}
                  onClick={() => {
                    this.props.history.push('/settings/tou');
                  }}
                >
                  Term of use
                </List.Item>
              </List>
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List className="my-list">
                <List.Item
                  arrow="horizontal"
                  thumb={Asure}
                  onClick={() => {
                    window.open('https://www.asure.io?s=poc', '_blank');
                  }}
                >
                  Visit our Website
                </List.Item>

                <List.Item
                  arrow="horizontal"
                  thumb={TwitterCircle}
                  onClick={() => {
                    window.open('https://twitter.com/asure_io', '_blank');
                  }}
                >
                  Follow us on Twitter
                </List.Item>
                <List.Item
                  arrow="horizontal"
                  thumb={TelegramCircle}
                  onClick={() => {
                    window.open('https://t.me/asure_io', '_blank');
                  }}
                >
                  Follow us on Telegram
                </List.Item>
                <List.Item
                  arrow="horizontal"
                  thumb={RedditCircle}
                  onClick={() => {
                    window.open('https://www.reddit.com/r/asure', '_blank');
                  }}
                >
                  Follow us on Reddit
                </List.Item>
                <List.Item
                  arrow="horizontal"
                  thumb={LinkedinCircle}
                  onClick={() => {
                    window.open(
                      'https://www.linkedin.com/company/asure/',
                      '_blank'
                    );
                  }}
                >
                  Follow us on Linkedin
                </List.Item>
                <List.Item
                  arrow="horizontal"
                  thumb={FacebookCircle}
                  onClick={() => {
                    window.open('https://www.facebook.com/asure.io', '_blank');
                  }}
                >
                  Like us on Facebook
                </List.Item>
              </List>
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

Settings = drizzleConnect(
  withRouter(Settings),
  mapStateToProps,
  mapDipatchToProps
);

export { Settings };
