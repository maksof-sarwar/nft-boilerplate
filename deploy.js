const hre = require("hardhat");

async function main() {

  const NftContract = await hre.ethers.getContractFactory("CONTRACTSAMPLE");
  const Name = '';
  const ShorName = '';
  const BaseURL = '';
  const HiddenURL = ''
  const nftContract = await NftContract.deploy(Name,ShorName, BaseURL, HiddenURL);

  await nftContract.deployed();
  console.log("My NFT deployed to:", nftContract.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });