import { ethers } from 'ethers';
const WEI_PER_ETH = Math.pow(10, 18);
export const weiToEth = (wei) => {
	return wei / WEI_PER_ETH;
};
export const readableEthValue = (wei) => {
	return Math.round(weiToEth(wei) * 10000) / 10000;
};

export const parseEth = (value) => {
	return ethers.utils.parseEther(value + '');
};

export const readEth = (ethValue): number => {
	return Number(ethers.utils.formatEther(ethValue));
};

export const truncate = (input, len = 5) =>
	`${input.slice(0, 5)}...${input.slice(-4)}`;

export const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text).then(() => {
		// alert('Copied to clipboard');
	});
};
