import { checkDataFailed, checkDataRequest, checkDataSuccess } from './data.slice';
import { readEth } from '../../utils/ethereum';
import store from '../store';

export const fetchData = () => {
	return async (dispatch) => {
		try {
			const smartContract = store.getState().blockChain.smartContract;
			console.log(smartContract);
			if (smartContract) {
				dispatch(checkDataRequest());
				let totalSupply = (await smartContract.totalSupply()).toNumber();
				let maxSupply = (await smartContract.maxSupply()).toNumber();
				let cost = readEth(await smartContract.cost());
				let symbol = await smartContract.symbol();
				let name = await smartContract.name();
				let currentPhase = await smartContract.currentPhase();
				let paused = await smartContract.paused();

				dispatch(
					checkDataSuccess({
						totalSupply,
						maxSupply,
						name,
						currentPhase,
						symbol,
						cost,
						paused
					})
				);
			}
		} catch (err) {
			dispatch(checkDataFailed('Could not load data from contract.'));
		}
	};
};
