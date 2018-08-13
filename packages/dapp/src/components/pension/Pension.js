import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Sticky, StickyContainer } from 'react-sticky';
import { ActivityIndicator, Tabs } from 'antd-mobile';
import moment from 'moment';
import PropTypes from 'prop-types';
import { InsuredInfo } from './InsuredInfo';
import { PensionStatistics } from './PensionStatistics';
import { PensionSimulation } from './PensionSimulaton';
import { PensionerHeader } from './PensionerHeader';
import { InsuredHeader } from './InsuredHeader';
import { PensionPlan } from './PensionPlan';
import { getCurrentAccount } from '../../reducers/account';
import { getPensionData } from '../../reducers/pension';
import { loadPension, payIntoPension } from '../../actions/pension';
import { getWalletData } from '../../reducers/wallet';
import { showLoadingAnimation } from '../../actions/loading';

const mapStateToProps = state => {
  return {
    account: state.accounts[0],
    userAccount: getCurrentAccount(state),
    pensionData: getPensionData(state),
    walletData: getWalletData(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPension: ethAccount => dispatch(loadPension(ethAccount)),
    payIntoPension: (ethAccount, year, month, amount) =>
      dispatch(payIntoPension(ethAccount, year, month, amount)),
    showLoadingAnimation: () => dispatch(showLoadingAnimation())
  };
};

class Pension extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
    userAccount: PropTypes.object.isRequired,
    pensionData: PropTypes.object,
    loadPension: PropTypes.func.isRequired,
    payIntoPension: PropTypes.func.isRequired,
    walletData: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.props.loadPension(this.props.account);
  }

  getInitialPageIndex() {
    return this.props.pensionData.isPensioner ? 1 : 0;
  }

  pay = (year, month, amount) => {
    this.props.payIntoPension(this.props.account, year, month, amount);
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
    if (!this.props.pensionData || !this.props.walletData) {
      return <ActivityIndicator toast text="loading pension" />;
    }

    const lastMonth = moment().add(-1, 'month');

    return (
      <Fragment>
        {this.props.pensionData.isPensioner ? (
          <PensionerHeader
            showLoadingAnimation={this.props.showLoadingAnimation}
          />
        ) : (
          <InsuredHeader
            pensionAmountByPercent={
              this.props.pensionData.pensionAmountByPercent
            }
            pensionPoints={this.props.pensionData.totalPoints}
            salary={this.props.userAccount.salary}
            paymentOfLastMonth={
              this.props.pensionData.paymentsByYear[lastMonth.year()][
                lastMonth.month()
              ]
            }
            onPay={this.pay}
            walletData={this.props.walletData}
          />
        )}

        <StickyContainer>
          <Tabs
            tabs={[
              { id: 'insured', title: 'Insured' },
              { id: 'payments', title: 'Payments' },
              { id: 'simulation', title: 'Simulation' },
              { id: 'statistics', title: 'Statistics' }
            ]}
            initialPage={this.getInitialPageIndex()}
            renderTabBar={this.renderTabBar}
            onChange={tab => {
              this.setState({ currentTabId: tab.id });
            }}
          >
            <div>
              <InsuredInfo />
            </div>
            <div>
              <PensionPlan
                pensionData={this.props.pensionData}
                walletData={this.props.walletData}
                onPay={this.pay}
              />
            </div>
            <div>
              <PensionSimulation
                pensionData={this.props.pensionData}
                userAccount={this.props.userAccount}
              />
            </div>
            <div>
              <PensionStatistics />
            </div>
          </Tabs>
        </StickyContainer>
      </Fragment>
    );
  }
}

Pension = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pension);

export { Pension };
