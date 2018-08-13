export const LOADING_WALLET_BALANCE = '@@app/LOADING_WALLET_BALANCE';

export function loadingWalletBalance(ethAccount, cacheIds) {
  return { type: LOADING_WALLET_BALANCE, ethAccount, cacheIds };
}
