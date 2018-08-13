import React, { Component } from 'react';
import { List, Picker, WhiteSpace } from 'antd-mobile';
import { ContractData } from 'drizzle-react-components';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Calendar, CompassIco, Notes } from '../../thumbs';
import { Constants } from '../Constants';
import { withRouter } from 'react-router';
import { getPension } from '../../reducers/pension';
import { getCurrentAccount } from '../../reducers/account';
import { showLoadingAnimation } from '../../actions/loading';

class InsuredInfo extends Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  // list of ages from 80 years to 40 year for the pension access picker
  years = [
    Array.from(Array(41).keys()).map(n => ({
      label: String(80 - n),
      value: String(80 - n)
    }))
  ];

  state = {
    isPensionDateUpdating: false
  };

  constructor(props, context) {
    super(props, context);
    this.contracts = context.drizzle.contracts;

    this.pensionDateCacheId = this.contracts.PensionUsers.methods.getUserPensionDate.cacheCall(
      this.props.account
    );
    this.birthDateCacheId = this.contracts.PensionUsers.methods.getUserBirthDate.cacheCall(
      this.props.account
    );
  }

  styleBadge = {
    marginLeft: 12,
    padding: '0 3px',
    backgroundColor: '#1193d4'
    // borderRadius: 2
  };

  getBirthDate = () => {
    const contractMethodCache = this.props.contracts.PensionUsers
      .getUserBirthDate;

    if (contractMethodCache[this.birthDateCacheId]) {
      return new Date(contractMethodCache[this.birthDateCacheId].value * 1000);
    }
  };

  getPensionDate = () => {
    const contractMethodCache = this.props.contracts.PensionUsers
      .getUserPensionDate;

    if (contractMethodCache[this.pensionDateCacheId]) {
      return new Date(
        contractMethodCache[this.pensionDateCacheId].value * 1000
      );
    }
  };

  getPensionAccess = () => {
    const pensionDate = this.getPensionDate();
    const birthDate = this.getBirthDate();

    if (pensionDate && birthDate) {
      return [String(pensionDate.getFullYear() - birthDate.getFullYear())];
    }
  };

  onUpdateAge = async opt => {
    const birthDate = this.getBirthDate();

    const pensionDate = new Date(birthDate.getTime());
    pensionDate.setFullYear(birthDate.getFullYear() + Number(opt));

    this.props.showLoadingAnimation();
    this.setState({ isPensionDateUpdating: true });
    await this.contracts.PensionUsers.methods
      .setUserPensionDate(this.props.account, pensionDate.valueOf() / 1000)
      .send()
      .finally(() => {
        this.setState({ isPensionDateUpdating: false });
      });
  };

  render() {
    return (
      <div>
        <List>
          <List.Item arrow="horizontal" thumb={CompassIco} extra={'Active'}>
            Status
          </List.Item>
          <Picker
            data={this.years}
            title="Retired At"
            okText="Ok"
            dismissText="Cancel"
            cascade={false}
            value={this.getPensionAccess()}
            onChange={v => this.onUpdateAge(v[0])}
            disabled={this.state.isPensionDateUpdating}
          >
            <List.Item
              arrow="horizontal"
              thumb={Calendar}
              extra={this.getPensionAccess()}
            >
              Retired At
            </List.Item>
          </Picker>
          <List.Item
            arrow="horizontal"
            thumb={Notes}
            extra={this.props.userAccount.salary + ' EUR'}
          >
            Salary
            <List.Item.Brief>monthly</List.Item.Brief>
          </List.Item>
          <List.Item
            thumb={Notes}
            extra={
              (this.props.userAccount.salary *
                this.props.product.pensionAmountByPercent) /
                100 +
              ' EUR'
            }
          >
            Pension rate
            <List.Item.Brief>
              monthly / {this.props.product.pensionAmountByPercent}%
            </List.Item.Brief>
          </List.Item>
          <List.Item thumb={Notes} extra={'1200 EUR'}>
            Pension (inflation adjusted)
            <List.Item.Brief>monthly</List.Item.Brief>
          </List.Item>
          <List.Item thumb={Notes} extra={'600 EUR'}>
            Pension gap
            <List.Item.Brief>monthly</List.Item.Brief>
          </List.Item>
          <List.Item className="justify" multipleLine wrap>
            <strong>Description</strong>
            <WhiteSpace />
            The pension gap results from your last monthly income and the
            expected pension (inflation-adjusted figures). The calculation is
            based on the sum of pension points of 30.5 points and a pension
            value forecast of € 37.9.
            <List.Item.Brief>{Constants.WEBSITE}</List.Item.Brief>
          </List.Item>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts,
    account: state.accounts[0],
    product: getPension(state),
    userAccount: getCurrentAccount(state)
  };
};

const mapStateToDispatch = dispatch => {
  return {
    showLoadingAnimation: () => dispatch(showLoadingAnimation())
  };
};

InsuredInfo = drizzleConnect(
  withRouter(InsuredInfo),
  mapStateToProps,
  mapStateToDispatch
);

export { InsuredInfo };
