import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import VideoControls from './VideoControls';


export default class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      elapsed: 0,
      duration: 0
    };
  }

  componentDidMount() {
    this.setVideoListeners();
  }

  componentWillUnmount() {
    this.removeVideoListeners();
  }

  render() {
    const { poster, sources } = this.props;
    const { elapsed, duration } = this.state;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoComponent">
        <div className="progress-bar" data-progress={ Math.round((elapsed / duration) * 100) }></div>

        <video
          ref="video"
          onload={ ::this.onLoad }
          oncomplete={ ::this.onComplete }
          preload="auto"
          autoPlay="autoplay"
          poster={ poster }>
          {
            sources.map((source, idx)=>{
              return (
                <source key={ idx } src={ source } type={ `video/${ source.substr(source.lastIndexOf('.') + 1) }` } />
              );
            })
          }
        </video>

        <VideoControls
          onVolumeChange={ ::this.onVolumeChange }
          onPlayToggle={ ::this.onPlayToggle }
          onMuteToggle={ ::this.onMuteToggle }
        />
      </InlineCss>
    );
  }

  css() {
    return (`
      & {
        height: 100%;
        left: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 50;
      }

      & > video {
        left: 50%;
        min-height: 100%;
        min-width: 100%;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    `);
  }

  setVideoListeners() {
    const vid = this.refs.video;

    vid.addEventListener('timeupdate', ()=>{
      this.onTick();
    });
  }

  removeVideoListeners() {
    const vid = this.refs.video;

    console.log('here');

    vid.removeEventListener('timeupdate');
    vid.removeEventListener('load');
    vid.removeEventListener('complete');
  }

  onTick() {
    const video = this.refs.video;

    if (!video) {
      return;
    }

    this.setState({
      duration: video.duration || 0,
      elapsed: video.currentTime || 0
    });

    if (this.props.hasOwnProperty('onTick')) {
      this.props.onTick();
    }
  }


  // Video event handlers
  onLoad() {
    const video = this.refs.video;
    if (!video) {
      return;
    }

    this.setState({
      isLoading: false,
      duration: video.duration || 0,
      elapsed: video.currentTime || 0
    });

    if (this.props.hasOwnProperty('onLoad')) {
      this.props.onLoad();
    }
  }

  onComplete() {
    const video = this.refs.video;
    if (!video) {
      return;
    }

    if (this.props.hasOwnProperty('onComplete')) {
      this.props.onComplete();
    }
  }

  // Volume control handlers
  onVolumeChange(volume) {
    this.refs.video.volume = volume || 0;
  }
  onPlayToggle(yesno) {
    this.refs.video[yesno ? `play` : `pause`]();
  }
  onMuteToggle(yesno) {
    this.refs.video.muted = yesno;
  }
}
