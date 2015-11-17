import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineCss from 'react-inline-css';
import WallApp from '../components/WallApp';

import * as entriesActionCreators from '../actions/EntriesAction.js';


@connect((state) => {
  return {
    entries: state.entries,
    filter: state.filter,
    router: state.router
  };
}, entriesActionCreators)
export default class IndexPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InlineCss stylesheet={ this.css() } namespace="Home">
        <WallApp entries={ this.props.entries } />
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
