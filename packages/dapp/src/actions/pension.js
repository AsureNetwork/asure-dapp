export const LOAD_PENSION = '@@app/LOAD_PENSION';
export const LOADING_PENSION = '@@app/LOADING_PENSION';
export const PAY_INTO_PENSION = '@@app/PAY_INTO_PENSION';

export function loadPension(ethAccount) {
  return { type: LOAD_PENSION, ethAccount };
}

export function loadingPension(ethAccount, cacheIds) {
  return { type: LOADING_PENSION, ethAccount, cacheIds };
}

export function payIntoPension(ethAccount, year, month, amount) {
  return { type: PAY_INTO_PENSION, ethAccount, year, month, amount };
}
