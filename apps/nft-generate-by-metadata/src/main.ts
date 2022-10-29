import { removeExistingFolederNFT, removeExistingMetadataFolderNFT, removeExistingTempFolderNFT } from "./app/function";
import './app/script'
import { startScript } from "./app/script";
const start = async () => {
	try {
    removeExistingFolederNFT();
    removeExistingTempFolderNFT();
    removeExistingMetadataFolderNFT();
		startScript()
	} catch (error) {
		console.log(error);
	}
};
start();


