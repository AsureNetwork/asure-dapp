import React, { Component } from 'react';
import { Pensioner } from '../../thumbs';
import { Button, Result, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import web3 from 'web3';

class PensionerHeader extends Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.contracts = context.drizzle.contracts;

    this.amountOfCacheId = this.contracts.PensionWallet.methods.amountOf.cacheCall(
      this.props.account
    );
  }

  getAmountOf = () => {
    const contractMethodCache = this.props.contracts.PensionWallet.amountOf;

    if (contractMethodCache[this.amountOfCacheId]) {
      let ether = web3.utils.fromWei(
        contractMethodCache[this.amountOfCacheId].value,
        'ether'
      );
      let result=Number(ether);
      return result.toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,');

    }

    return '';
  };

  onPayout = async () => {
    try {
      Toast.success(
        'Your changes will be persisted to the blockchain now. This can take a several seconds ...',
        3
      );
      this.props.startLongstandingOperation();
      await this.contracts.PensionWallet.methods
        .withdraw(this.props.account)
        .send({ from: this.props.account, gas: 3000000 });
    } catch (error) {
      console.error('onPayout', error);
    } finally {
      this.props.completeLongstandingOperation();
    }
  };

  render() {
    return (
      <Result
        className="result-pic-large"
        img={<img src={Pensioner} alt="pensioner" />}
        title={'Overview'}
        message={
          <span>
            <Button type="primary" inline size="small" onClick={this.onPayout}>
              Payout {this.getAmountOf()} EUR
            </Button>
          </span>
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts,
    account: state.accounts[0]
  };
};

PensionerHeader = drizzleConnect(PensionerHeader, mapStateToProps);

export { PensionerHeader };
