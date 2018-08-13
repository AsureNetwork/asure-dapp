import React, { Fragment } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import { Badge, Button, List, Modal, Result, Tabs } from 'antd-mobile';
import { Receive } from '../../thumbs';
import { Constants } from '../Constants';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import web3 from 'web3';
import moment from 'moment';
import { Footer } from '../Footer';
import EthIcon from '../extensions/EthIcon';
import { getCurrentAccount } from '../../reducers/account';

class History extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      address: this.props.accounts[0], //'0x8a950257cec01575931E37e9DB54Ef610E92837c',
      apiKey: '25AAZ4RZRM98BMUNX92P8SW4UHPSW5N8VQ',
      network: 'rinkeby', //rinkeby or empty for default
      txList: [],
      txListInternal: [],
      tokenTx: [],
      selectedItem: {},
      showModal: false
    };
  }

  componentDidMount() {
    let network = this.state.network ? 'api-' + this.state.network : 'api';
    let txListUrl = `https://${network}.etherscan.io/api?module=account&action=txlist&address=${
      this.state.address
    }&startblock=0&endblock=99999999&sort=asc&apikey=${this.state.apiKey}`;

    let tokenTxInternalUrl = `https://${network}.etherscan.io/api?module=account&action=txlistinternal&address=${
      this.state.address
    }&startblock=0&endblock=999999999&sort=asc&apikey=${this.state.apiKey}`;

    let tokenTxUrl = `https://${network}.etherscan.io/api?module=account&action=tokentx&address=${
      this.state.address
    }&startblock=0&endblock=999999999&sort=asc&apikey=${this.state.apiKey}`;

    fetch(txListUrl)
      .then(res => res.json())
      .then(
        result => {
          let txList = result.result.reverse();
          console.log(txList);
          this.setState({
            txListIsLoaded: true,
            txList: txList
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            txListIsLoaded: true,
            error
          });
        }
      );

    fetch(tokenTxInternalUrl)
      .then(res => res.json())
      .then(
        result => {
          let txListInternal = result.result.reverse();
          console.log(txListInternal);
          this.setState({
            txListInternalIsLoaded: true,
            txListInternal: txListInternal
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            txListInternalIsLoaded: true,
            error
          });
        }
      );

    fetch(tokenTxUrl)
      .then(res => res.json())
      .then(
        result => {
          let tokenTx = result.result.reverse();
          console.log(tokenTx);
          this.setState({
            tokenTxIsLoaded: true,
            tokenTx: tokenTx
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            tokenTxIsLoaded: true,
            error
          });
        }
      );
  }

  getCurrency(item) {
    if (item.contractAddress) {
      if (item.tokenSymbol && item.tokenSymbol !== '') {
        return item.tokenSymbol;
      } else {
        return 'ERC20';
      }
    } else {
      return 'ETH';
    }
  }

  getItems(list) {
    let result = [];
    list.forEach(item => {
      result.push(
        <List.Item
          key={item.hash}
          thumb={Receive}
          extra={
            <Badge
              text={
                <span>
                  {web3.utils.fromWei(item.value, 'ether')}{' '}
                  {this.getCurrency(item)}
                </span>
              }
              style={
                this.state.address.toLowerCase() === item.to.toLowerCase()
                  ? Constants.styleBadgeGreen
                  : Constants.styleBadgeYellow
              }
            />
          }
          onClick={e => {
            this.setState({ selectedItem: item });
            this.showModal('showModal', e);
          }}
        >
          Transaction:
          <List.Item.Brief>
            {moment.unix(item.timeStamp).fromNow()}
          </List.Item.Brief>
        </List.Item>
      );

      // TODO: remove me soon. Only here to demonstrate sticky tabs
      result.push(
        <List.Item
          key={item.hash + 1}
          thumb={Receive}
          extra={
            <Badge
              text={<span>{web3.utils.fromWei(item.value, 'ether')} ETH</span>}
              style={
                this.state.address.toLowerCase() === item.to.toLowerCase()
                  ? Constants.styleBadgeGreen
                  : Constants.styleBadgeYellow
              }
            />
          }
          onClick={e => {
            this.setState({ selectedItem: item });
            this.showModal('showModal', e);
          }}
        >
          Transaction:
          <List.Item.Brief>
            {moment.unix(item.timeStamp).fromNow()}
          </List.Item.Brief>
        </List.Item>
      );
    });
    return result;
  }

  showModal = (key, e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true
    });
  };

  onClose = key => {
    this.setState({
      [key]: false
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

  render() {
    return (
      <Fragment>
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
          title="History"
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

        <StickyContainer>
          <Tabs
            tabs={[
              { title: <Badge text={this.state.txList.length}>Public</Badge> },
              {
                title: (
                  <Badge text={this.state.txListInternal.length}>Token</Badge>
                )
              },
              { title: <Badge text={this.state.tokenTx.length}>ERC20</Badge> }
            ]}
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
              <List>{this.getItems(this.state.txList)}</List>
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List>{this.getItems(this.state.txListInternal)}</List>
            </div>
            <div style={{ height: 'auto', backgroundColor: '#fff' }}>
              <List>{this.getItems(this.state.tokenTx)}</List>
            </div>
          </Tabs>
        </StickyContainer>
        <Footer />
        <Modal
          popup
          visible={this.state.showModal}
          onClose={() => this.onClose('showModal')}
          animationType="slide-down"
        >
          <List
            style={{ height: '-webkit-fill-available' }}
            renderHeader={<div>Transaction</div>}
          >
            {Object.keys(this.state.selectedItem).map((i, index) => (
              <List.Item key={index} style={{ height: '48px' }}>
                {i}
                <List.Item.Brief>
                  <h6 style={{ margin: '0px' }}>
                    {this.state.selectedItem[i]}
                  </h6>
                </List.Item.Brief>
              </List.Item>
            ))}
            <List.Item>
              <Button
                type="primary"
                size="small"
                onClick={() => this.onClose('showModal')}
              >
                Close
              </Button>
            </List.Item>
          </List>
        </Modal>
      </Fragment>
    );
  }
}

History = drizzleConnect(withRouter(History), function mapStateToProps(state) {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts,
    account: getCurrentAccount(state),
    contracts: state.contracts
  };
});

export { History };
