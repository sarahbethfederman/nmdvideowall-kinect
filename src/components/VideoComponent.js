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
    const { poster, sources, tracks } = this.props;
    const { elapsed, duration } = this.state;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoComponent">
        <div className="progress-bar">
          <div className="bar" style={{ width: `${(elapsed / duration) * 100}%` }}></div>
        </div>

        <video
          ref="video"
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
          {
            tracks.map((track, index)=>{
              // kind = `subtitles`
              // label = `English`
              // srclang = `en`
              // src = `url/to/file.vtt`
              // defaults to first in list
              return React.createElement(
                <track key={ index } kind={ track.kind } label={ track.label } srcLang={ track.srclang } src={ track.source } default={ index === 0 } />,
                { ref: `track-${index}` }
              );
            })
          }
        </video>

        <VideoControls
          onVolumeChange={ ::this.onVolumeChange }
          onPlayToggle={ ::this.onPlayToggle }
          onMuteToggle={ ::this.onMuteToggle }
          onCCToggle={ ::this.onCCToggle }
          hasCC={ (tracks.length || tracks.size || 0) > 0 }
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

      & > .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1.1vh;
        background: #595959;
        display: block;
        z-index: 40;
        min-height: 10px;
      }

      & > .progress-bar .bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height:auto;
        width: 0%;
        background: #B2B2B2;
        display: block;
        z-index: 5;
      }
    `);
  }

  setVideoListeners() {
    const vid = this.refs.video;

    vid.addEventListener('canplaythrough', ()=>this.onLoad());
    vid.addEventListener('timeupdate', ()=>this.onTick());
    vid.addEventListener('ended', ()=>this.onComplete());
  }

  removeVideoListeners() {
    const vid = this.refs.video;

    vid.removeEventListener('timeupdate');
    vid.removeEventListener('canplaythrough');
    vid.removeEventListener('ended');
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

  onCCToggle(yesno) {
    const { tracks } = this.props;

    (tracks || []).map((track, index)=>{
      this.refs[`track-${index}`].mode = yesno ? 'showing' : 'hidden';
    });
  }
}

VideoComponent.defaultProps = {
  poster: ``,
  sources: [],
  tracks: []
};
