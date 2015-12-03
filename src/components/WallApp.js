import React, { Component } from 'react';
// import fetch from 'fetch';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
// import store from '../lib/store';
import InlineCss from 'react-inline-css';

import PrimaryNavigation from './PrimaryNavigation';
import PlayerControls from './PlayerControls';
import MainPlayer from './MainPlayer';
import ActivityWatcher from './ActivityWatcher';

import SharedStyles from '../styles';

import * as entriesActionCreators from '../actions/EntriesAction.js';

@connect((state) => {
  return {
    router: state.router
  };
}, entriesActionCreators)
class WallApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    // setTimeout(()=>{
    //   this.setState({
    //     isLoading: false
    //   });
    // }, 1000);

    // this.getInitialData();
  }

  render() {
    return this.state.isLoading ? this.renderLoadingScreen() : this.renderDisplay();
  }

  generateErrorMessage() {
    let message = '';

    switch (this.state.errorCode) {
    default:
      message = '';
      break;
    }

    return message;
  }


  renderLoadingScreen() {
    return (
      <InlineCss stylesheet={ this.loadingCss() } namespace="WallApp-Loading">
        <div>
          this is the loading screen for the app. this could be an intro video or something idk
          <br /><br />
          { this.generateErrorMessage() }
        </div>
      </InlineCss>
    );
  }

  loadingCss() {
    return (`
      & div {
        font-size: 23px;
        color: red;
      }
    `);
  }

  renderDisplay() {
    const { entries } = this.props;
    const entryID = this.props.router.params.entryID || 1;

    return (
      <InlineCss stylesheet={ this.css() } namespace="WallApp">
        <div>
          <ActivityWatcher delay={ 1000 } />
          <MainPlayer entries={ entries } entry={ entries[entryID - 1] } />
          <PrimaryNavigation entries={ entries } selected={ entryID - 1 } />
          <PlayerControls
            current={ entryID }
            max={ entries.length || entries.size || 0 }
            onPrevious={ ::this.navigateTo }
            onNext={ ::this.navigateTo }
            loops
          />

          <br /><br />
          { this.generateErrorMessage() }
        </div>
      </InlineCss>
    );
  }

  navigateTo(index) {
    this.props.pushState(null, `/${ index }`);
  }

  css() {
    return (`
      html, body {
        background: #000;
        height: 100vh;
        width: 100vh;
        overflow: hidden;
        margin: 0;
        padding: 0;

        ${ SharedStyles.noTextSelect }
      }
    `);
  }

}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(WallApp);
