import * as Actions from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

function requestPosts(reddit) {
  return {
    type: Actions.LOAD_START,
    payload: {
      reddit
    }
  };
}

function receivePosts(reddit, json) {
  return {
    type: Actions.LOAD_RECEIVE,
    payload: {
      reddit,
      entries: json.data.children.map(child => child.data),
      receivedAt: Date.now()
    }
  };
}

export function loadEntries(reddit = 'javascript') {
  return (dispatch)=>{
    dispatch(requestPosts(reddit));

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => {
        dispatch(receivePosts(reddit, json));
      }
    );
  };
}
