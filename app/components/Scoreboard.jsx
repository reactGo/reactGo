import React, { Component, PropTypes } from 'react';
import TopicCountItem from 'components/TopicCountItem';

import styles from 'scss/components/_vote';

export default class Scoreboard extends Component {
  render() {
    const topicListItems = this.props.topics.map((topic, key) => {
      return (<TopicCountItem key={key} title={topic.text} count={topic.count}/>);
    });
    return (
      <div className={styles.scoreboard}>
        <h3 className={styles.scoreboard__header}>Vote count</h3>
        <ul className={styles.scoreboard__list}>
          {topicListItems}
        </ul>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  topics: PropTypes.array.isRequired
};
