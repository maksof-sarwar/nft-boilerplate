import CONFIG from './libs/shared/config'
const { API_URL, PRIVATE_KEY, ETHERSCAN_APIKEY } = CONFIG.contract;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
export default {
  solidity: '0.8.7',
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      // url: API_URL,
      accounts: [PRIVATE_KEY],
      gas: 95000000000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_APIKEY,
  },
};