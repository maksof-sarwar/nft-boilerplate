import { createSlice } from "@reduxjs/toolkit"
import { Contract } from "ethers";


export interface IBlockChainState {
  loading: boolean;
  account: string | null;
  balance: number;
  "signer-token": string | null;
  smartContract: Contract;
  errorMsg: string;
}
const initialState: IBlockChainState = {
  loading: false,
  account: null,
  balance: null,
  smartContract: null,
  "signer-token": null,
  errorMsg: "",
}
export const blockChainSlice = createSlice({
  name: "blockChain",
  initialState,
  reducers: {
    resetState: (state) => {
      return { ...initialState }
    },
    connectionRequest: state => {
      return {
        ...initialState,
        loading: true,
      };
    },
    connectionSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    },
    connectionFailed: (state, action) => {
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    },
    updateAccountRequest: (state, action) => {
      const { account, balance } = action.payload;
      return {
        ...state,
        account,
        balance
      };
    },
    updateSignerToken: (state, action) => {
      const { signerToken } = action.payload;
      !signerToken ? localStorage.removeItem('signer-token') : localStorage.setItem('signer-token', signerToken)
      return {
        ...state,
        "signer-token": signerToken
      };
    }
  }
})

export const { connectionFailed, connectionRequest, connectionSuccess, updateSignerToken, updateAccountRequest, resetState } = blockChainSlice.actions;
export default blockChainSlice.reducer;

