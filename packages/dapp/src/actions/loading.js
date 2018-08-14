export const START_LONGSTANDING_OPERATION =
  '@@app/START_LONGSTANDING_OPERATION';
export const COMPLETE_LONGSTANDING_OPERATION =
  '@@app/COMPLETE_LONGSTANDING_OPERATION';
export const RESET_LONGSTANDING_OPERATIONS =
  '@@app/RESET_LONGSTANDING_OPERATIONS';
export const UPDATE_PROGRESS = '@@app/UPDATE_PROGRESS';
export const INCREMENT_PROGRESS = '@@app/INCREMENT_PROGRESS';
export const SET_PROGRESS_VISIBILITY = '@@app/SET_PROGRESS_VISIBILITY';

export function startLongstandingOperation() {
  return { type: START_LONGSTANDING_OPERATION };
}

export function completeLongstandingOperation() {
  return { type: COMPLETE_LONGSTANDING_OPERATION };
}

export function resetLongstandingOperations() {
  return { type: RESET_LONGSTANDING_OPERATIONS };
}

export function updateProgress(status) {
  return { type: UPDATE_PROGRESS, status };
}

export function incrementProgress() {
  return { type: INCREMENT_PROGRESS };
}

export function setProgressVisibility(isVisible) {
  return { type: SET_PROGRESS_VISIBILITY, isVisible };
}
