import { call, getContext, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_PENSION,
  loadingPension,
  PAY_INTO_PENSION
} from '../actions/pension';
import moment from 'moment';
import web3 from 'web3';
import {
  completeLongstandingOperation,
  startLongstandingOperation
} from '../actions/loading';
import { Toast } from 'antd-mobile';

export function* watchLoadPension() {
  yield takeEvery(LOAD_PENSION, fetchPension);
}

export function* watchPayIntoPension() {
  yield takeEvery(PAY_INTO_PENSION, payIntoPension);
}

export function* fetchPension(action) {
  const drizzle = yield getContext('drizzle');
  const PensionUsers = drizzle.contracts.PensionUsers;
  const PensionPoints = drizzle.contracts.PensionPoints;

  const cacheIds = {
    pensionDate: yield call(
      PensionUsers.methods.getUserPensionDate.cacheCall,
      action.ethAccount
    ),
    totalPoints: yield call(
      PensionPoints.methods.pointsOf.cacheCall,
      action.ethAccount
    ),
    pointsByYear: {},
    paymentsByYear: {}
  };

  let startYear = moment()
    .subtract(2, 'years')
    .year();
  for (let year = startYear; year <= startYear + 4; year++) {
    cacheIds.pointsByYear[year] = yield call(
      PensionPoints.methods.getPointsByYear.cacheCall,
      action.ethAccount,
      year
    );

    cacheIds.paymentsByYear[year] = yield call(
      PensionPoints.methods.getPaymentsByYear.cacheCall,
      action.ethAccount,
      year
    );
  }

  yield put(loadingPension(action.ethAccount, cacheIds));
}

export function* payIntoPension(action) {
  const drizzle = yield getContext('drizzle');
  const PensionWallet = drizzle.contracts.PensionWallet;
  const PensionEuroToken = drizzle.contracts.PensionEuroToken;

  const amountHex = web3.utils.numberToHex(action.amount);

  const pensionWalletAddress = PensionWallet.address;

  let balanceResult;
  try {
    yield put(startLongstandingOperation());

    balanceResult = yield call(
      PensionEuroToken.methods.balanceOf(action.ethAccount).call
    );

    console.log(
      `onPay: current user (${
        action.ethAccount
      }) has balance of ${balanceResult} (hex: ${web3.utils.numberToHex(
        balanceResult
      )})`
    );
  } catch (error) {
    console.error('pay', error);
  }

  if (web3.utils.toBN(balanceResult).lt(web3.utils.toBN(action.amount))) {
    console.error(
      `onPay: current user (${action.ethAccount}) does not have enough funds`
    );
  } else {
    try {
      yield call(
        Toast.success,
        'Your changes will be persisted to the blockchain now. This can take a several seconds ...',
        3
      );

      console.log(
        `onPay: appproving PensionWallet (${pensionWalletAddress}) to spend ${
          action.amount
        } (hex: ${amountHex})of current user (${action.ethAccount})`
      );

      const approveResult = yield call(
        PensionEuroToken.methods.approve(pensionWalletAddress, amountHex).send
      );
      console.log('pay: approved', approveResult);

      const allowanceResult = yield call(
        PensionEuroToken.methods.allowance(
          action.ethAccount,
          pensionWalletAddress
        ).call
      );
      console.log(
        `onPay: PensionWallet is allowed to spend ${allowanceResult} (hex: ${web3.utils.numberToHex(
          allowanceResult
        )})`
      );

      console.log(
        `onPay: depositing ${
          action.amount
        } (hex: ${amountHex}) for current user (${action.ethAccount})`
      );
      const depositResult = yield call(
        PensionWallet.methods.deposit(
          action.ethAccount,
          action.year,
          action.month,
          amountHex
        ).send,
        { gas: 900000 }
      );
      console.log('pay: deposited', depositResult);

      const allowanceResult2 = yield call(
        PensionEuroToken.methods.allowance(
          action.ethAccount,
          pensionWalletAddress
        ).call
      );
      console.log(
        `onPay: PensionWallet is allowed to spend ${allowanceResult2} (hex: ${web3.utils.numberToHex(
          allowanceResult2
        )})`
      );
    } catch (error) {
      console.error('pay', error);
    } finally {
      yield put(completeLongstandingOperation());
    }
  }
}
