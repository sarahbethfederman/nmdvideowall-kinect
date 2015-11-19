import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { source } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="VideoComponent">
        <img
          onLoad={ ::this.props.onLoad }
          onComplete={ ::this.props.onComplete }
          src={ source }
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
}

VideoComponent.defaultProps = {
  onLoad: ()=>{},
  onComplete: ()=>{}
};
