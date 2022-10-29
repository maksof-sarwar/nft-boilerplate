import CONFIG from "@armorsclub/data/config";
import * as path from 'path'
import * as fs from 'fs'
import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.availableFormats((err, format) => {
	console.log(format)
})
export async function generateVideo(metaData) {
	return new Promise(async (resolve, reject) => {
		try {

			let { edition, attributes } = metaData;
			edition = edition.toString().padStart(2, '0');
			const attributesPath = attributes.map((attribute) =>
				path.join(CONFIG.LAYERSDIR, attribute['trait_type'], attribute['value'])
			);
			// const videoResp = await generateVideoCmd(attributesPath, edition);
			// console.log("videoResp",videoResp)
			// const finalResp = await combineWithAudio(
			// 	videoResp,
			// 	path.join(
			// 		CONFIG.LAYERSDIR,
			// 		musicAttributes['trait_type'],
			// 		musicAttributes['value']
			// 	),
			// 	edition
			// );
			resolve('finalResp');
		} catch (error) {
			reject(error);
		}
	});
}
function generateVideoCmd(attributesPath, edition, overlayFilter = []) {
	return new Promise((resolve, reject) => {
		let totalTime = null;
		const tempOutputName = `${CONFIG.tempDataFolder}${CONFIG.tokenPrefix}${edition}${CONFIG.tokenExt}`;
		const ffmpegInstance = ffmpeg();
		ffmpegInstance
			.videoCodec('libx264')
			.videoBitrate('9500k')
			.audioCodec('copy')
			.audioBitrate('128k')
			.complexFilter(overlayFilter)
			.output(tempOutputName)
			.outputFormat('mp4')
			.on('start', function (commandLine) {
				console.log('Spawned Ffmpeg with command: ' + commandLine);
			})
			.on('codecData', function (data) {
				totalTime = parseInt(data.duration.replace(/:/g, ''));
			})
			.on('progress', (progress, err) => {
				const time = parseInt(progress.timemark.replace(/:/g, ''));
				const percent = (time / totalTime) * 100;
				console.log(
					`video combine progress ${CONFIG.tokenPrefix}${edition}`,
					percent.toFixed(2)
				);
			})
			.on('stderr', function (stderrLine) {
				// console.log('Stderr output: ' + stderrLine);
			})
			.on('error', function (error, stdout, stderr) {
				reject(error);
			})
			.on('end', function (stdout, stderr) {
				resolve(path.join(tempOutputName));
			})
			.run();
	});
}
// function combineWithAudio(videoPath, audioPath, edition) {
// 	return new Promise((resolve, reject) => {
// 		let totalTime = null;
// 		ffmpeg()
// 			.input(audioPath)
// 			.audioCodec('copy')
// 			.audioBitrate('128k')
// 			.input(videoPath)
// 			.inputOption('-stream_loop 3')
// 			.videoCodec('libx264')
// 			.videoBitrate('9500k')
// 			.CONFIG.OUTPUTNFT(`${CONFIG.OUTPUTNFT}${CONFIG.tokenPrefix}${edition}.mp4`)
// 			.CONFIG.OUTPUTNFTFormat('mp4')
// 			.on('start', function (commandLine) {
// 				// console.log('Spawned Ffmpeg with command: ' + commandLine);
// 			})
// 			.on('codecData', function (data) {
// 				totalTime = parseInt(data.duration.replace(/:/g, ''));
// 			})
// 			.on('progress', (progress, err) => {
// 				const time = parseInt(progress.timemark.replace(/:/g, ''));
// 				const percent = (time / totalTime) * 100;
// 				console.log(
// 					`audio combine progress ${CONFIG.tokenPrefix}${edition}`,
// 					percent.toFixed(2)
// 				);
// 			})
// 			.on('stderr', function (stderrLine) {
// 				// console.log('Stderr CONFIG.OUTPUTNFT: ' + stderrLine);
// 			})
// 			.on('error', function (error, stdout, stderr) {
// 				reject(error);
// 			})
// 			.on('end', function (stdout, stderr) {
// 				resolve(`${CONFIG.tokenPrefix}${edition}`);
// 			})
// 			.run();
// 	});
// }
// function ToCONFIG.OUTPUTNFT(Path, CONFIG.OUTPUTNFT) {
// 	return new Promise((resolve, reject) => {
// 		fs.rename(Path, CONFIG.OUTPUTNFT + '.mp4', function (err) {
// 			if (err) reject(err);
// 			resolve(`Successfully created ${CONFIG.OUTPUTNFT}`);
// 		});
// 	});
// }
// function removeFileInDir(dir, editionName) {
// 	fs.readdir(dir, (err, files) => {
// 		files = files.filter((f) => f.indexOf(editionName) != -1);
// 		if (err) throw err;
// 		for (const file of files) {
// 			fs.unlink(path.join(dir, file), (err) => {
// 				if (err) throw err;
// 			});
// 		}
// 	});
// }

// function CONFIG.OUTPUTNFTDirRead() {
// 	return new Promise((resolve, reject) => {
// 		fs.readdir(CONFIG.OUTPUTNFT, (err, files) => {
// 			if (err) reject(err);
// 			resolve(files);
// 		});
// 	});
// }
// function createMetaDataFile(name, metaData) {
// 	fs.writeFileSync(
// 		`${CONFIG.OUTPUTNFTMetadata}${name}`,
// 		JSON.stringify(metaData, null, 2)
// 	);
// }


