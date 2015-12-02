import * as ActionTypes from '../constants/ActionTypes.js';

const initialState = {
  'recent': true
};

export function activity(state = initialState, action = {}) {
  const { type, data } = action;

  switch (type) {
  default:
    break;
  case ActionTypes.ACTIVITY:
  case ActionTypes.IDLE:
    state.recent = data.active;
    break;
  }

  return state;
}
