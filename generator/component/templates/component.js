import React, { Component, PropTypes } from 'react';
import styles from 'scss/components/_<%= name %>';

const cx = classNames.bind(styles);

export default class <%= name %> extends Component {
  render() {
    return (
      <div><%= name %> component!</div>
    );
  }
}