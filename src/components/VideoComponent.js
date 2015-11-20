import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import VideoControls from './VideoControls';


export default class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { poster, sources } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoComponent">
        <video
          ref="video"
          onLoad={ ::this.props.onLoad }
          onComplete={ ::this.props.onComplete }
          preload="auto"
          poster={ poster }>
          {
            sources.map((source)=>{
              return (
                <source key={ source } src={ source } type={ `video/${ source.substr(source.lastIndexOf('.') + 1) }` } />
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
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 50;
      }
    `);
  }


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

VideoComponent.defaultProps = {
  onLoad: ()=>{},
  onComplete: ()=>{}
};
