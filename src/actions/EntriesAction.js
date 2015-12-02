import * as Actions from '../constants/ActionTypes';

export function setFilter(filter) {
  return {
    type: Actions.SET_FILTER,
    payload: filter
  };
}


export function loadStuff() {
  return {
    type: 'fart',
    promise: new Promise((resolve) => {
      fetch(`//fake.api/whatever`)
      .then((response)=>{
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response;
      })
      .then((response)=>{
        resolve(response);
      });
    })
  };
}
