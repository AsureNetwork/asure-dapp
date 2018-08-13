import { LOGIN, LOGOUT } from '../actions/actions';
import moment from 'moment';
import { TeamFraetz, TeamGschmuck, TeamMlurz, TeamPmizel } from '../thumbs';

export const initialState = {
  account: null,
  testAccounts: [
    {
      fullName: 'Paul Mizel',
      username: 'pmizel@asure.io',
      img: TeamPmizel,
      password: 'asdf',
      mnemonic:
        'caught curious electric scrub exotic afford blanket floor fit husband sight census',
      address: '0xD34dF93618B8b33Ab4A871d45C7D0aA0c9Db9b34',
      salary: 2500,
      birthDate: moment('1980-08-01').valueOf()
    },
    {
      fullName: 'Fabian Raetz',
      username: 'fraetz@asure.io',
      img: TeamFraetz,
      password: 'asdf',
      mnemonic:
        'bamboo oblige trick cotton shoe rocket galaxy possible mule easily clinic clever',
      address: '0x79461C71BfE8D7b3bF826Dea15D7494A6af1bE81',
      salary: 2500,
      birthDate: moment('1989-03-29').valueOf()
    },
    {
      fullName: 'Gamal Schmuck',
      username: 'gschmuck@asure.io',
      img: TeamGschmuck,
      password: 'asdf',
      mnemonic:
        'bamboo oblige trick cotton rocket shoe galaxy possible mule easily clinic clever',
      address: '0xd09E4938517A3cDEa80696B9a5Ebbc90Ca12c895',
      salary: 2500,
      birthDate: moment('1994-06-30').valueOf()
    },
    {
      fullName: 'Michael Lurz',
      username: 'mlurz@asure.io',
      img: TeamMlurz,
      password: 'asdf',
      mnemonic:
        'galaxy bamboo oblige trick cotton shoe rocket possible mule easily clinic clever',
      address: '0xb65bd15f91499ae7bf0baf82d18043bd011d1a68',
      salary: 2500,
      birthDate: moment('1950, 04, 01').valueOf()
    }
  ],
  pensionAccess: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const account = state.testAccounts.find(
        a => a.username === action.username
      );
      if (!account) {
        console.error(
          'test account not found. logging in with real accounts is not supported yet'
        );
        return state;
      }

      return Object.assign({}, state, {
        account: account
      });
    case LOGOUT:
      return Object.assign({}, state, {
        account: null
      });
    default:
      return state;
  }
};

export const getCurrentAccount = state => state.app.account.account;
export const getTestAccounts = state => state.app.account.testAccounts;
