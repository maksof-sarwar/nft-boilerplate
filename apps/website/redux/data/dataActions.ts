import { checkDataFailed, checkDataRequest, checkDataSuccess } from './data.slice';
import { readEth } from '../../utils/ethereum';
import store from '../store';
import { ethers } from 'ethers';

export const fetchData = () => {
	return async (dispatch) => {
		try {
			const { smartContract } = store.getState().blockChain.data;
			if (smartContract) {
				dispatch(checkDataRequest());
				const conractData: Map<string, any> = new Map();
				conractData.set('name', await smartContract.name());
				conractData.set('cost', readEth(await smartContract.cost()));
				conractData.set('paused', await smartContract.paused());
				conractData.set('totalSupply', (await smartContract.totalSupply()).toNumber());
				conractData.set('maxSupply', (await smartContract.maxSupply()).toNumber());
				dispatch(
					checkDataSuccess({ data: Object.fromEntries(conractData) })
				);
			}
		} catch (err) {
			dispatch(checkDataFailed('Could not load data from contract.'));
		}
	};
};
