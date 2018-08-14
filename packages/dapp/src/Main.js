import React from 'react';
import { connect } from 'react-redux';
import { Flex, Icon, NavBar, Popover, Progress, TabBar } from 'antd-mobile';
import { Pension } from './components/pension/Pension';
import { Route } from 'react-router-dom';
import { TermOfUse } from './components/settings/TermOfUse';
import { Privacy } from './components/settings/Privacy';
import { AsureStoreIco, Help, Logout, QrCode, QrScan } from './thumbs';
import { Send } from './components/wallet/Send';
import { Receive } from './components/wallet/Receive';
import { Faucet } from './components/wallet/Faucet';
import { logout } from './actions/actions';
import { Scan } from './components/wallet/Scan';
import { Wallet } from './components/wallet/Wallet';
import { History } from './components/history/History';
import { Overview } from './components/overview/Overview';
import { PensionOverview } from './components/overview/PensionOverview';
import { NoOverview } from './components/overview/NoOverview';
import { Store } from './components/home/Store';
import { Intro } from './components/home/Intro';
import { Settings } from './components/settings/Settings';
import { getCurrentAccount } from './reducers/account';
import { Home } from './components/home/Home';
import { isIntroDisabled, isIntroSkipped } from './reducers/intro';
import { showIntro } from './actions/intro';
import { getLoadingInfo } from './reducers/loading';

const mapStateToProps = state => {
  return {
    account: getCurrentAccount(state),
    skipIntro: isIntroSkipped(state) || isIntroDisabled(state),
    loadingInfo: getLoadingInfo(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    showIntro: () => dispatch(showIntro())
  };
};

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hidden: false,
      visible: false,
      selected: ''
    };
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <div style={{ paddingTop: 60 }}>Show “{pageText}” information</div>
      </div>
    );
  }

  onSelect = opt => {
    // console.log(opt.props.value);
    if (opt.props.value === 'store') {
      this.navigate('/home/store');
    }
    if (opt.props.value === 'logout') {
      this.props.logout();
    }
    if (opt.props.value === 'scan') {
      this.navigate('/wallet/scan');
    }
    if (opt.props.value === 'help') {
      this.props.showIntro();
    }
    this.setState({
      visible: false,
      selected: opt.props.value
    });
  };
  handleVisibleChange = visible => {
    this.setState({
      visible: visible
    });
  };

  navigate = path => {
    if (path !== this.props.history.location.pathname) {
      this.props.history.push(path);
    }
  };

  render() {
    const match = this.props.match;

    if (this.props.skipIntro) {
      return (
        <Flex
          direction="column"
          align="stretch"
          style={{ flex: '1', zIndex: '100' }}
        >
          <NavBar
            mode="light"
            style={{
              flex: '0 0 45px',
              boxShadow: '0 0 5px rgba(136, 136, 136, 0.34)'
            }}
            icon={
              <Icon
                type="left"
                style={{
                  display: this.props.history.length <= 1 ? 'none' : ''
                }}
              />
            }
            onLeftClick={() => this.props.history.goBack()}
            rightContent={
              <Popover
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                  <Popover.Item
                    key="3"
                    value="store"
                    icon={
                      <img
                        src={AsureStoreIco}
                        className="am-icon am-icon-xs"
                        alt=""
                      />
                    }
                    data-seed="logId"
                  >
                    Asure Store
                  </Popover.Item>,
                  <Popover.Item
                    key="4"
                    value="scan"
                    icon={
                      <img src={QrScan} className="am-icon am-icon-xs" alt="" />
                    }
                    data-seed="logId"
                  >
                    Scan
                  </Popover.Item>,
                  <Popover.Item
                    key="5"
                    value="special"
                    icon={
                      <img src={QrCode} className="am-icon am-icon-xs" alt="" />
                    }
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    My Qrcode
                  </Popover.Item>,
                  <Popover.Item
                    key="6"
                    value="help"
                    icon={
                      <img src={Help} className="am-icon am-icon-xs" alt="" />
                    }
                  >
                    <span style={{ marginRight: 5 }}>Help</span>
                  </Popover.Item>,
                  <Popover.Item
                    key="7"
                    value="logout"
                    icon={
                      <img src={Logout} className="am-icon am-icon-xs" alt="" />
                    }
                  >
                    <span style={{ marginRight: 5 }}>Logout</span>
                  </Popover.Item>
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-10, 0]
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              >
                <div
                  style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon type="ellipsis" />
                </div>
              </Popover>
            }
          >
            <span style={{ color: '#888888' }}>ASURE</span>
          </NavBar>

          <Progress
            position="normal"
            percent={this.props.loadingInfo.percentage}
            style={{
              visibility: this.props.loadingInfo.visible ? 'visible' : 'hidden'
            }}
          />

          <div style={{ flex: '1', overflowY: 'auto' }} className="content">
            <TabBar
              id="tab-bar"
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              tabBarPosition="bottom"
              hidden={this.state.hidden}
              prerenderingSiblingsNumber={0}
            >
              <TabBar.Item
                icon={<div className="home" />}
                selectedIcon={<div className="home" />}
                title="My Products"
                key="Home"
                selected={this.props.match.params.tab === 'home'}
                onPress={() => {
                  this.navigate('/home');
                }}
                data-seed="logId1"
              >
                <Route exact path="/home" component={Home} />
                <Route path="/home/pension/" component={Pension} />
                <Route path="/home/store/" component={Store} />
              </TabBar.Item>

              <TabBar.Item
                icon={<div className="overview" />}
                selectedIcon={<div className="overview" />}
                title="Overview"
                key="Overview"
                selected={this.props.match.params.tab === 'overview'}
                onPress={() => {
                  this.navigate('/overview');
                }}
                data-seed="logId1"
              >
                <Route exact path="/overview" component={Overview} />
                <Route path={`/overview/pension`} component={PensionOverview} />
                <Route path={`/overview/notyet`} component={NoOverview} />
              </TabBar.Item>

              <TabBar.Item
                title="Wallet"
                key="Wallet"
                icon={<div className="wallet" />}
                selectedIcon={<div className="wallet" />}
                selected={match.params.tab === 'wallet'}
                badge={1}
                onPress={() => {
                  this.navigate('/wallet');
                }}
                data-seed="logId"
              >
                <Route exact path="/wallet" component={Wallet} />
                <Route path="/wallet/send" component={Send} />
                <Route path="/wallet/receive" component={Receive} />
                <Route path="/wallet/faucet" component={Faucet} />
                <Route path="/wallet/scan" component={Scan} />
              </TabBar.Item>

              <TabBar.Item
                icon={<div className="history" />}
                selectedIcon={<div className="history" />}
                title="History"
                key="History"
                selected={this.props.match.params.tab === 'history'}
                onPress={() => {
                  this.navigate('/history');
                }}
                data-seed="logId1"
              >
                <Route exact path="/history" component={History} />
              </TabBar.Item>

              <TabBar.Item
                icon={<div className="settings" />}
                selectedIcon={<div className="settings" />}
                title="Settings"
                key="Settings"
                dot
                selected={this.props.match.params.tab === 'settings'}
                onPress={() => {
                  this.navigate('/settings');
                }}
              >
                <Route exact path="/settings" component={Settings} />
                <Route path="/settings/tou" component={TermOfUse} />
                <Route path="/settings/privacy" component={Privacy} />
              </TabBar.Item>
            </TabBar>
          </div>
        </Flex>
      );
    } else {
      return <Intro />;
    }
  }
}

Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export { Main };
