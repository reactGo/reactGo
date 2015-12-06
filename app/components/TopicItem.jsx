import React, { Component, PropTypes } from 'react';
import { incrementCount, decrementCount, destroyTopic } from 'actions/topics';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'scss/components/_topic-item';

const cx = classNames.bind(styles);

class TopicItem extends Component {
  constructor(props) {
    super(props);
    this._onIncrement = this._onIncrement.bind(this);
    this._onDecrement = this._onDecrement.bind(this);
    this._onDestroyClick = this._onDestroyClick.bind(this);
  }
  _onIncrement() {
    const { dispatch, id, index } = this.props;
    dispatch(incrementCount(id, index));
  }

  _onDecrement() {
    const { dispatch, id, index } = this.props;
    dispatch(decrementCount(id, index));
  }

  _onDestroyClick() {
    const { dispatch, id, index } = this.props;
    dispatch(destroyTopic(id, index));
  }

  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic-item__topic')}>{this.props.text}</span>
        <button className={
          cx('topic-item__button', 'topic-item__button--increment')
        } onClick={this._onIncrement}>+</button>
        <button className={
          cx('topic-item__button', 'topic-item__button--decrement')
        } onClick={this._onDecrement}>-</button>
        <button className={
          cx('topic-item__button', 'topic-item__button--destroy')
        } onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

TopicItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default connect()(TopicItem);
