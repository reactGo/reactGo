import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class TopicItem extends Component {
  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onIncrement() {
    const { topic, index, onIncrement } = this.props;
    onIncrement(topic._id, index);
  }

  onDecrement() {
    const { topic, index, onDecrement } = this.props;
    onDecrement(topic._id, index);
  }

  onDestroyClick() {
    const { topic, onDestroy } = this.props;
    onDestroy(topic._id);
  }

  render() {
    return (
      <li className={cx('topic-item')}>
        <span className={cx('topic')}>{this.props.topic.text}</span>
        <button className={
          cx('button', 'increment')
        } onClick={this.onIncrement}>+</button>
        <button className={
          cx('button', 'decrement')
        } onClick={this.onDecrement}>-</button>
        <button className={
          cx('button', 'destroy')
        } onClick={this.onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

TopicItem.propTypes = {
  index: PropTypes.number.isRequired,
  topic: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};
