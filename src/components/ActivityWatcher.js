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

    // this is kinda weird
    this.activityHandler = this.userDidSomething.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.activityHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.activityHandler);
  }

  render() {
    return null;
  }

  userDidSomething() {
    if (this.props.active === false) {
      this.userIsActive();
    }
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }

    this.activityTimer = setTimeout(() => this.userIsNotActive(), 5000);
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
)(ActivityWatcher);
