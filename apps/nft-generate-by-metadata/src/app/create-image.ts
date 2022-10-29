import CONFIG from "@armorsclub/data/config";
import * as path from 'path'
import * as fs from 'fs'
import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath.path);
export async function generateImage(metaData) {
	return new Promise(async (resolve, reject) => {
		try {

			let { edition, attributes } = metaData;
			edition = edition.toString().padStart(2, '0');
			const attributesPath = attributes.map((attribute) =>
				path.join(CONFIG.LAYERSDIR, attribute['trait_type'], attribute['value'])
			);
			const videoResp: string = await generateImageCmd(attributesPath, edition);
			const outputPath = path.join(CONFIG.OUTPUTNFT, videoResp.split('\\').pop())
			await moveTempoutputToOutput(videoResp, outputPath)


			resolve(path.basename(outputPath).replace(/\.[^/.]+$/, ""));
		} catch (error) {
			reject(error);
		}
	});
}
function generateImageCmd(attributesPath, edition, overlayFilter = []): Promise<string> {
	return new Promise((resolve, reject) => {
		let totalTime = null;
		const tempOutputName = path.join(CONFIG.tempDataFolder, `${CONFIG.tokenPrefix}${edition}.${CONFIG.tokenExt}`);
		const ffmpegInstance = ffmpeg();
		for (let i = attributesPath.length - 1; i >= 0; i--) {
			ffmpegInstance.input(attributesPath[i]);
			overlayFilter.push({
				inputs: `${i != attributesPath.length - 1 ? `[out][${i}]` : `[${i}][${i - 1}]`
					}`,
				filter: 'overlay',
				options: '0:0',
				outputs: '[out]',
			});
			if (i == 0) {
				overlayFilter.push({
					inputs: `[out]`,
					filter: 'scale',
					options: '1080:1080',
				});
			}
		}
		ffmpegInstance
			.complexFilter(overlayFilter)
			.output(tempOutputName)
			.outputFormat(CONFIG.tokenExt)
			.on('start', function (commandLine) {
				// console.log('Spawned Ffmpeg with command: ' + commandLine);
			})
			.on('codecData', function (data) {
				// totalTime = parseInt(data.duration.replace(/:/g, ''));
			})
			.on('progress', (progress, err) => {
				// const time = parseInt(progress.timemark.replace(/:/g, ''));
				// console.log(time, totalTime)
				// const percent = (time / totalTime) * 100;
				// console.log(
				// 	`combine progress ${CONFIG.tokenPrefix}${edition}`,
				// 	percent.toFixed(2)
				// );
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

function moveTempoutputToOutput(tempOutputPath, output) {
	return new Promise((resolve, reject) => {
		fs.rename(tempOutputPath, output, function (err) {
			if (err) reject(err);
			resolve(`Successfully created ${output}`);
		});
	});
}



