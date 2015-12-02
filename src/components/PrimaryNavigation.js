import React, { Component } from 'react';
// import fetch from 'fetch';
import { Link } from 'react-router';
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
class PrimaryNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { entries, selected } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="PrimaryNavigation">
        <div className="primary-navigation">
          <ul key={ entries.size }>
            {
              entries.map((entry, idx)=>{
                return (
                  <li className="nav-item" key={ idx } title={ entry.location }>
                  { selected !== idx ? (<Link to={ `/${ idx + 1 }` }>{ entry.title }</Link>) : (<span>{ entry.title }</span>) }
                  </li>
                );
              })
            }
          </ul>
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  css() {
    return (`
      & > .primary-navigation {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        left: 5%;
        right: 5%;
        z-index: 50;
      }

      & > .primary-navigation > ul .nav-item {
        display: inline-block;
        width: ${ 100 / (this.props.entries.size || this.props.entries.length || 1) }%;
        height: 10vh;
        box-shadow: inset 0px 0px 2px;
      }
    `);
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
}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(PrimaryNavigation);
