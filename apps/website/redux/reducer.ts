
import { combineReducers, } from '@reduxjs/toolkit'
import blockChainReducer from './blockchain/blockChain.slice';
import dataReducer from './data/data.slice';

const rootReducer = combineReducers({
  data: dataReducer,
  blockChain: blockChainReducer
})
export default rootReducer 