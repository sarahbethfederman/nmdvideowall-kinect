import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineCss from 'react-inline-css';
import WallApp from '../components/WallApp';

import * as entriesActionCreators from '../actions/EntriesAction.js';


@connect((state) => {
  return {
    entries: state.entries
  };
}, entriesActionCreators)
export default class IndexPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InlineCss stylesheet={ this.css() } namespace="Home">
        <WallApp />
      </InlineCss>
    );
  }

  css() {
    return (`
    `);
  }
}
