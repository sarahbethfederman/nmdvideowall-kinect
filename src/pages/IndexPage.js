import React, { Component } from 'react';
import fetch from 'fetch';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import store from '../lib/store';
import InlineCss from 'react-inline-css';

class IndexPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedEntry: store.getState().router.params.entryID || null,
      isLoading: true
    };

    setTimeout(()=>{
      this.setState({
        isLoading: false
      });
    }, 1000);

    // this.getInitialData();
  }

  render() {
    return this.state.isLoading ? this.renderLoadingScreen() : this.renderDisplay();
  }

  generateErrorMessage() {
    let message = '';

    switch (this.state.errorCode) {
    default:
      message = '';
      break;
    case 1:
      message = `No users found with that code.`;
      break;
    case 2:
      message = `That pin code and stuff is wrong`;
      break;
    case 3:
      message = `Authorization is required to initiate trade with this dealer`;
      break;
    case 4:
      message = `Invalid PIN format`;
      break;
    }

    return message;
  }


  renderLoadingScreen() {
    return (
      <InlineCss stylesheet={ this.loadingCss() } namespace="Home-Loading">
        <div>
          loading
        </div>
      </InlineCss>
    );
  }

  loadingCss() {
    return (`
      & div {
        font-size: 23px;
        color: red;
      }
    `);
  }


  renderDisplay() {
    return (
      <InlineCss stylesheet={ this.css() } namespace="Home">
        <div>
          this is the real page

          <br /><br />
          { this.generateErrorMessage() }
        </div>
      </InlineCss>
    );
  }

  css() {
    return (`
      & div {
        font-size: 14px;
        color: #333;
        text-decoration: underline;
      }
    `);
  }


  getInitialData() {
    const URL = `http://nmdwall.api:3333/`;

    (window.fetch || fetch)(URL, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(({status, user}) => {
      if (status === 'success') {
        if (!user || user.length <= 0) {
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      }
    });
  }

}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(IndexPage);
