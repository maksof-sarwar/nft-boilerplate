import { createSlice } from "@reduxjs/toolkit"
import { Contract } from "ethers";


export interface IBlockChainState {
  loading: boolean,
  account: string | null,
  balance: number | null,
  smartContract: Contract,
  errorMsg: string,
}
const initialState: IBlockChainState = {
  loading: false,
  account: null,
  balance: null,
  smartContract: null,
  errorMsg: "",
}
export const blockChainSlice = createSlice({
  name: "blockChain",
  initialState,
  reducers: {
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
      return {
        ...state,
        account: action.payload.account,
      };
    }
  }
})

export const { connectionFailed, connectionRequest, connectionSuccess, updateAccountRequest } = blockChainSlice.actions;
export default blockChainSlice.reducer;

