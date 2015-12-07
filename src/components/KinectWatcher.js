import { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { AppConfig } from '../config.js';

import * as activityActions from '../actions/ActivityAction.js';

@connect((state) => {
  return {
    active: state.active
  };
}, activityActions)
class KinectWatcher extends Component {
  constructor(props) {
    super(props);

    this.activityHandler = this.userDidSomething.bind(this);
  }

  componentDidMount() {
    const W3CWebSocket = require('websocket').w3cwebsocket;
    this.client = new W3CWebSocket(AppConfig.WebSocketServer, 'echo-protocol');

    this.client.onerror = function() {
      console.log('Connection Error');
    };

    this.client.onopen = function() {
      console.log('WebSocket Client Connected');

      // function sendNumber() {
      //     if (client.readyState === client.OPEN) {
      //         const number = Math.round(Math.random() * 0xFFFFFF);
      //         client.send(number.toString());
      //         setTimeout(sendNumber, 1000);
      //     }
      // }
      // sendNumber();
    };

    this.client.onclose = () => {
      console.log('echo-protocol Client Closed');
    };

    this.client.onmessage = (e) => {
      if (typeof e.data === 'string') {
        console.log(`Received: ${e.data}`);
      }
    };
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.abort();
    }
  }

  render() {
    // not rendering anything since this is a 'background' component
    return null;
  }

  // used to trigger activity state
  userDidSomething() {
    if (this.props.active === false) {
      this.userIsActive();
    }
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }

    this.activityTimer = setTimeout(() => this.userIsNotActive(), (this.props.hasOwnProperty(`delay`) ? this.props.delay : 500));
  }

  userIsActive() {
    this.props.confirmUserWasActive();
  }

  userIsNotActive() {
    this.props.confirmUserWasIdle();
  }

}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(KinectWatcher);
