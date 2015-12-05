import * as Actions from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

import { AppConfig } from '../config.js';

function requestEntries() {
  return {
    type: Actions.LOAD_START,
    payload: {
      entries: []
    }
  };
}

function receiveEntries(json) {
  return {
    type: Actions.LOAD_RECEIVE,
    payload: {
      entries: json.entries
    }
  };
}

export function loadEntries() {
  return (dispatch)=>{
    dispatch(requestEntries());

    return fetch(AppConfig.API)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveEntries(json));
      }
    );
  };
}
