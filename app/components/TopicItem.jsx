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
    const { id, onIncrement } = this.props;
    onIncrement(id);
  }

  onDecrement() {
    const { id, onDecrement } = this.props;
    onDecrement(id);
  }

  onDestroyClick() {
    const { id, onDestroy } = this.props;
    onDestroy(id) ;
  }

  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.text}</span>
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
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};
