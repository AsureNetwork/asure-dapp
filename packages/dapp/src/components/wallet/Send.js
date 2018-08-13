import React from 'react';
import {
  ActionSheet,
  ActivityIndicator,
  Badge,
  Button,
  Flex,
  Icon,
  InputItem,
  List,
  Pagination,
  Popover,
  Result,
  Switch,
  WingBlank
} from 'antd-mobile';
import { AddressBookIcon, EuroIco, Name, QrCode } from '../../thumbs';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import EthIcon from '../extensions/EthIcon';
import { createForm } from 'rc-form';
import { getParams } from '../../utils/getParams';

class Send extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.contracts = context.drizzle.contracts;

    let name = 'Unknown';
    let params = getParams(this.props);
    if (params.name) {
      name = decodeURI(params.name);
    }
    let address = '0x';
    if (params.address) {
      address = params.address;
    }

    let step = 0;
    if (params.step) {
      step = parseInt(params.step, 10);
    }

    let amount = 0;
    if (params.amount) {
      amount = parseFloat(params.amount);
    }

    let currency = 'ETH';
    if (params.currency) {
      currency = params.currency;
    }
    let callback = '';
    if (params.callback) {
      callback = params.callback;
    }

    this.state = {
      animating: false,
      receiver: '',
      name: name,
      address: address,
      step: step,
      currency: currency,
      amount: amount,
      currencyPopoverVisible0: false,
      currencyPopoverVisible1: false,
      callback: callback
    };
    this.last = this.last.bind(this);
    this.next = this.next.bind(this);
    this.send = this.send.bind(this);
  }

  dataList = [
    {
      url: 'wvEzCMiDZjthhAOcwTOu',
      title: 'Paul Mizel',
      address: '0xD34dF93618B8b33Ab4A871d45C7D0aA0c9Db9b34'
    },
    {
      url: 'cTTayShKtEIdQVEMuiWt',
      title: 'Fabian Raetz',
      address: '0x79461C71BfE8D7b3bF826Dea15D7494A6af1bE81'
    },
    {
      url: 'umnHwvEgSyQtXlZjNJTt',
      title: 'Gamal Schmuck',
      address: '0xd09E4938517A3cDEa80696B9a5Ebbc90Ca12c895'
    },
    {
      url: 'umnHwvEgSyQtXlZjNJTt',
      title: 'Michael Lurz',
      address: '0xb65bd15f91499ae7bf0baf82d18043bd011d1a68'
    }
  ].map(obj => ({
    address: obj.address,
    icon: (
      <EthIcon
        // Address to draw
        address={obj.address}
        // scale * 8 pixel image size
        scale={32}
        // <img> props
        style={{
          width: '60px',
          height: '60px',
          background: 'white'
        }}
      />
    ),
    title: obj.title
  }));

  componentDidMount() {
    this.readBalance();
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  showShareActionSheet = () => {
    ActionSheet.showShareActionSheetWithOptions(
      {
        options: this.dataList,
        // title: 'title',
        message: 'Please select a receiver',
        cancelButtonText: 'Cancel'
      },
      buttonIndex => {
        if (buttonIndex === -1) {
          return;
        }
        let receiver = this.dataList[buttonIndex];
        this.setState({ receiver: receiver });
        this.setState({ name: receiver.title });
        this.setState({ address: receiver.address });

        //Toast.info('Receiver ' + receiver.title + ' selected...');
        /*// also support Promise
        return new Promise(resolve => {

          setTimeout(resolve, 500);
        });*/
      }
    );
  };

  showToast = () => {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
  };

  readBalance = () => {
    if (this.state.currency === 'ETH') {
      let address = this.props.accounts[0];
      if (this.props.accountBalances) {
        let balance = this.props.accountBalances[address];
        this.setState({ balance: balance });
      }
    } else if (this.state.currency === 'EUR') {
      this.contracts.PensionEuroToken.methods
        .balanceOf(this.props.accounts[0])
        .call({ from: this.props.accounts[0] })
        .then(data => {
          this.setState({ balance: data });
        });
    } else {
      this.setState({ balance: 0 });
    }
  };

  menu = [
    <Popover.Item key="4" value="ETH" data-seed="logId">
      ETH Ethereum
    </Popover.Item>,
    <Popover.Item key="5" value="EUR" style={{ whiteSpace: 'nowrap' }}>
      Euro Token
    </Popover.Item>,
    <Popover.Item key="6" value="ASR">
      {' '}
      <span style={{ marginRight: 5 }}>Asure Token</span>{' '}
    </Popover.Item>
  ];

  currencySelector = () => {
    return (
      <Popover
        overlayClassName="fortest"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.currencyPopoverVisible}
        overlay={this.menu}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0]
        }}
        onVisibleChange={visible => {
          this.setState({ currencyPopoverVisible: visible });
        }}
        onSelect={e => {
          this.setState({
            currencyPopoverVisible: false,
            currency: e.props.value
          });
          setTimeout(() => this.readBalance(), 1);
        }}
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
          {this.state.currency} <Icon type="down" />
        </div>
      </Popover>
    );
  };

  styleBadge = {
    marginLeft: 12,
    padding: '0 3px',
    backgroundColor: '#1193d4',
    borderRadius: 2
  };

  last() {
    let num = this.state.step - 1;
    this.setState({ step: num });
  }

  next() {
    let num = this.state.step + 1;
    this.setState({ step: num });
  }

  send() {
    if (this.state.currency === 'ETH') {
    } else {
    }

    this.showToast();
    if (this.state.callback) {
      setTimeout(() => {
        this.props.history.push(this.state.callback);
      }, 500);
    } else {
      this.setState({
        step: 0,
        name: 'Unknown',
        address: '0x',
        amount: 0
      });
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
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
          title="Receiver"
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

        <div>
          <List style={{ display: this.state.step === 0 ? '' : 'none' }}>
            <List.Item
              thumb={AddressBookIcon}
              extra={''}
              onClick={this.showShareActionSheet}
            >
              Addressbook
            </List.Item>
            <List.Item
              thumb={QrCode}
              extra={''}
              onClick={() => {
                this.props.history.push('/wallet/scan');
              }}
            >
              Scan QR Code
            </List.Item>
          </List>

          <List style={{ display: this.state.step === 0 ? '' : 'none' }}>
            <div
              style={{
                display: this.state.name === 'Unknown' ? 'none' : 'block'
              }}
            >
              <InputItem
                {...getFieldProps('inputname')}
                placeholder="Unknown"
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e });
                }}
                labelNumber={4}
                extra={
                  <Icon
                    type="cross-circle"
                    size="xs"
                    onClick={() => {
                      this.setState({ name: 'Unknown' });
                      this.setState({ address: '0x' });
                    }}
                  />
                }
              >
                <div>Name</div>
              </InputItem>
            </div>
            <InputItem
              {...getFieldProps('inputaddress')}
              placeholder="address"
              labelNumber={1}
              value={this.state.address}
              onChange={e => this.setState({ address: e })}
              style={{ fontSize: '12px' }}
            >
              <div>
                <EthIcon
                  // Address to draw
                  address={this.state.address}
                  // scale * 8 pixel image size
                  scale={32}
                  // <img> props
                  style={{
                    width: '22px',
                    height: '22px',
                    background: 'white'
                  }}
                />
              </div>
            </InputItem>

            <List.Item
              style={{
                display:
                  this.state.name === 'Unknown' || true ? 'none' : 'block'
              }}
              extra={
                <Switch
                  {...getFieldProps('Switch5', {
                    initialValue: true,
                    valuePropName: 'checked'
                  })}
                  platform="android"
                />
              }
            >
              Save in Favorites
            </List.Item>
          </List>

          <List style={{ display: this.state.step === 1 ? '' : 'none' }}>
            <InputItem
              {...getFieldProps('inputbalance')}
              placeholder="balance"
              value={this.state.balance / 10 ** 18}
              labelNumber={5}
              editable={false}
              extra={this.currencySelector()}
            >
              <div>Balance</div>
            </InputItem>

            <InputItem
              type="money"
              placeholder="amount"
              moneyKeyboardAlign="left"
              clear
              labelNumber={5}
              value={this.state.amount}
              onChange={v => {
                this.setState({ amount: v });
                console.log('onChange', v);
              }}
              onBlur={v => {
                this.setState({ amount: v });
                console.log('onBlur', v);
              }}
              moneyKeyboardWrapProps={{
                onTouchStart: e => e.preventDefault()
              }}
              extra="    "
            >
              Amount
            </InputItem>
          </List>

          <List style={{ display: this.state.step === 2 ? '' : 'none' }}>
            <List.Item thumb={Name}>
              Name
              <List.Item.Brief>{this.state.name}</List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={
                <EthIcon
                  // Address to draw
                  address={this.state.address}
                  // scale * 8 pixel image size
                  scale={32}
                  // <img> props
                  style={{
                    width: '22px',
                    height: '22px',
                    background: 'white'
                  }}
                />
              }
            >
              Address
              <List.Item.Brief style={{ fontSize: '12px' }}>
                {this.state.address}
              </List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={EuroIco}
              extra={
                <Badge
                  text={
                    this.state.balance / 10 ** 18 + ' ' + this.state.currency
                  }
                  style={this.styleBadge}
                />
              }
            >
              Balance
            </List.Item>

            <List.Item
              thumb={EuroIco}
              extra={
                <Badge
                  text={this.state.amount + ' ' + this.state.currency}
                  style={this.styleBadge}
                />
              }
            >
              Amount
            </List.Item>
          </List>
        </div>
        <Pagination
          mode="pointer"
          total={3}
          current={this.state.step + 1}
          style={{ marginBottom: '16px' }}
        />

        <WingBlank>
          <Flex justify="between">
            <Button
              type="default"
              inline
              size="small"
              style={{ width: '130px' }}
              onClick={this.last}
              disabled={this.state.step === 0}
            >
              <Icon type="left" size="small" />
            </Button>

            <Button
              type="primary"
              inline
              size="small"
              onClick={this.next}
              style={{
                width: '130px',
                display: this.state.step !== 2 ? '' : 'none'
              }}
              disabled={
                this.context.drizzle.web3.utils.isAddress(
                  this.state.address
                ) === false
              }
            >
              <Icon type="right" size="small" />
            </Button>

            <Button
              type="primary"
              inline
              size="small"
              onClick={this.send}
              style={{
                width: '130px',
                display: this.state.step === 2 ? '' : 'none'
              }}
            >
              Send
            </Button>
          </Flex>
        </WingBlank>

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
    accounts: state.accounts,
    accountBalances: state.accountBalances
  };
};

Send = drizzleConnect(createForm()(Send), mapStateToProps);

export { Send };
