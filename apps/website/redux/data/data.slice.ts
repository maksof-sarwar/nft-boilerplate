
import { createSlice } from "@reduxjs/toolkit"
export interface IDataState {
  loading: boolean;
  information: any;
  error: boolean;
  errorMsg: string;
}
const initialState = {
  loading: false,
  information: {},
  error: false,
  errorMsg: '',
}
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    checkDataRequest: state => {
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      }
    },
    checkDataSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        information: {
          ...action.payload,
        },
        error: false,
        errorMsg: '',
      }
    },
    checkDataFailed: (state, action) => {
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    }
  }
})

export const { checkDataFailed, checkDataRequest, checkDataSuccess } = dataSlice.actions;
export default dataSlice.reducer;