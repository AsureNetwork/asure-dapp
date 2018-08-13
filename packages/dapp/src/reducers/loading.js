import {
  HIDE_LOADING_ANIMATION,
  SHOW_LOADING_ANIMATION,
  UPDATE_LOADING_ANIMATION
} from '../actions/loading';

export const initialState = {
  visible: false,
  percentage: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_ANIMATION:
      return Object.assign({}, state, {
        visible: true
      });
    case UPDATE_LOADING_ANIMATION:
      return Object.assign({}, state, {
        percentage: action.percentage
      });
    case HIDE_LOADING_ANIMATION:
      return Object.assign({}, state, {
        visible: false
      });
    default:
      return state;
  }
};

export const getLoadingPercentage = state => state.app.loading.percentage;
export const isLoading = state => state.app.loading.visible;
