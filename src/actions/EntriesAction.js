import * as Actions from '../constants/ActionTypes';

export function setFilter(filter) {
  return {
    type: Actions.SET_FILTER,
    payload: filter
  };
}
