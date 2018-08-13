export function loadState() {
  try {
    const serlializedState = localStorage.getItem('state');
    if (serlializedState === null) {
      return undefined;
    }
    return JSON.parse(serlializedState);
  } catch (err) {
    console.error('loadState', err);
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('saveState', err);
  }
}
