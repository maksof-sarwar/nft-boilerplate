import CONFIG from '@nft/libs/shared/config';
import { generateLayerCount, layersSetup, writeLayerToJson, generateEdition, removeExistingFolederMetadata, checkLayerFolderExist, createMetaData } from './app/function';
import { IMetadata } from '@nft/libs/shared/_interface/IMetadata';


const createFiles = (edition, metadata: IMetadata[] = [], Exists = new Map()) => {
  const layers = layersSetup(generateLayerCount());
  writeLayerToJson(layers);
  let numDupes = 0;
  let i = 1;
  while (i <= edition) {
    const { attributes, hashes } = generateEdition(layers);
    if (Exists.has(hashes)) {
      console.log(
        `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
          hashes
        )}`
      );
      numDupes++;
      i--;
      if (numDupes > edition) break;
    } else {
      Exists.set(hashes, i);
      metadata.push({
        name: CONFIG.projectName,
        description: CONFIG.nftDescription,
        hash: hashes,
        edition: i,
        date: Date.now(),
        attributes,
      });
      i++;
      // console.log(`Creating edition ${i}`);
    }
  }
  return metadata;
};

const start = () => {
  try {
    if (checkLayerFolderExist()) {
      removeExistingFolederMetadata();
      const metaData: IMetadata[] = createFiles(CONFIG.noOfEdition);
      createMetaData(metaData);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('Metadata created successfully. Please check libs/shared/BUILD folder.');
  }
};

start();