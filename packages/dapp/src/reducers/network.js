import { SWITCH_ETHEREUM_NETWORK } from '../actions/actions';

const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY || '';
const network = [
  {
    id: 'localhost',
    title: 'localhost',
    urls: {
      http: 'http://127.0.0.1:8545',
      ws: 'ws://127.0.0.1:8545'
    }
  },
  {
    id: 'rinkeby',
    title: 'Rinkeby Testnet',
    urls: {
      http: `https://rinkeby.infura.io/${infuraApiKey}`,
      ws: 'wss://rinkeby.infura.io/ws'
    }
  }
  // { id: 'ropsten', title: 'Ropsten Testnet', url: 'wss://ropsten.infura.io/ws' }
];

const defaultEthereumNetworkId =
  process.env.NODE_ENV === 'development' ? 'localhost' : 'rinkeby';

export const initialState = {
  current: network.find(network => network.id === defaultEthereumNetworkId),
  networks: network
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_ETHEREUM_NETWORK:
      return Object.assign({}, state, {
        current: state.networks.find(
          network => network.id === action.ethereumNetworkId
        )
      });
    default:
      return state;
  }
};

export const getProtocol = () => process.env.REACT_APP_PROVIDER_PROTOCOL;
export const getEthereumNetworks = state => state.app.network.networks;
export const getCurrentEthereumNetwork = state => state.app.network.current;
