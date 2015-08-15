import React from 'react';
import Immutable from 'immutable';
import TopicCountItem from 'components/TopicCountItem';

import styles from 'scss/components/_vote';

export default class Scoreboard extends React.Component {
  render() {
    const topicListItems = this.props.topics.toKeyedSeq().map((topic, key) => {
      return (<TopicCountItem key={key} title={topic.get('text')} count={topic.get('count')}/>);
    }).toArray();
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

Scoreboard.propTypes = { topics: React.PropTypes.instanceOf(Immutable.OrderedMap) };
