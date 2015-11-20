import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import Entry from './Entry';

export default class MainPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 50,
      duration: 100
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('hi', nextProps);
  }

  render() {
    const { entry } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="MainPlayer">
        <Entry ref="entry" { ...entry } />
      </InlineCss>
    );
  }

  css() {
    return (`
      & .MainPlayer-display {

      }
    `);
  }
}
