import * as Actions from '../constants/ActionTypes.js';

// const initialState = [
//   { id: 1, title: `Title 1`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/150/150`, createdDate: Date.now },
//   { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm`, createdDate: Date.now },
//   { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm`, createdDate: Date.now },
//   { id: 3, title: `Title 3`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/200/200`, createdDate: Date.now }];

const initialState = [];

export function entries(state = initialState, action = null) {
  const { type, payload } = action;

  let newState = state;

  switch (type) {
  default:
    break;
  case Actions.LOAD_RECEIVE:
    newState = payload.entries;

    // but since we're faking it here anyway
    // (remove this when API is hooked up)
    newState = [
      { id: 1, title: `Title 1`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/150/150`, createdDate: Date.now },
      { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm`, createdDate: Date.now },
      { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm`, createdDate: Date.now },
      { id: 3, title: `Title 3`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/200/200`, createdDate: Date.now }];
    break;
  }

  return newState;
}
