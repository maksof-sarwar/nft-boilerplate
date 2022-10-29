import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Authereum from "authereum";
export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Coin Base Wallet",
      infuraId: `af4d715497604bc1a502fc5994573b52`,
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: `af4d715497604bc1a502fc5994573b52`,
    },
  },
  authereum: {
    package: Authereum,
  },
};