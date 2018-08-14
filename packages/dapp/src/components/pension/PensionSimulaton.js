import React from 'react';
import { Card, List, Modal, Picker, Toast, WhiteSpace } from 'antd-mobile';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Calendar, Notes } from '../../thumbs';
import { PensionFormula } from './PensionFormula';
import { withRouter } from 'react-router';
import moment from 'moment';
import { formatEurAsWei, formatWeiAsEur } from '../../utils/formatEur';

class PensionSimulation extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  static propTypes = {
    pensionData: PropTypes.object.isRequired,
    userAccount: PropTypes.object.isRequired
  };

  years = [
    Array.from(Array(41).keys()).map(n => ({
      label: String(80 - n),
      value: String(80 - n)
    }))
  ];

  constructor(props, context) {
    super(props, context);

    this.contracts = context.drizzle.contracts;

    this.state = {};

    let userAge =
      moment().year() - moment(this.props.userAccount.birthDate).year();

    //https://www.einfach-rente.de/rentenformel-rentenanspruch-entgeltpunkte
    this.state = {
      birthdate: new Date(1980, 1, 1),
      accessAgeDate: new Date(2047, 1, 1),
      accessAge: 67,
      accessAgeDefault: '67',
      age: userAge,
      zfyears: 0,
      year: String(67),
      income: this.props.userAccount.salary,
      futureIncome: this.props.userAccount.salary,
      averageYearlyIncome: 30000,
      expectedPension: 1600,
      actualPensionPoints: this.props.pensionData.totalPoints,
      maxPensionPointsPerYear: 2,
      zf: 1.0,
      raf: 1.0,
      arw: 29.0
    };

    this.contracts.PensionUsers.methods
      .getUserBirthDate(this.props.account)
      .call({ from: this.props.account })
      .then((data, result) => {
        let birthdate = new Date(data * 1000);
        this.setState({ birthdate: birthdate });
        let diff_ms = Date.now() - birthdate.getTime();
        let age_dt = new Date(diff_ms);
        let age = Math.abs(age_dt.getUTCFullYear() - 1970);
        this.setState({ age: age });
      });

    this.contracts.PensionUsers.methods
      .getUserPensionDate(this.props.account)
      .call({ from: this.props.account })
      .then(data => {
        this.setState({ accessAgeDate: new Date(data * 1000) });
      });

    this.contracts.PensionSettings.methods
      .getAverageIncomeByYear(moment().year())
      .call({ from: this.props.account })
      .then((data, result) => {
        let averageYearlyIncome = formatWeiAsEur(data);
        this.setState({ averageYearlyIncome: averageYearlyIncome });
        console.log('averageYearlyIncome: ' + averageYearlyIncome);
      });

    this.contracts.PensionSettings.methods
      .getMaxPensionPointsByYear(moment().year())
      .call({ from: this.props.account })
      .then((data, result) => {
        let maxPensionPointsPerYear = data / 10 ** 3;
        this.setState({ maxPensionPointsPerYear: maxPensionPointsPerYear });
        console.log('maxPensionPointsPerYear: ' + maxPensionPointsPerYear);
      });
  }

  componentDidMount() {
    this.calculateInSmartContract();
  }

  onUpdateAccessAge = opt => {
    console.log('New access age: ' + opt);
    this.setState({ accessAge: Number(opt) });
    setTimeout(() => {
      this.calculateInSmartContract();
    }, 1);
  };

  onUpdateIncome = opt => {
    console.log('New income: ' + opt);
    this.setState({ futureIncome: opt });
    setTimeout(() => {
      this.calculateInSmartContract();
    }, 1);
  };

  getPensionAccess = () => {
    return [String(this.state.accessAge)];
  };

  styleBadge = {
    marginLeft: 12,
    padding: '0 3px',
    backgroundColor: '#1193d4',
    borderRadius: 2
  };

  getAccessYear = () => {
    let workYears = this.state.accessAge - this.state.age;
    if (workYears < 0) workYears = 0;

    let accessYear = moment().year() + workYears;
    console.log('Access year: ' + accessYear);
    return accessYear;
  };

  getYearlyPensionPoints = () => {
    let result =
      (this.state.futureIncome * 12) / this.state.averageYearlyIncome;
    if (result > this.state.maxPensionPointsPerYear)
      result = this.state.maxPensionPointsPerYear;
    return result;
  };

  calculateFuturePensionPoints = () => {
    let accessYear = this.getAccessYear();
    let actualYear = moment().year();

    let yearlyPensionPoints = this.getYearlyPensionPoints();

    let calculatedPensionPoints =
      (accessYear - actualYear) * yearlyPensionPoints +
      parseFloat(this.state.actualPensionPoints);
    this.setState({ futureEp: calculatedPensionPoints });
  };

  calculateInSmartContract = () => {
    let workYears = this.state.accessAge - this.state.age;
    if (workYears < 0) workYears = 0;

    let actualYear = moment().year();
    let accessYear = actualYear + workYears;

    this.calculateFuturePensionPoints();

    const actualPensionPoints = this.props.pensionData.totalPoints;
    const futureIncome = this.state.futureIncome;
    const zf = this.state.zf;
    const raf = this.state.raf;

    this.calculatePensionCacheId = this.contracts.Pension.methods.calculatePension.cacheCall(
      accessYear,
      actualYear,
      actualPensionPoints * 10 ** 3,
      formatEurAsWei((futureIncome * 12).toString()),
      zf * 10 ** 2,
      raf * 10 ** 2
    );
  };

  getCalculatedPensionInEur = () => {
    const contractMethodCache = this.props.contracts.Pension.calculatePension;

    if (contractMethodCache[this.calculatePensionCacheId]) {
      return contractMethodCache[this.calculatePensionCacheId].value / 10 ** 25;
    }
  };

  openModal = () => {
    Modal.prompt(
      'Your monthly income',
      '',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: amount => {
            const amountAsNumber = parseInt(amount, 10);

            if (!/^\d+(\.\d{0,2})?$/.test(amount) || isNaN(amountAsNumber)) {
              Toast.info('Invalid income.', 1);
              return Promise.reject();
            }

            return this.onUpdateIncome(amountAsNumber);
          }
        }
      ],
      'default',
      this.state.futureIncome
    );
  };

  render() {
    return (
      <div>
        <List className="my-list">
          <List.Item
            thumb={Notes}
            extra={<span>{this.state.futureIncome.toString()} EUR</span>}
            arrow="horizontal"
            onClick={this.openModal}
          >
            Income
            <List.Item.Brief>
              <WhiteSpace />
            </List.Item.Brief>
          </List.Item>
          <Picker
            data={this.years}
            title="Retired At"
            okText="Ok"
            dismissText="Cancel"
            cascade={false}
            value={this.getPensionAccess()}
            onChange={v => this.onUpdateAccessAge(v[0])}
            onOk={() => this.calculateInSmartContract()}
          >
            <List.Item
              arrow="horizontal"
              thumb={Calendar}
              extra={this.getPensionAccess()}
            >
              Retired At
            </List.Item>
          </Picker>
        </List>

        <Card>
          <Card.Header title="Current Pension" />
          <Card.Body>
            <PensionFormula
              ep={this.state.futureEp || 0}
              zf={this.state.zf || 0}
              arw={this.state.arw || 0}
              raf={this.state.raf || 0}
              expectedPension={this.getCalculatedPensionInEur()}
            />

            <span
              style={{
                textAlign: 'center',
                display: 'block',
                fontSize: '12px'
              }}
            >
              Retired at {this.state.accessAge} on{' '}
              {this.state.accessAgeDate.toLocaleDateString()}
            </span>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.accounts[0],
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts
  };
};

PensionSimulation = drizzleConnect(
  withRouter(PensionSimulation),
  mapStateToProps
);

export { PensionSimulation };
