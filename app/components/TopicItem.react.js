import React from 'react';
import TopicActions from 'actions/TopicActions';

export default class TopicItem extends React.Component {
  _onIncrement = () => {
    TopicActions.increment(this.props.id);
  }

  _onDecrement = () => {
    TopicActions.decrement(this.props.id);
  }

  _onDestroyClick = () => {
    TopicActions.destroy(this.props.id);
  }

  render() {
    return (
      <li className="topic-item" key={this.props.id}>
        <span className="topic-item__topic">{this.props.text}</span>
        <button className="topic-item__button topic-item__button--increment" onClick={this._onIncrement}>+</button>
        <button className="topic-item__button topic-item__button--decrement" onClick={this._onDecrement}>-</button>
        <button className="topic-item__button topic-item__button--destroy" onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

TopicItem.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string
};
