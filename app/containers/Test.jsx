import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';


class Test extends Component {
  constructor () {
    super()
    this.state = {
      username: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios({
      method: 'post',
      url: 'http://52.56.45.37/api/v1/auth',
      data: {
        email: "string@gmail.com",
        password: "11111111",
        password_confirmation: "11111111"
      }
    }).then(function (response) {
      console.log('then', response);
    }).catch((error) => {
    console.log('ERROR ', error.response.data.errors.full_messages);
  });
  }

  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>
          Click Me
        </button>
        <p>{this.state.username}</p>

      </div>
    )
  }
};


export default Test;
