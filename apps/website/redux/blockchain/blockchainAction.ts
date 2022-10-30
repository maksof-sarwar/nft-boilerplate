import { ethers, Signer, providers } from 'ethers';
import { readEth } from '../../utils/ethereum';
import { fetchData } from '../data/dataActions';
import CONTRACT_ABI from '../../../../artifacts/contracts/contract-sample.sol/CONTRACTSAMPLE.json';
import config from '@nft/libs/shared/config';
import { connectionFailed, connectionRequest, connectionSuccess, resetState } from '../blockchain/blockChain.slice';
import { web3Provider } from '../../utils/web3-function';
import storageService from '@nft/libs/services/storage.service';
import { SHARED } from '../../data/_enum';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';
var PROVIDER: providers.Web3Provider | null = null;

export const detectAccount = () => {
	return async (dispatch) => {
		try {
			const { ethereum } = window as any;
			if (ethereum) {
				PROVIDER = new ethers.providers.Web3Provider(ethereum);
				const signer = PROVIDER.getSigner();
				const account = await signer.getAddress();
				walletEvents(ethereum, dispatch, signer);

				dispatch(
					connectionSuccess({
						data: {
							account,
							balance: account
								? readEth(await signer.getBalance())
								: 0,
							smartContract: nftContract(signer),
						}
					})
				);
			} else {
				dispatch(connectionFailed('Install Metamask.'));
			}
		} catch (err) {
			dispatch(connectionFailed(err.message));
		}
	};
};
export const connect = () => {
	return async (dispatch) => {
		dispatch(connectionRequest());
		try {
			await web3Provider();
			dispatch(detectAccount());

		} catch (err) {
			dispatch(connectionFailed(err.message));
		}
	};
};

export const nftContract = (signer) => new ethers.Contract(config.contract.CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

export const updateAccount = ({ account, balance }) => {
	return async (dispatch) => {
		dispatch(connectionSuccess({
			data: {
				account,
				balance,
			}
		}));
		dispatch(fetchData());
	};
};


const walletEvents = (ethereum, dispatch, signer: Signer) => {
	ethereum.on('chainChanged', () => {
		dispatch(connectionSuccess({
			data: {
				"signer-token": null
			}
		}));
		window.location.reload();
	});
	ethereum.on('accountsChanged', async (accounts) => {
		if (!accounts.length) {
			dispatch(resetState());
			return;
		}
		dispatch(updateAccount({ account: accounts[0], balance: readEth(await signer.getBalance()) }));
	});
};

export const signInToWallet = (modal: Omit<ModalStaticFunctions, 'warn'>) => {
	return (dispatch) => {
		if (PROVIDER) {
			const signer = PROVIDER.getSigner();
			if (!storageService.getItemFromStorage(SHARED.signerToken)) {
				modal.info({
					title: 'Sign In to App!',
					okText: 'Sign In',
					bodyStyle: {
						alignContent: "center"
					},
					maskClosable: true,
					onOk: async () => {
						try {
							const signerToken = await signer.signMessage(config.contract.WALLET_SIGNIN_MESSAGE);
							dispatch(connectionSuccess({
								data: {
									"signer-token": signerToken
								}
							}));

						} catch (err) {
							dispatch(connectionFailed(err.reason || err.message));
						}
					}
				});
			}
		}
	};
};