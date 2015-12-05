import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class VideoControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      muted: false,
      ccEnabled: false,
      volume: 1
    };
  }

  render() {
    const { playing, muted } = this.state;
    const { hasCC } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoControls">
        <div className="video-controls">
          <button onClick={ ::this.onPlayToggle }>{ playing ? `Pause` : `Play` }</button>
          <button onClick={ ::this.onMuteToggle }>{ muted ? `Unmute` : `Mute` }</button>
          <input ref="volume" onChange={ ::this.onVolumeChange } type="range" min="0" max="1" step="0.1" defaultValue="1" />
          {
            ()=>{
              if (hasCC) {
                return this.renderCaptionControls();
              }
            }
          }
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

  renderCaptionControls() {
    const { ccEnabled } = this.state;

    return (
      <button onClick={ ::this.onCCToggle }>{ ccEnabled ? `Disable CC` : `Enable CC` }</button>
    );
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
    const playing = !this.state.playing;

    if (this.props.onPlayToggle) {
      this.props.onPlayToggle(playing);
    }

    this.setState({
      playing
    });
  }

  onMuteToggle() {
    const muted = !this.state.muted;

    if (this.props.onMuteToggle) {
      this.props.onMuteToggle(muted);
    }

    this.setState({
      muted
    });
  }

  onCCToggle() {
    const ccEnabled = !this.state.ccEnabled;

    if (this.props.onCCToggle) {
      this.props.onCCToggle(ccEnabled);
    }

    this.setState({
      ccEnabled
    });
  }
}
