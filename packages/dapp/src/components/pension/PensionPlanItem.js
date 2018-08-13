import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Modal, Toast } from 'antd-mobile';
import moment from 'moment';
import { ScoreboardIco } from '../../thumbs';
import {
  formatEurAsWei,
  formatWeiAsEur,
  formatWeiAsEurString
} from '../../utils/formatEur';

class PensionPlanItem extends PureComponent {
  static propTypes = {
    year: PropTypes.string,
    month: PropTypes.number,
    paymentsByYear: PropTypes.array,
    walletData: PropTypes.object.isRequired,
    onPay: PropTypes.func
  };

  openPaymentModal = () => {
    const availableEurAmount = formatWeiAsEur(
      this.props.walletData.balances.PensionEuroToken
    );
    const availableEurAmountString = formatWeiAsEurString(
      this.props.walletData.balances.PensionEuroToken
    );

    if (availableEurAmount <= 0) {
      Toast.info('Insufficient funds. Please deposit EUR first.', 3);
      return;
    }

    return Modal.prompt(
      `Pay rate for ${moment()
        .year(this.props.year)
        .month(this.props.month)
        .format('MMM YYYY')}`,
      `Max. ${availableEurAmountString}€ available`,
      [
        { text: 'Cancel' },
        {
          text: 'Pay',
          onPress: amount => {
            const amountAsNumber = parseInt(amount);

            if (!/^\d+(\.\d{0,2})?$/.test(amount) || isNaN(amountAsNumber)) {
              Toast.info('Invalid amount.', 1);
              return Promise.reject();
            }
            if (amountAsNumber > availableEurAmount) {
              Toast.info('Insufficient funds.', 1);
              return Promise.reject();
            }

            return this.props.onPay(
              this.props.year,
              this.props.month,
              formatEurAsWei(amount)
            );
          }
        }
      ],
      'default'
    );
  };

  render() {
    return (
      <List.Item
        thumb={ScoreboardIco}
        arrow="horizontal"
        onClick={this.openPaymentModal}
      >
        {moment(String(this.props.month + 1), 'MM').format('MMMM')}
        <List.Item.Brief>
          {this.props.paymentsByYear[this.props.month].toFixed(2)}€
        </List.Item.Brief>
      </List.Item>
    );
  }
}

export { PensionPlanItem };
