import { LOADING_PENSION } from '../actions/pension';
import moment from 'moment';

export const initialState = {
  pensionAmountByPercent: 18.6,
  cacheIds: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PENSION:
      return Object.assign({}, state, { cacheIds: action.cacheIds });
    default:
      return state;
  }
};

export const getPension = state => {
  return state.app.products.pension;
};

const isPensionLoaded = state => {
  const cacheIds = getPension(state).cacheIds;
  if (!cacheIds) {
    return false;
  }

  const PensionUsers = state.contracts.PensionUsers;
  const PensionPoints = state.contracts.PensionPoints;

  const getUserPensionDate =
    PensionUsers.getUserPensionDate[cacheIds.pensionDate];
  const pointsOf = PensionPoints.pointsOf[cacheIds.totalPoints];
  const getPointsByYear = Object.keys(cacheIds.pointsByYear).every(
    year => PensionPoints.getPointsByYear[cacheIds.pointsByYear[year]]
  );
  const getPaymentsByYear = Object.keys(cacheIds.paymentsByYear).every(
    year => PensionPoints.getPaymentsByYear[cacheIds.paymentsByYear[year]]
  );

  return pointsOf && getUserPensionDate && getPointsByYear && getPaymentsByYear;
};

const getPensionDate = state => {
  const cacheIds = getPension(state).cacheIds;
  if (!cacheIds) {
    return;
  }

  const PensionUsers = state.contracts.PensionUsers;
  if (PensionUsers.getUserPensionDate[cacheIds.pensionDate]) {
    return moment(
      PensionUsers.getUserPensionDate[cacheIds.pensionDate].value * 1000
    ).toISOString();
  }
};

const isPensioner = state => {
  const pensionDate = getPensionDate(state);
  if (!pensionDate) {
    return;
  }

  return moment(pensionDate).isSameOrBefore(moment(), 'day');
};

const getTotalPoints = state => {
  const cacheIds = getPension(state).cacheIds;
  if (!cacheIds) {
    return;
  }

  const PensionPoints = state.contracts.PensionPoints;
  if (PensionPoints.pointsOf[cacheIds.totalPoints]) {
    return (PensionPoints.pointsOf[cacheIds.totalPoints].value / 1000).toFixed(
      1
    );
  }
};

const getPointsByYear = state => {
  const cacheIds = getPension(state).cacheIds;
  if (!cacheIds) {
    return;
  }

  const PensionPoints = state.contracts.PensionPoints;

  return Object.keys(cacheIds.pointsByYear).reduce((result, year) => {
    if (PensionPoints.getPointsByYear[cacheIds.pointsByYear[year]]) {
      result[year] = (
        PensionPoints.getPointsByYear[cacheIds.pointsByYear[year]].value / 1000
      ).toFixed(2);
    } else {
      result[year] = null;
    }
    return result;
  }, {});
};

const getPaymentsByYear = state => {
  const cacheIds = getPension(state).cacheIds;
  if (!cacheIds) {
    return;
  }

  const PensionPoints = state.contracts.PensionPoints;
  return Object.keys(cacheIds.paymentsByYear).reduce((result, year) => {
    if (PensionPoints.getPaymentsByYear[cacheIds.paymentsByYear[year]]) {
      const yearData =
        PensionPoints.getPaymentsByYear[cacheIds.paymentsByYear[year]].value;
      result[year] = yearData.map(data => Number((data / 10 ** 18).toFixed(2)));
    } else {
      result[year] = null;
    }
    return result;
  }, {});
};

export const getPensionData = state => {
  if (isPensionLoaded(state)) {
    return {
      pensionAmountByPercent: getPension(state).pensionAmountByPercent,
      pensionDate: getPensionDate(state),
      isPensioner: isPensioner(state),
      totalPoints: getTotalPoints(state),
      paymentsByYear: getPaymentsByYear(state),
      pointsByYear: getPointsByYear(state)
    };
  }
};
