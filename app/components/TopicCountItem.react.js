import React from 'react';

export default class TopicCountItem extends React.Component {
  render() {
    return (
      <li className="scoreboard__list-item" key={this.props.key}>
        <span className="scoreboard__topic">{this.props.title}</span>
        <span className="scoreboard__count">{this.props.count}</span>
      </li>
    );
  }
}

TopicCountItem.propTypes = {
  key: React.PropTypes.string,
  title: React.PropTypes.string,
  count: React.PropTypes.number
};
