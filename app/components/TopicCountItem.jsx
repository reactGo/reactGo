import React from 'react';

import styles from 'scss/components/_vote';

export default class TopicCountItem extends React.Component {
  render() {
    return (
      <li className={styles['scoreboard__list-item']} key={this.props.key}>
        <span className={styles.scoreboard__topic}>{this.props.title}</span>
        <span className={styles.scoreboard__count}>{this.props.count}</span>
      </li>
    );
  }
}

TopicCountItem.propTypes = {
  key: React.PropTypes.string,
  title: React.PropTypes.string,
  count: React.PropTypes.number
};
