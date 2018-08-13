import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Result, Toast, WhiteSpace } from 'antd-mobile';
import { Manager } from '../../thumbs';
import moment from 'moment';
import { formatWeiAsEur } from '../../utils/formatEur';

class InsuredHeader extends PureComponent {
  static propTypes = {
    pensionAmountByPercent: PropTypes.number,
    pensionPoints: PropTypes.string,
    salary: PropTypes.number,
    paymentOfLastMonth: PropTypes.number,
    onPay: PropTypes.func,
    walletData: PropTypes.object
  };

  lastMonth = moment().add(-1, 'month');

  isLastMonthPayed = () => {
    const pensionRate = this.getPensionRate();

    return this.props.paymentOfLastMonth >= pensionRate;
  };

  getPensionRate = () => {
    return (this.props.salary * this.props.pensionAmountByPercent) / 100;
  };

  getMissingPensionRate = () => {
    return this.getPensionRate() - this.props.paymentOfLastMonth;
  };

  render() {
    return (
      <Result
        className="lg"
        img={<img src={Manager} alt="manager" />}
        title={
          <span>
            {'Your Points: ' + this.props.pensionPoints}/{<sub>40</sub>}
          </span>
        }
        message={
          <span>
            {this.isLastMonthPayed() ? (
              <h4>
                You already payed {this.props.paymentOfLastMonth}€ for{' '}
                {this.lastMonth.format('MMMM')}!
              </h4>
            ) : (
              <Button
                type="primary"
                inline
                size="small"
                onClick={() => {
                  const availableEurAmount = formatWeiAsEur(
                    this.props.walletData.balances.PensionEuroToken
                  );

                  if (availableEurAmount <= 0) {
                    Toast.info(
                      'Insufficient funds. Please deposit EUR first.',
                      3
                    );
                    return;
                  }

                  this.props.onPay(
                    this.lastMonth.year(),
                    this.lastMonth.month(),
                    this.getMissingPensionRate() * 10 ** 18
                  );
                }}
              >
                Pay {this.lastMonth.format('MMMM')}{' '}
                {this.getMissingPensionRate().toFixed(2)} €
              </Button>
            )}
            <WhiteSpace />
          </span>
        }
      />
    );
  }
}

export { InsuredHeader };
