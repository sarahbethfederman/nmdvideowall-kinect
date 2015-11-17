import React, { Component } from 'react';
// import fetch from 'fetch';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
// import store from '../lib/store';
import InlineCss from 'react-inline-css';

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
      isLoading: true
    };

    setTimeout(()=>{
      this.setState({
        isLoading: false
      });
    }, 1000);

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
    case 1:
      message = `No users found with that code.`;
      break;
    case 2:
      message = `That pin code and stuff is wrong`;
      break;
    case 3:
      message = `Authorization is required to initiate trade with this dealer`;
      break;
    case 4:
      message = `Invalid PIN format`;
      break;
    }

    return message;
  }


  renderLoadingScreen() {
    return (
      <InlineCss stylesheet={ this.loadingCss() } namespace="WallApp-Loading">
        <div>
          loading
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

    return (
      <InlineCss stylesheet={ this.css() } namespace="WallApp">
        <div>
          this is the real page


          <div className="main-player">
            <div className="progress-bar" data-progress="25"></div>
            <div className="video-player">{ this.props.router.params.entryID }</div>
          </div>

          <div className="video-controls">
            <button>play</button>
            <button>mute</button>
            <input type="range" min="0" max="100" step="1" />
          </div>

          <div className="primary-navigation">
            <ul key={ entries.size }>
              {
                entries.map((entry, idx)=>{
                  return (
                    <li key={ idx } title={ entry.location }>{ entry.title }</li>
                  );
                })
              }
            </ul>
          </div>


          <br /><br />
          { this.generateErrorMessage() }
        </div>
      </InlineCss>
    );
  }

  css() {
    return (`
      & div {
        font-size: 14px;
        color: #333;
        text-decoration: underline;
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
