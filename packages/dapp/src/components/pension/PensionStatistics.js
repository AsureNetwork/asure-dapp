import React from 'react';
import { Accordion } from 'antd-mobile';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import * as web3 from 'web3';

//const {RadialBarChart, RadialBar, Legend} = Recharts;
/*
*  <ul>
                      <li>Number of pensioners</li>
                      <li>Number of insureds</li>
                      <li>Monthly pay-ins</li>
                      <li>Monthly pay-outs</li>
                      <li>Reserves</li>
                      <li>Actual value of the system</li>
</ul>
*
* */
const data = [
  { name: '18-24', uv: 31.4, pv: 2400, fill: '#8884d8' },
  { name: '25-29', uv: 26.6, pv: 4567, fill: '#83a6ed' },
  { name: '30-34', uv: 15.6, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.2, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', uv: 8.6, pv: 3908, fill: '#a4de6c' },
  { name: '65+', uv: 2.6, pv: 4800, fill: '#d0ed57' }
];

export class SimpleRadialBarChart extends React.Component {
  render() {
    return (
      <RadialBarChart
        width={410}
        height={300}
        cx={150}
        cy={150}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={data}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#444' }}
          background
          clockWise={true}
          dataKey="uv"
        />
      </RadialBarChart>
    );
  }
}

class PensionStatistics extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.contracts = context.drizzle.contracts;

    this.stateCacheId = this.contracts.PensionUsers.methods.getStats.cacheCall();
    this.totalAmountCacheId = this.contracts.PensionWallet.methods.totalAmount.cacheCall();
  }

  getStats = () => {
    const contractMethodCache = this.props.contracts.PensionUsers.getStats;
    if (contractMethodCache[this.stateCacheId]) {
      return contractMethodCache[this.stateCacheId].value;
    } else {
      return [0, 0];
    }
  };

  getTotalAmount = () => {
    const contractMethodCache = this.props.contracts.PensionWallet.totalAmount;
    if (contractMethodCache[this.totalAmountCacheId]) {
      let resultValue = contractMethodCache[this.totalAmountCacheId].value;
      return web3.utils.fromWei(resultValue, 'ether');
    } else {
      return 0;
    }
  };

  renderBarChart = () => {
    let result = this.getStats();
    //console.log(result);
    var participants = result[0] - result[1];
    const data = [
      { name: 'Overview', participants: participants, pensioners: result[1] }
    ];
    return (
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pensioners" stackId="a" fill="#0092d6" />
            <Bar dataKey="participants" stackId="a" fill="#7cc6b7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  renderAmount = () => {
    let result = this.getTotalAmount();
    console.log(result);

    const data = [{ name: 'Amount in EUR', amount: result }];
    return (
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" stackId="a" fill="#0092d6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Accordion
          accordion
          defaultActiveKey="0"
          openAnimation={{}}
          className="my-accordion"
          onChange={this.onChange}
        >
          <Accordion.Panel header="Participants">
            {this.renderBarChart()}
          </Accordion.Panel>
          <Accordion.Panel header="Total Amount">
            {this.renderAmount()}
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts,
    accounts: state.accounts
  };
};

PensionStatistics = drizzleConnect(PensionStatistics, mapStateToProps);

export { PensionStatistics };
