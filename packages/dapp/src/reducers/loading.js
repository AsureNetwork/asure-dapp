import {
  COMPLETE_LONGSTANDING_OPERATION,
  RESET_LONGSTANDING_OPERATIONS,
  SET_PROGRESS_VISIBILITY,
  START_LONGSTANDING_OPERATION,
  UPDATE_PROGRESS
} from '../actions/loading';

export const initialState = {
  operationsTotal: 0,
  operationsCompleted: 0,
  visible: false,
  status: 0,
  percentage: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LONGSTANDING_OPERATION:
      return Object.assign({}, state, {
        operationsTotal: state.operationsTotal + 1
      });
    case COMPLETE_LONGSTANDING_OPERATION:
      return Object.assign({}, state, {
        operationsCompleted: state.operationsCompleted + 1
      });
    case RESET_LONGSTANDING_OPERATIONS:
      return Object.assign({}, state, {
        operationsTotal: 0,
        operationsCompleted: 0
      });
    case SET_PROGRESS_VISIBILITY:
      return Object.assign({}, state, {
        visible: action.isVisible
      });
    case UPDATE_PROGRESS:
      return Object.assign({}, state, {
        status: action.status,
        percentage: action.status * 100
      });
    default:
      return state;
  }
};

export const getLoading = state => state.app.loading;
export const getLoadingInfo = state => ({
  visible: state.app.loading.visible,
  percentage: state.app.loading.percentage
});
