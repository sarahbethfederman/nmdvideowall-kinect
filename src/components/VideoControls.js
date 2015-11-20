import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class VideoControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      muted: false,
      volume: 1
    };
  }

  render() {
    const { playing, muted } = this.state;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoControls">
        <div className="video-controls">
          <button onClick={ ::this.onPlayToggle }>{ playing ? `Pause` : `Play` }</button>
          <button onClick={ ::this.onMuteToggle }>{ muted ? `Unmute` : `Mute` }</button>
          <input ref="volume" onChange={ ::this.onVolumeChange } type="range" min="0" max="1" step="0.1" defaultValue="1" />
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


  onVolumeChange() {
    const volume = this.refs.volume.value;

    if (this.props.onVolumeChange) {
      this.props.onVolumeChange(volume);
    }

    this.setState({
      volume
    });
  }
  onPlayToggle() {
    const newSetting = !this.state.playing;

    if (this.props.onPlayToggle) {
      this.props.onPlayToggle(newSetting);
    }

    this.setState({
      playing: newSetting
    });
  }

  onMuteToggle() {
    const newSetting = !this.state.muted;

    if (this.props.onMuteToggle) {
      this.props.onMuteToggle(newSetting);
    }

    this.setState({
      muted: newSetting
    });
  }
}
