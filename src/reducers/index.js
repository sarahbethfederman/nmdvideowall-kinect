import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { entries } from './entries.js';

const rootReducer = combineReducers({
  entries,
  router
});

export default rootReducer;
