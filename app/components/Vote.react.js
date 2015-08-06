import React from 'react';

import EntryBox from 'components/EntryBox.react';
import MainSection from 'components/MainSection.react';
import Scoreboard from 'components/Scoreboard.react';

import styles from 'scss/components/_vote';

export default class Vote extends React.Component {

  render() {
    return (
      <div className={styles.vote}>
        <EntryBox topic={this.props.TopicStore.newTopic} />
        <MainSection topics={this.props.TopicStore.topics} />
        <Scoreboard topics={this.props.TopicStore.topics} />
      </div>
    );
  }
}

Vote.propTypes = {
  TopicStore: React.PropTypes.object
};
