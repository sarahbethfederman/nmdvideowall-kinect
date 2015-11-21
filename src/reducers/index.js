import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { entries } from './entries.js';
import { active } from './active.js';

const rootReducer = combineReducers({
  entries,
  active,
  router
});

export default rootReducer;
