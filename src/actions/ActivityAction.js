import * as Actions from '../constants/ActionTypes';


// this function can be called inside a component
// so here we're setting it up so that if something detects mouse activity,
// we tell it to fire this function off, which ultimately updates the whole state
// "but it's just returning an object?", you're asking, right?
// yeah idk i think it's just some redux magic at work
export function setActive(yesno) {
  return {
    // 'type' is what tells the reducer which way to affect the state
    type: Actions.ACTIVITY,
    // anything else in here is grabbed by the handler in the reducer
    // (i'm just dumping it in an object)
    data: {
      active: yesno
    }
  };
}

export function wasActive() {
  return {
    // 'type' is what tells the reducer which way to affect the state
    type: Actions.ACTIVITY,
    // anything else in here is grabbed by the handler in the reducer
    // (i'm just dumping it in an object)
    data: {
      active: true
    }
  };
}

export function wasIdle() {
  return {
    // 'type' is what tells the reducer which way to affect the state
    type: Actions.IDLE,
    // anything else in here is grabbed by the handler in the reducer
    // (i'm just dumping it in an object)
    data: {
      active: false
    }
  };
}
