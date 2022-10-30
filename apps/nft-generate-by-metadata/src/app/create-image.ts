import CONFIG, { NFTTYPE } from "@nft/libs/shared/config";
import * as path from 'path';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { generateImageCmd, generateVideoCmd } from '@nft/apps/nft-generate-by-metadata/src/app/ffmpeg.script';
ffmpeg.setFfmpegPath(ffmpegPath.path);
export async function generateImage(metaData) {
	return new Promise(async (resolve, reject) => {
		try {

			let { edition, attributes } = metaData;
			edition = edition.toString().padStart(2, '0');
			const attributesPath = attributes.map((attribute) =>
				path.join(CONFIG.LAYERSDIR, attribute['trait_type'], attribute['value'])
			);
			const videoResp: string = CONFIG.nftType == NFTTYPE.IMAGE ?
				await generateImageCmd(attributesPath, edition) :
				await generateVideoCmd(attributesPath, edition);
			const outputPath = path.join(CONFIG.OUTPUTNFT, videoResp.split('\\').pop());
			await moveTempoutputToOutput(videoResp, outputPath);
			resolve(path.basename(outputPath).replace(/\.[^/.]+$/, ""));
		} catch (error) {
			reject(error);
		}
	});
}


function moveTempoutputToOutput(tempOutputPath, output) {
	return new Promise((resolve, reject) => {
		fs.rename(tempOutputPath, output, function (err) {
			if (err) reject(err);
			resolve(`Successfully created ${output}`);
		});
	});
}



