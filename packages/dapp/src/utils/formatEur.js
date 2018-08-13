import web3 from 'web3';

export function formatWeiAsEur(amountInWei) {
  return Number(Math.floor(amountInWei / 10 ** 18).toFixed(2));
}

export function formatWeiAsEurString(amountInWei) {
  return Math.floor(amountInWei / 10 ** 18)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function formatEurAsWei(amountInEur) {
  return web3.utils.toWei(amountInEur, 'ether');
}
