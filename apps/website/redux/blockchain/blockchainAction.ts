import { ethers, providers } from 'ethers';
import { readEth } from '../../utils/ethereum';
import { fetchData } from '../data/dataActions';
import CONTRACT_ABI from '../../../../artifacts/contracts/contract-sample.sol/CONTRACTSAMPLE.json';
import config from '@armorsclub/data/config';

import { connectionFailed, connectionRequest, connectionSuccess, updateAccountRequest } from '@armorsclub/apps/website/redux/blockchain/blockChain.slice';
import { web3Provider } from '../../utils/web3-function';
import Web3 from 'Web3'

export const detectAccount = () => {
	return async (dispatch) => {
		const { ethereum } = window as any;

		if (ethereum) {
			ethereum.on('chainChanged', () => {
				window.location.reload();
			});
			ethereum.on('accountsChanged', (accounts) => {
				if (!accounts.length) window.location.reload();
				dispatch(updateAccount(accounts[0]));
			});
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			dispatch(
				connectionSuccess({
					account: accounts[0] || null,
					balance: accounts[0]
						? readEth(
							await ethereum.request({
								method: 'eth_getBalance',
								params: [accounts[0], 'latest'],
							})
						)
						: null,
					smartContract: nftContract(),
				})
			);
		} else {
			dispatch(connectionFailed('Install Metamask.'));
		}
	};
};
export const connect = () => {
	return async (dispatch) => {
		dispatch(connectionRequest());
		try {
			new Web3(await web3Provider() as any);
			dispatch(detectAccount());
		} catch (err) {
			console.log(err);
			dispatch(connectionFailed(err.message));
		}
	};
};

export const nftContract = () => {
	const provider = new ethers.providers.Web3Provider(window['ethereum']);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(config.contract.CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
	return contract;
};
export const updateAccount = (account) => {
	return async (dispatch) => {
		dispatch(updateAccountRequest({ account: account }));
		dispatch(fetchData());
	};
};
