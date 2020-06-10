import React, { Component } from 'react';
import axios from 'axios';
import { api, authParams } from '../assets/nfl-authParams';

class NFL extends Component {
  state = {
    token: '',
    getReq: this.props.get,
    postReq: this.props.post,
    queryParams: this.props.queryParams,
    response: ''
  };

  componentDidMount() {
    const { getReq, postReq, queryParams, response } = this.state;
    const { get, post } = this.props;

    this.getAuth().then(() => {
      if (getReq !== undefined) {
        this.handleGetReq(get, queryParams).then(res =>
          this.setState({ response: res })
        );
      } else if (postReq !== undefined) {
        this.handlePostReq(post, queryParams).then(res =>
          this.setState({ response: res })
        );
      } else {
        console.log('Unknown Request');
      }
    });
  }

  render() {
    return 'test';
  }

  getAuth() {
    const data = Object.entries(authParams)
      .map(e => e.join('='))
      .join('&');

    return axios
      .post(`${api.endpoint}/oauth/token`, data)
      .then(response => this.setState({ token: response.data.access_token }))
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  handleGetReq(req, queryParams) {
    const endpoint =
      queryParams !== undefined
        ? `${api.endpoint}/${req}?s=${queryParams}`
        : `${api.endpoint}/${req}`;
    const config = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    };
    return axios
      .get(endpoint, { key: 'value' }, config)
      .then(response => response.data.data);
  }

  handlePostReq(req) {
    console.log(req);
  }
}

export default NFL;
