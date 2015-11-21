import { Component } from 'react';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';


import * as activityActions from '../actions/ActivityAction.js';

@connect((state) => {
  return {
    active: state.active
  };
}, activityActions)
class ActivityWatcher extends Component {
  constructor(props) {
    super(props);

    console.log('asdf', this.props);
  }

  render() {
    return null;
  }

  bindWindow() {

  }

  rafShim() {
    (()=>{
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
    }());
  }
}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(ActivityWatcher);
