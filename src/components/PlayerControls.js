import React, { Component } from 'react';
// import { Link } from 'react-router';
import InlineCss from 'react-inline-css';


export default class PlayerControls extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const currentPage = parseInt(this.props.current, 10);

    return (
      <InlineCss stylesheet={ this.css() } namespace="PlayerControls">
        <div className="player-controls">
          <button onClick={ ::this.onPrevious }>Previous</button>
          <button onClick={ ::this.onNext }>Next</button>
          <span>{ `${ currentPage } / ${ this.props.max }` }</span>
        </div>
      </InlineCss>
    );
  }

  css() {
    return (`
      & .player-controls {
        position: fixed;
        bottom: 10%;
        right: 5%;
        z-index: 50;
      }
    `);
  }


  onPrevious() {
    const max = parseInt(this.props.max, 10);
    const current = parseInt(this.props.current, 10);
    const { loops } = this.props;
    let prevIndex = current - 1;

    if (current > 1) {
      if (this.props.hasOwnProperty('onPrevious')) {
        this.props.onPrevious(prevIndex);
      }
    }else if (current <= 1 && loops) {
      prevIndex = max;

      if (this.props.hasOwnProperty('onNext')) {
        this.props.onPrevious(prevIndex);
      }
    }
  }

  onNext() {
    const max = parseInt(this.props.max, 10);
    const current = parseInt(this.props.current, 10);
    const { loops } = this.props;
    let nextIndex = current + 1;

    if (current < max) {
      if (this.props.hasOwnProperty('onNext')) {
        this.props.onNext(nextIndex);
      }
    }else if (current >= max && loops) {
      nextIndex = 1;

      if (this.props.hasOwnProperty('onNext')) {
        this.props.onNext(nextIndex);
      }
    }
  }

}
