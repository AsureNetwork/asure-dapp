import React from 'react';
import {
  ActivityIndicator,
  Card,
  Icon,
  InputItem,
  List,
  Popover,
  Tabs
} from 'antd-mobile';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';
import EthIcon from '../extensions/EthIcon';
import { createForm } from 'rc-form';
import { getCurrentAccount } from '../../reducers/account';

class Receive extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.contracts = context.drizzle.contracts;

    this.state = {
      animating: false,
      name: this.props.account.fullName,
      currency: 'ETH',
      currencyPopoverVisible: false,
      value: 0.0,
      url: ''
    };
  }
  componentDidMount() {
    this.updateReciverUrl();
  }
  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
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
      <span style={{ marginRight: 5 }}>ASR Asure Token</span>{' '}
    </Popover.Item>
  ];

  updateReciverUrl = () => {
    //ethereum:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359?value=2.014e18 ETH
    //ethereum:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359?value=2.014e18 ETH
    //ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/transfer?address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=1
    //https://github.com/ethereum/EIPs/blob/master/EIPS/eip-681.md
    let url = 'ethereum:' + this.props.accounts[0];
    if (this.state.currency === 'EUR') {
      url += '/transfer?address=' + this.contracts.PensionEuroToken.address;
      url += '&value=' + this.state.value * 10 ** 18 + '&uint256=1';
    } else if (this.state.currency === 'ETH') {
      url += '?value=' + this.state.value * 10 ** 18 + '';
    }
    this.setState({ url: url });
  };

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
          setTimeout(() => this.updateReciverUrl(), 1);
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

  /*EIP 681
  request                 = "ethereum" ":" [ "pay-" ]target_address [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
  target_address          = ethereum_address
  chain_id                = 1*DIGIT
  function_name           = STRING
  ethereum_address        = ( "0x" 40*40HEXDIG ) / ENS_NAME
  parameters              = parameter *( "&" parameter )
  parameter               = key "=" value
  key                     = "value" / "gas" / "gasLimit" / "gasPrice" / TYPE
  value                   = number / ethereum_address / STRING
  number                  = [ "-" / "+" ] *DIGIT [ "." 1*DIGIT ] [ ( "e" / "E" ) [ 1*DIGIT ] [ "+" UNIT ]

  receiver 0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7
  my 0x8e23ee67d1332ad560396262c48ffbb01f93d052
  ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/transfer?address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=1
  */
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Tabs
          tabs={[{ title: 'Payment' }, { title: 'Address' }]}
          initalPage={0}
        >
          <div>
            <div>
              <List>
                <div className="center padding15">
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={this.state.url}
                  />
                </div>
                {/*<List.Item >
                    {this.state.url}
                </List.Item>
                */}
                <List.Item
                  thumb={
                    <EthIcon
                      // Address to draw
                      address={this.props.accounts[0]}
                      // scale * 8 pixel image size
                      scale={16}
                      // <img> props
                      style={{
                        width: '22px',
                        height: '22px',
                        background: 'white'
                      }}
                    />
                  }
                  extra={''}
                  onClick={() => {}}
                >
                  <h6>{this.props.accounts[0]}</h6>
                </List.Item>

                <InputItem
                  {...getFieldProps('inputname')}
                  placeholder="Unknown"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e });
                  }}
                  labelNumber={5}
                  extra={
                    <Icon
                      type="cross-circle"
                      size="xs"
                      onClick={() => {
                        this.setState({ name: 'Unknown' });
                        this.setState({ account: '0x' });
                      }}
                    />
                  }
                >
                  <div>Name</div>
                </InputItem>

                <InputItem
                  type="money"
                  placeholder="amount"
                  moneyKeyboardAlign="left"
                  clear
                  onChange={v => {
                    console.log('onChange', v);
                  }}
                  onBlur={v => {
                    this.setState({ value: v });
                    setTimeout(() => this.updateReciverUrl(), 1);
                    console.log('onBlur', v);
                  }}
                  style={{ touchAction: 'manipulation' }}
                  moneyKeyboardWrapProps={{
                    onTouchStart: e => e.preventDefault()
                  }}
                  extra={this.currencySelector()}
                >
                  Value
                </InputItem>
              </List>
            </div>
          </div>
          <div>
            <div>
              <List>
                <div className="center padding15">
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={this.props.accounts[0]}
                  />
                </div>
                <List.Item
                  thumb={
                    <EthIcon
                      // Address to draw
                      address={this.props.accounts[0]}
                      // scale * 8 pixel image size
                      scale={16}
                      // <img> props
                      style={{
                        width: '22px',
                        height: '22px',
                        background: 'white'
                      }}
                    />
                  }
                  onClick={() => {}}
                >
                  <h6>{this.props.accounts[0]}</h6>
                </List.Item>
              </List>
            </div>
          </div>
        </Tabs>

        <Card full style={{ minHeight: '30px', height: '30px' }}>
          <Card.Footer
            content="&copy; 2018 ASURE"
            style={{ paddingTop: '10px' }}
            extra={<div>www.asure.io</div>}
          />
        </Card>
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
    account: getCurrentAccount(state),
    contracts: state.contracts
  };
};

Receive = drizzleConnect(createForm()(Receive), mapStateToProps);

export { Receive };
