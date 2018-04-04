import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { SignUpTest } from '../actions/user_test';
import { Field, reduxForm } from 'redux-form'


const Test = props => {

  const { handleSubmit } = props;

    return (
      <div className='button__container'>
        <form onSubmit={handleSubmit(SignUpTest)}>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
                validate={false}
              />
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
                validate={false}
              />
              <Field
                name="confirm_password"
                component="input"
                type="password"
                placeholder="Confirm password"
                validate={false}
              />
              <button type="button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
};


export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(Test)
