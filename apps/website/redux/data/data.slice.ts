
import { IBase } from '../../data/_interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IDataState extends IBase {
  data: any | null;
}
const initialState: IDataState = {
  loading: false,
  data: null,
  error: null
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    checkDataRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    checkDataSuccess: (state, action: PayloadAction<IDataState>) => {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    },
    checkDataFailed: (state, action: PayloadAction<string>) => {
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    }
  }
});

export const { checkDataFailed, checkDataRequest, checkDataSuccess } = dataSlice.actions;
export default dataSlice.reducer;