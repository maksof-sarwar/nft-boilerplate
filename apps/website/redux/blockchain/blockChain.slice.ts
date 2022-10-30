import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract } from "ethers";
import storageService from '@nft/libs/services/storage.service';
import { SHARED } from '../../data/_enum';
import { IBase } from '../../data/_interface';

export interface IBlockChainState extends IBase {
  data: {
    account?: string | null;
    balance?: number;
    "signer-token"?: string | null;
    smartContract?: null | Contract;
  };
}
const initialState: IBlockChainState = {
  loading: false,
  data: {
    account: null,
    balance: null,
    smartContract: null,
    "signer-token": storageService.getItemFromStorage(SHARED.signerToken) ?? null,
  },
  error: null,
};
export const blockChainSlice = createSlice({
  name: "blockChain",
  initialState,
  reducers: {
    resetState: (state) => {
      storageService.deleteItemFromStorage(SHARED.signerToken);
      return { ...initialState };
    },
    connectionRequest: state => {
      return {
        ...initialState,
        loading: true,
      };
    },
    connectionSuccess: (state, action: PayloadAction<IBlockChainState>) => {
      const { data } = action.payload;
      !data['signer-token'] ? storageService.deleteItemFromStorage(SHARED.signerToken) : storageService.setItemToStoage(SHARED.signerToken, data['signer-token']);
      return {
        ...state,
        loading: false,
        data: { ...state.data, smartContract: data.smartContract, ...data, }
      };
    },
    connectionFailed: (state, action: PayloadAction<string>) => {
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    },
  }
});

export const { connectionFailed, connectionRequest, connectionSuccess, resetState } = blockChainSlice.actions;
export default blockChainSlice.reducer;

