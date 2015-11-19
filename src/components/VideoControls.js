import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class VideoControls extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoControls">
        <div className="video-controls">
          <button onClick={ ::this.props.onPlayToggle }>play</button>
          <button onClick={ ::this.props.onMuteToggle }>mute</button>
          <input onClick={ ::this.props.onVolumeChange } type="range" min="0" max="100" step="1" defaultValue="100" />
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  css() {
    return (`
      & .video-controls {
        position: fixed;
        bottom: 10%;
        left: 5%;
        z-index: 50;
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


VideoControls.defaultProps = {
  onPlayToggle: ()=>{},
  onMuteToggle: ()=>{},
  onVolumeChange: ()=>{}
};
