import { ethers, Signer, providers } from 'ethers';
import { readEth } from '../../utils/ethereum';
import { fetchData } from '../data/dataActions';
import CONTRACT_ABI from '../../../../artifacts/contracts/contract-sample.sol/CONTRACTSAMPLE.json';
import config from '@armorsclub/data/config';

import { connectionFailed, connectionRequest, connectionSuccess, resetState, updateAccountRequest, updateSignerToken } from '../blockchain/blockChain.slice';
import { web3Provider } from '../../utils/web3-function';
import { ModalProps } from 'antd';

var PROVIDER: providers.Web3Provider | null = null
export const detectAccount = (modal) => {
	return async (dispatch) => {
		try {
			const { ethereum } = window as any;
			if (ethereum) {
				PROVIDER = new ethers.providers.Web3Provider(ethereum)
				const signer = PROVIDER.getSigner();
				const account = await signer.getAddress();
				walletEvents(ethereum, dispatch, signer)

				dispatch(
					connectionSuccess({
						account,
						balance: account
							? readEth(await signer.getBalance())
							: 0,
						smartContract: nftContract(signer),
					})
				);
			} else {
				dispatch(connectionFailed('Install Metamask.'));
			}
		} catch (err) {
		}
	};
};
export const connect = (modal) => {
	return async (dispatch) => {
		dispatch(connectionRequest());
		try {
			await web3Provider();
			dispatch(detectAccount(modal));

		} catch (err) {
			console.log(err);
			dispatch(connectionFailed(err.message));
		}
	};
};

export const nftContract = (signer) => new ethers.Contract(config.contract.CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

export const updateAccount = ({ account, balance }) => {
	return async (dispatch) => {
		dispatch(updateAccountRequest({ account, balance }));
		dispatch(fetchData());
	};
};


const walletEvents = (ethereum, dispatch, signer: Signer) => {
	ethereum.on('chainChanged', () => {
		dispatch(updateSignerToken({ signerToken: null }))
		window.location.reload()
	});
	ethereum.on('accountsChanged', async (accounts) => {
		if (!accounts.length) {
			dispatch(updateSignerToken({ signerToken: null }))
			dispatch(resetState())
			return;
		}
		dispatch(updateAccount({ account: accounts[0], balance: readEth(await signer.getBalance()) }));
	});
}

export const signInToWallet = (modal) => {
	return (dispatch) => {
		if (PROVIDER) {
			const signer = PROVIDER.getSigner();
			if (!localStorage.getItem('signer-token')) {
				console.log('object');
				modal.info({
					title: 'Sign In to App!',
					okText: 'Sign In',
					onOk: async () => {
						const signerToken = await signer.signMessage(config.contract.WALLET_SIGNIN_MESSAGE)
						dispatch(updateSignerToken({ signerToken }))

					}
				})

			}

		}
	}
}