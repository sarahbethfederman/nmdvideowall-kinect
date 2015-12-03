import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { source } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="ImageComponent">
        <img
          onload={ ::this.onLoad }
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
        overflow: hidden;
        width: 100%;
        z-index: 50;
      }

      & > img {
        left: 50%;
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        pointer-events: none;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    `);
  }

  onLoad() {
    this.setState({
      isLoading: false
    });

    if (this.props.hasOwnProperty('onLoad')) {
      this.props.onLoad();
    }
  }
}
