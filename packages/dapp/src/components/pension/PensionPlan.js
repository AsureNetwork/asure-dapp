import React, { Component } from 'react';
import { Accordion, Badge, List } from 'antd-mobile';
import PropTypes from 'prop-types';
import { Checked, Empty } from '../../thumbs';
import { Constants } from '../Constants';
import { PensionPlanItem } from './PensionPlanItem';

class PensionPlan extends Component {
  static propTypes = {
    pensionData: PropTypes.object.isRequired,
    walletData: PropTypes.object.isRequired,
    onPay: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      key: 'key_' + new Date().getFullYear()
    };
  }

  static getStyle(points) {
    if (points <= 0.1) {
      return Constants.styleBadgeRed;
    } else if (points <= 0.8) {
      return Constants.styleBadgeYellow;
    } else {
      return Constants.styleBadgeGreen;
    }
  }

  getPanelItems() {
    return Object.keys(this.props.pensionData.pointsByYear).map(year => {
      const pointByYear = this.props.pensionData.pointsByYear[year];

      return (
        <Accordion.Panel
          key={year}
          header={
            <span>
              <div className="am-list-thumb">
                <img
                  src={pointByYear !== 0 ? Checked : Empty}
                  alt="Pension point"
                />
              </div>
              Plan for {year}
              <Badge
                text={pointByYear !== 0 ? pointByYear : ''}
                style={PensionPlan.getStyle(pointByYear)}
              />
            </span>
          }
        >
          <List className="month-list">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => (
              <PensionPlanItem
                key={month}
                year={year}
                month={month}
                paymentsByYear={this.props.pensionData.paymentsByYear[year]}
                walletData={this.props.walletData}
                onPay={this.props.onPay}
              />
            ))}
          </List>
        </Accordion.Panel>
      );
    });
  }

  render() {
    return (
      <Accordion
        accordion
        openAnimation={{}}
        className="my-accordion"
        onChange={key => this.setState({ key: key })}
      >
        {this.getPanelItems()}
      </Accordion>
    );
  }
}

export { PensionPlan };
