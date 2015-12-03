import * as ActionTypes from '../constants/ActionTypes.js';


// the "active" state that will be passed around globally
// is just a boolean. if we want to include other data
// (such as last time the user acted, etc) we could turn
// this into an object and go from there. ezpz
const initialState = true;

export function active(state = initialState, action = {}) {
  const { type, data } = action;
  let newState = state;

  switch (type) {
  default:
    break;

  // if the user does something or is idle,
  // we want to update the 'active' state.
  case ActionTypes.ACTIVITY:
  case ActionTypes.IDLE:
    newState = data.active;
    break;
  }

  return newState;
}
