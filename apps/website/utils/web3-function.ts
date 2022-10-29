import Web3Modal from 'web3modal';
import { providerOptions } from './web3-provider-config';

export async function web3Provider() {
	return new Promise(async (resolve, reject) => {
		try {
			const web3Modal = new Web3Modal({
				network: 'mainnet',
				theme: 'dark',
				cacheProvider: true,
				providerOptions,
			});
			web3Modal.cachedProvider && web3Modal.clearCachedProvider();
			const provider = await web3Modal.connect();
			resolve(provider);
		} catch (error) {
			reject(error);
		}
	});
}
