import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { entries, filter } from './entries.js';

const rootReducer = combineReducers({
  entries,
  filter,
  router
});

export default rootReducer;
