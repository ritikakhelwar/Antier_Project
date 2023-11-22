import {combineReducers} from '@reduxjs/toolkit';
import actionTypes from '../actionTypes';

import reducers from './reducers';

const appReducer = combineReducers({
  reducers,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
