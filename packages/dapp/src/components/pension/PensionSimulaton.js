import React from 'react';
import { Card, List, Modal, Picker, Toast, WhiteSpace } from 'antd-mobile';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Calendar, Notes } from '../../thumbs';
import { PensionFormula } from './PensionFormula';
import { withRouter } from 'react-router';
import moment from 'moment';
import { formatEurAsWei } from '../../utils/formatEur';
import { getCurrentAccount } from '../../reducers/account';

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
      salary: 2500,
      futureSalary: 2500,
      expectedPension: 1600,
      actualPensionPoints: this.props.pensionData.totalPoints,
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

  calculateFuturePensionPoints = () => {
    let accessYear = this.getAccessYear();
    let yearlyPensionPoints = 1;
    let calculatedPensionPoints =
      (accessYear - 2018) * yearlyPensionPoints +
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
    const futureSalary = this.state.futureSalary;
    const zf = this.state.zf;
    const raf = this.state.raf;

    this.calculatePensionCacheId = this.contracts.Pension.methods.calculatePension.cacheCall(
      accessYear,
      actualYear,
      actualPensionPoints * 10 ** 3,
      formatEurAsWei((futureSalary * 12).toString()),
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
      'Your salary',
      '',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: amount => {
            const amountAsNumber = parseInt(amount);

            if (!/^\d+(\.\d{0,2})?$/.test(amount) || isNaN(amountAsNumber)) {
              Toast.info('Invalid salary.', 1);
              return Promise.reject();
            }

            let result = this.setState({ futureSalary: amountAsNumber });

            setTimeout(() => {
              this.calculateInSmartContract();
            }, 1);
            return result;
          }
        }
      ],
      'default',
      '2500'
    );
  };

  render() {
    return (
      <div>
        <List className="my-list">
          <List.Item
            thumb={Notes}
            extra={<span>{this.state.futureSalary.toString()} EUR</span>}
            arrow="horizontal"
            onClick={this.openModal}
          >
            Salary
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
