import { DISABLE_INTRO, SHOW_INTRO, SKIP_INTRO } from '../actions/intro';

export const initialState = {
  disabled: false,
  skipped: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_INTRO:
      return Object.assign({}, state, { disabled: true, skipped: true });
    case SKIP_INTRO:
      return Object.assign({}, state, { skipped: true });
    case SHOW_INTRO:
      return Object.assign({}, state, { skipped: false });
    default:
      return state;
  }
};

export const isIntroDisabled = state => state.app.intro.disabled;
export const isIntroSkipped = state => state.app.intro.skipped;
