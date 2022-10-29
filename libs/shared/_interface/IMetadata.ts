export interface IMetadata {

  name: string,
  description: string,
  hash: string,
  edition: number,
  date: number,
  attributes: IAttribute[]

}

export interface IAttribute {
  layerID: number;
  elementID: number;
  trait_type: string;
  value: string
}