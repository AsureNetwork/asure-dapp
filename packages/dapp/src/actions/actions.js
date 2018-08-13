export const LOGIN = '@@app/LOGIN';
export const LOGOUT = '@@app/LOGOUT';
export const SWITCH_ETHEREUM_NETWORK = '@@app/LOGOUT';

export function login(username, password) {
  return { type: LOGIN, username: username, password: password };
}

export function logout() {
  return { type: LOGOUT };
}

export function switchEthereumNetwork(ethereumNetworkId) {
  return { type: SWITCH_ETHEREUM_NETWORK, ethereumNetworkId };
}
