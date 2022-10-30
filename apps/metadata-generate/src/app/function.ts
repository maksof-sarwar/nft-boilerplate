import CONFIG from '@nft/libs/shared/config';
import * as fs from 'fs';
import * as path from 'path';
import { IAttribute, IMetadata } from '@nft/libs/shared/_interface/IMetadata';

export const checkLayerFolderExist = () => {
  if (fs.existsSync(CONFIG.LAYERSDIR)) {
    return true;
  }
  throw new Error(`Layer folder not exist.`);
};
export const removeExistingFolederMetadata = () => {
  if (fs.existsSync(CONFIG.BUILD)) {
    fs.rmSync(CONFIG.BUILD, { recursive: true, force: true });
  }
  fs.mkdirSync(CONFIG.BUILD);
};

export const generateLayerCount = () => {
  return CONFIG.LAYERORDERS.map(({ name }) => ({
    name,
    number: fs.readdirSync(path.join(CONFIG.LAYERSDIR, name)).length,
  }));
};

export const layersSetup = (layersOrderAndCount) => {
  return layersOrderAndCount.map(({ name, number }, index) => ({
    id: index,
    name,
    location: path.join(CONFIG.LAYERSDIR, name),
    elements: getElements(path.join(CONFIG.LAYERSDIR, name), name),
    number,
  }));
};
export const writeLayerToJson = (layers) => {
  fs.writeFileSync(
    path.join(CONFIG.BUILD, CONFIG.LayerToJsonFileName),
    JSON.stringify(layers, null, 2),
  );
};
export const generateEdition = (layers, attributes: IAttribute[] = [], hashes = []) => {
  for (let [idx, layer] of layers.entries()) {
    const buildData = drawLayer(layer, attributes);
    buildData?.attribute && attributes.push(...buildData.attribute);
    buildData?.hash && hashes.push(...buildData.hash);
  }
  return {
    attributes,
    hashes: hashes.join(''),
  };
};
export const createMetaData = (metadata: IMetadata[]) => {
  fs.stat(path.join(CONFIG.BUILD, CONFIG.metDataFileName), (err) => {
    if (err == null || err.code === 'ENOENT') {
      fs.writeFileSync(
        path.join(CONFIG.BUILD, CONFIG.metDataFileName),
        JSON.stringify(metadata, null, 2)
      );
      fs.writeFileSync(
        path.join(CONFIG.BUILD, CONFIG.metDataStatsticsFileName),
        JSON.stringify(getAllTraits(metadata), null, 2)
      );
    } else {
      console.log('error: ', err.code);
    }
  });
};
function getAllTraits(metadata: IMetadata[]) {
  let all_traits = {};
  let attr_count = {};
  for (let i = 0; i < metadata.length; i++) {
    let nft = metadata[i];
    if (nft) {
      let { attributes } = nft;
      attributes = attributes.filter(
        (attribute) =>
          attribute['trait_type'] && attribute['value'] && !/None/gi.test(attribute['value'])
      );
      nft.attributes = attributes;
      if (attr_count[attributes.length]) {
        attr_count[attributes.length] = attr_count[attributes.length] + 1;
      } else {
        attr_count[attributes.length] = 1;
      }
      for (let j = 0; j < attributes.length; j++) {
        let attribute = attributes[j];
        let { trait_type, value } = attribute;
        if (trait_type && value) {
          if (all_traits[trait_type]) {
            all_traits[trait_type].sum++;
            if (all_traits[trait_type][value]) {
              all_traits[trait_type][value]++;
            } else {
              all_traits[trait_type][value] = 1;
            }
          } else {
            all_traits[trait_type] = { [value]: 1, sum: 1 };
          }
        }
      }
    }
  }
  return { all_traits, attr_count };
};
function drawLayer(_layer, attributes: IAttribute[], retry = 0) {
  const rand = Math.floor(Math.random() * (_layer.number - 0) + 0);
  let element = {
    name: _layer.name,
    selectedElement: _layer.elements[rand],
  };
  if (element.selectedElement) {
    return addAttributes(element.selectedElement, _layer);
  } else if (retry < 3) {
    retry++;
    drawLayer(_layer, attributes, retry);
  } else {
    return;
  }
}

function addAttributes(_element, _layer, attribute: IAttribute[] = [], hash = []) {
  attribute.push({
    layerID: _layer.id,
    elementID: _element.id,
    trait_type: _layer.name,
    value: _element.fileName,
  });
  hash.push(_layer.id);
  hash.push(_element.id);
  return {
    attribute,
    hash,
  };
}
function getElements(path: string, groupName: string) {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        groupName,
        fileName: i,
      };
    });
}