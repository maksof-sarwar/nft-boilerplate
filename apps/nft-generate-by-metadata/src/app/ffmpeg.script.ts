import CONFIG from '@nft/libs/shared/config';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath.path);
import * as path from 'path';


export function generateImageCmd(attributesPath, edition, overlayFilter = []): Promise<string> {
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
export function generateVideoCmd(attributesPath, edition, overlayFilter = []): Promise<string> {
  return new Promise((resolve, reject) => {
    let totalTime = null;
    const tempOutputName = `${CONFIG.tempDataFolder}${CONFIG.tokenPrefix}${edition}${CONFIG.tokenExt}`;
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