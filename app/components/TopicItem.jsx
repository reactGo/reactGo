import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'scss/components/_topic-item';

const cx = classNames.bind(styles);

export default class TopicItem extends Component {
  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onIncrement() {
    const { id, index, onIncrement } = this.props;
    onIncrement(id, index);
  }

  onDecrement() {
    const { id, index, onDecrement } = this.props;
    onDecrement(id, index);
  }

  onDestroyClick() {
    const { id, index, onDestroy } = this.props;
    onDestroy(id, index);
  }

  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic-item__topic')}>{this.props.text}</span>
        <button className={
          cx('topic-item__button', 'topic-item__button--increment')
        } onClick={this.onIncrement}>+</button>
        <button className={
          cx('topic-item__button', 'topic-item__button--decrement')
        } onClick={this.onDecrement}>-</button>
        <button className={
          cx('topic-item__button', 'topic-item__button--destroy')
        } onClick={this.onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
};

TopicItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
