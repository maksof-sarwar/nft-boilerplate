import CONFIG from '@nft/data/config';
import { IMetadata } from '@nft/data/_interface/IMetadata';
import * as fs from 'fs';
import * as path from 'path';

export const removeExistingFolederNFT = () => {
	if (fs.existsSync(CONFIG.OUTPUTNFT)) {
		fs.rmSync(CONFIG.OUTPUTNFT, { recursive: true, force: true });
	}
	fs.mkdirSync(CONFIG.OUTPUTNFT);
};
export const removeExistingTempFolderNFT = () => {
	if (fs.existsSync(CONFIG.tempDataFolder)) {
		fs.rmSync(CONFIG.tempDataFolder, { recursive: true, force: true });
	}
	fs.mkdirSync(CONFIG.tempDataFolder);
};
export const removeExistingMetadataFolderNFT = () => {
	if (fs.existsSync(CONFIG.OUTPUTSINGLEMETADATA)) {
		return;
	}
	fs.mkdirSync(CONFIG.OUTPUTSINGLEMETADATA);
};

export const outputDirRead = () => fs.readdirSync(CONFIG.OUTPUTNFT);

export function createMetaDataFile(name: string, metaData: IMetadata) {
	fs.writeFileSync(
		path.join(CONFIG.OUTPUTSINGLEMETADATA, name),
		JSON.stringify(metaData, null, 2)
	);
}

export function removeFileInDir(dir, editionName) {
	fs.readdir(dir, (err, files) => {
		files = files.filter((f) => f.indexOf(editionName) != -1);
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(dir, file), (err) => {
				if (err) throw err;
			});
		}
	});
}