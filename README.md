# NFT BOILER PLATE

# APPS

-> metadata-generate
-> nft-generate-by-metadata
-> website
-> library

# STEP 1: Edit libs/shared/config.ts according to requirements

# STEP 2: Create NFT Metadata

- pnpm run metadata

# STEP 2: Create NFT From Metadata

- pnpm run nft

# STEP 3: Deploy Smart Contract

- Run Hardhat Local Server pnpm run bcserver
- To Create Smart Contract edit contracts/contract-sample.sol according to requirements
- Run pnpm run deploy to deploy on localhost
- Get output contract address and edit into libs/shared/config.ts file
- To interact with Smart Contract in website

# STEP 4: Interact with Smart Contract

- pnpm run website
- Get build of this website run pnpm run website:build

# Note:

- All build files goes to dist folder
- All shard files are in libs/shared

# Created By [Muhammad Sarwar](https://github.com/maksof-sarwar)
