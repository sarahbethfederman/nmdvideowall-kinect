import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import VideoControls from './VideoControls';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';

export default class EntryDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 50,
      duration: 100
    };
  }

  render() {
    const { format } = this.props;

    return this[`render${ format.charAt(0).toUpperCase() + format.slice(1) }`]();
  }

  renderVideo() {
    const { elapsed, duration } = this.state;
    const sources = [this.props.location];
    const { poster } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="EntryDisplay">
        <div className="entry-display">
          <div className="progress-bar" data-progress={ Math.round((elapsed / duration) * 100) }></div>
          this is a video
          <VideoComponent poster={ poster || '' } sources={ sources } />
          <VideoControls />
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  renderImage() {
    const { location } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="EntryDisplay">
        <div className="entry-display">
          <ImageComponent source={ location } />
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


EntryDisplay.defaultProps = {
  format: 'image'
};
