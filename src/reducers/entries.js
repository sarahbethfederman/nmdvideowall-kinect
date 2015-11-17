import * as ActionTypes from '../constants/ActionTypes.js';

const initialState = [
  { id: 1, title: `Title 1`, description: `This is the description`, format: `video`, location: `http://placekitten.com/g/150/150`, createdDate: Date.now },
  { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://placekitten.com/g/250/250`, createdDate: Date.now },
  { id: 3, title: `Title 3`, description: `This is the description`, format: `image`, location: `http://placekitten.com/g/200/200`, createdDate: Date.now }];

export function entries(state = initialState, action = null) {
  const { type } = action;

  switch (type) {
  default:
    return state;
  }
}

export function filter(state = 'All', action = null) {
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.SET_FILTER:
    return payload;
  default:
    return state;
  }
}
