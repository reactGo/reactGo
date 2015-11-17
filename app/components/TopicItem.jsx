import React from 'react';
import { incrementCount, decrementCount, destroyTopic } from 'redux/actions/topics';
import { connect } from 'react-redux';
import styles from 'scss/components/_vote';

class TopicItem extends React.Component {
  _onIncrement = () => {
    this.props.dispatch(incrementCount(this.props.id, this.props.index));
  }

  _onDecrement = () => {
    this.props.dispatch(decrementCount(this.props.id, this.props.index));
  }

  _onDestroyClick = () => {
    this.props.dispatch(destroyTopic(this.props.id, this.props.index));
  }

  render() {
    return (
      <li className={styles['topic-item']} key={this.props.id}>
        <span className={styles['topic-item__topic']}>{this.props.text}</span>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--increment']} onClick={this._onIncrement}>+</button>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--decrement']} onClick={this._onDecrement}>-</button>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--destroy']} onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

TopicItem.propTypes = {
  text: React.PropTypes.string,
  id: React.PropTypes.string,
  dispatch: React.PropTypes.fun
};

export default connect()(TopicItem);
