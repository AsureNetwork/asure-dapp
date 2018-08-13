export const SHOW_LOADING_ANIMATION = '@@app/SHOW_LOADING_ANIMATION';
export const UPDATE_LOADING_ANIMATION = '@@app/UPDATE_LOADING_ANIMATION';
export const HIDE_LOADING_ANIMATION = '@@app/HIDE_LOADING_ANIMATION';

export function showLoadingAnimation(duration = 15) {
  return { type: SHOW_LOADING_ANIMATION, duration };
}

export function updateLoadingAnimation(percentage) {
  return { type: UPDATE_LOADING_ANIMATION, percentage };
}

export function hideLoadingAnimation() {
  return { type: HIDE_LOADING_ANIMATION };
}
