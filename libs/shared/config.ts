import * as path from 'path';
export enum NFTTYPE {
	'IMAGE', 'VIDEO'
};
const CONFIG = {
	nftType: NFTTYPE.IMAGE,
	noOfEdition: 5,
	LAYERSDIR: path.join(process.cwd(), 'libs', 'shared', `LAYERS`),
	BUILD: path.join(process.cwd(), 'libs', 'shared', `BUILD`),
	OUTPUTNFT: path.join(process.cwd(), 'libs', 'shared', `OUTPUTNFT`),
	OUTPUTSINGLEMETADATA: path.join(process.cwd(), 'libs', 'shared', `OUTPUTSINGLEMETADATA`),
	tempDataFolder: path.join(process.cwd(), 'libs', 'shared', `tempData`),
	LayerToJsonFileName: `Input Layer.json`,
	metDataFileName: 'MY SAMPLE.json',
	metDataStatsticsFileName: 'MY SAMPLEStats.json',
	projectName: `MY SAMPLE`,
	tokenPrefix: `MY SAMPLE #`,
	tokenExt: `gif`,
	nftDescription: `MY SAMPLE SMAPLE NFTS`,
	LAYERORDERS: [
		{ name: 'BACKGROUND' },
		{ name: 'BACKS' },
		{ name: 'BEAK' },
		{ name: 'CLASSIC SHADES' },
		{ name: 'COLLAR' },
		{ name: 'DOLLAR SIGN' },
		{ name: 'EYES' },
		{ name: 'HATS' },
		{ name: 'MAIN BODY' },
		{ name: 'PLAIN SHADES' },
	],


	contract: {
		API_URL: '',
		PRIVATE_KEY:
			'0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e',
		PUBLIC_KEY: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
		CONTRACT_ADDRESS: '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f',
		ETHERSCAN_LINK:
			'',
		ETHERSCAN_APIKEY: ``,
		WALLET_SIGNIN_MESSAGE: `Welcome to minting dapps`
	}
};
export default CONFIG;
