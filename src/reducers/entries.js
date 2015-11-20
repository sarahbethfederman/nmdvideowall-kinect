// import * as ActionTypes from '../constants/ActionTypes.js';

const initialState = [
  { id: 1, title: `Title 1`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/150/150`, createdDate: Date.now },
  { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm`, createdDate: Date.now },
  { id: 2, title: `Title 2`, description: `This is the description`, format: `video`, location: `http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm`, createdDate: Date.now },
  { id: 3, title: `Title 3`, description: `This is the description`, format: `image`, location: `http://fillmurray.com/200/200`, createdDate: Date.now }];

export function entries(state = initialState, action = null) {
  const { type } = action;

  switch (type) {
  default:
    return state;
  }
}
