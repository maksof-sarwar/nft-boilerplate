import * as fs from 'fs';
import * as path from 'path';
import * as CLUSTER from 'cluster';
import CONFIG from '@nft/data/config';
import { createMetaDataFile, outputDirRead } from 'apps/nft-generate-by-metadata/src/app/function';
import { IMetadata } from '@nft/data/_interface/IMetadata';
import { generateVideo } from 'apps/nft-generate-by-metadata/src/app/create-video';
import { generateImage } from 'apps/nft-generate-by-metadata/src/app/create-image';
const METADATA: IMetadata[] = JSON.parse(fs.readFileSync(path.join(CONFIG.BUILD, CONFIG.metDataFileName), { encoding: 'utf-8' }));
const WORKERS = 4;
const cluster: any = CLUSTER;
async function startGenerating(workerID: number) {
  try {
    let start = Math.ceil(METADATA.length / WORKERS - 1) * (workerID - 1);
    let end =
      (workerID == WORKERS - 1
        ? METADATA.length
        : Math.ceil(METADATA.length / WORKERS - 1) * workerID) - 1;

    for (let i = start; i <= end; i++) {
      const fileName = `${CONFIG.tokenPrefix}${METADATA[i].edition
        .toString()
        .padStart(2, '0')}`;
      console.log(`${fileName} started!`);
      if (outputDirRead().includes(`${fileName}.${CONFIG.tokenExt}`)) {
        console.log(`${fileName} already exsist!`);
        createMetaDataFile(`${fileName}.json`, METADATA[i]);
      } else {
        const success = await generateImage(METADATA[i]);
        console.log(METADATA[i].edition, success);
        createMetaDataFile(`${success}.json`, METADATA[i]);
      }
    }
    console.log('Finshed from worker #' + workerID);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

export const startScript = () => {
  if (cluster.isMaster) {
    let exitWorker = {};
    for (let i = 0; i < WORKERS; i++) cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
      // console.info(`[Worker ${worker.process.pid}] died`);
      if (code == 96) {
        exitWorker[worker.process.pid] = true;
        if (Object.keys(exitWorker).length == WORKERS) {
          process.exit(69);
        }
      }
    });
  } else {
    startGenerating(cluster.worker.id);
    // console.log(`[Worker ${process.pid}] started`);
  }
};

