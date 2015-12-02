import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';

export default class Entry extends Component {
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
          <VideoComponent key={ sources[0] } poster={ poster || '' } sources={ sources } tracks={ tracks } onLoad={ ::this.onEntryLoad } />
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
}


Entry.defaultProps = {
  format: 'image'
};
