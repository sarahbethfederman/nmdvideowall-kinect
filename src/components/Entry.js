import React, { Component } from 'react';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';

import * as entriesActionCreators from '../actions/EntriesAction.js';

@connect((state) => {
  return {
    router: state.router
  };
}, entriesActionCreators)
class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    const { format } = this.props;

    return this[`render${ format.charAt(0).toUpperCase() + format.slice(1) }`]();
  }

  renderVideo() {
    const sources = [this.props.location];
    const { poster, tracks } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="Entry">
        <div className="entry-display">
          <VideoComponent
            key={ sources[0] }
            poster={ poster || '' }
            sources={ sources }
            tracks={ tracks }
            onLoad={ ::this.onEntryLoad }
            onComplete={ ::this.onEntryComplete } />
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  renderImage() {
    const { location } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="Entry">
        <div className="entry-display">
          <ImageComponent source={ location } onLoad={ ::this.onEntryLoad } />
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  css() {
    return (`
      & .entry-display {

      }

      & .entry-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 32px;
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

  onEntryLoad() {
    this.setState({
      isLoading: false
    });
  }

  onEntryComplete() {
    // this WILL break
    // we need to dispatch a new entry select event
    this.props.pushState(null, `/${ (parseInt(this.props.router.params.entryID || 1, 10) + 1) }`);
  }
}


Entry.defaultProps = {
  format: 'image'
};


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(Entry);
