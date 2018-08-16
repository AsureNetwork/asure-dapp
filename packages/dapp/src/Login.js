import React, { Component } from 'react';
import {
  Button,
  Flex,
  Icon,
  InputItem,
  List,
  NavBar,
  Picker,
  Popover,
  WingBlank
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { AppLogo } from './components/Logo';
import { login, switchEthereumNetwork } from './actions/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { Checked, Empty } from './thumbs';
import {
  getCurrentEthereumNetwork,
  getEthereumNetworks
} from './reducers/network';
import { getAccountErrorMessage, getTestAccounts } from './reducers/account';
import EthIcon from './components/extensions/EthIcon';
import { resetAccountErrorMessage } from './actions/account';

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    ethereumNetworks: getEthereumNetworks(state),
    currentEthereumNetwork: getCurrentEthereumNetwork(state),
    testAccounts: getTestAccounts(state),
    accountErrorMessage: getAccountErrorMessage(state),
    pickerTestAccounts: [
      getTestAccounts(state).map(acc => ({
        label: (
          <span
            style={{ textAlign: 'left', marginLeft: '20px', display: 'block' }}
          >
            <EthIcon
              // Address to draw
              address={acc.address}
              // scale * 8 pixel image size
              scale={32}
              // <img> props
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '0%',
                marginTop: '5px',
                background: 'white'
              }}
            />
            &nbsp;
            {acc.fullName +
              '  (' +
              moment().diff(moment(acc.birthDate), 'years') +
              ')'}
          </span>
        ),
        value: acc.username
      }))
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    },
    resetAccountErrorMessage: () => {
      dispatch(resetAccountErrorMessage());
    },
    switchEthereumNetwork: ethereumNetwork => {
      dispatch(switchEthereumNetwork(ethereumNetwork));
    }
  };
};

class Login extends Component {
  state = {};

  onLogin = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        // We reset the initialized flag of drizzle. Due to this, the DrizzleProvider will built
        // a new Drizzle object which will also initialize a second time.
        // This is wrong in so many ways but for now it does what it should.
        // TODO: find a better way
        this.props.drizzleStatus.initialized = false;

        const values = this.props.form.getFieldsValue();
        this.props.login(values.username, values.password);
      }
    });
  };

  onSelectTestAccount = values => {
    const account = this.props.testAccounts.find(a => a.username === values[0]);

    this.setState({ selectedTestAccount: values });
    this.props.form.setFieldsValue({
      username: account.username,
      password: account.password
    });
    this.onLogin();
  };

  onSelectEthereumNetwork = opt => {
    this.props.switchEthereumNetwork(opt.props.value);
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  componentDidMount() {
    this.props.resetAccountErrorMessage();
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <Flex
        direction="column"
        align="stretch"
        className="bg-gray"
        style={{ flex: '1', backgroundColor: '#efefef' }}
      >
        <NavBar
          mode="light"
          style={{ boxShadow: '0 0 5px rgba(136, 136, 136, 0.34)' }}
          rightContent={
            <Popover
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={this.props.ethereumNetworks.map(network => {
                return (
                  <Popover.Item
                    key={network.id}
                    value={network.id}
                    icon={
                      <img
                        src={
                          this.props.currentEthereumNetwork === network
                            ? Checked
                            : Empty
                        }
                        className="am-icon am-icon-xs"
                        alt=""
                      />
                    }
                    data-seed={network.id}
                  >
                    {network.title}
                  </Popover.Item>
                );
              })}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0]
              }}
              onSelect={this.onSelectEthereumNetwork}
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
        />
        <Flex align="center">
          <Flex.Item>
            <WingBlank size="md">
              <div
                className="zoomIn"
                style={{ textAlign: 'center', padding: '30px 15px 10px 15px' }}
              >
                <AppLogo styleName="lg" />
                <h1 className="title">ASURE</h1>
                <h4>RETHINK INSURANCE</h4>
              </div>
              <form>
                <List
                  renderFooter={() => (
                    <p>
                      {this.props.accountErrorMessage}
                      {getFieldError('username') &&
                        getFieldError('username').join(',')}
                    </p>
                  )}
                >
                  <Picker
                    data={this.props.pickerTestAccounts}
                    title="Personas"
                    okText="Ok"
                    dismissText="Cancel"
                    cascade={false}
                    extra="None"
                    value={this.state.selectedTestAccount}
                    onChange={this.onSelectTestAccount}
                    onOk={this.onSelectTestAccount}
                  >
                    <List.Item arrow="horizontal">Personas</List.Item>
                  </Picker>

                  <InputItem
                    {...getFieldProps('username', {
                      // initialValue: 'little ant',
                      rules: [{ required: true, message: 'Username required' }]
                    })}
                    clear
                    error={!!getFieldError('username')}
                    onErrorClick={() => {
                      alert(getFieldError('username').join('、'));
                    }}
                    placeholder="user@exampple.com"
                  >
                    Username
                  </InputItem>

                  <InputItem
                    {...getFieldProps('password')}
                    placeholder="******"
                    type="password"
                  >
                    Password
                  </InputItem>
                  <List.Item>
                    <Button onClick={this.onLogin} size="small" type="primary">
                      Login
                    </Button>
                  </List.Item>
                </List>
              </form>
            </WingBlank>
          </Flex.Item>
        </Flex>
      </Flex>
    );
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Login));

export { Login };
