import React from 'react';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { connect } from 'react-redux';
import styles from 'scss/components/_vote';

class Vote extends React.Component {

  render() {
    return (
      <div className={styles.vote}>
        <EntryBox topic={this.props.newTopic} />
        <MainSection topics={this.props.topics} />
        <Scoreboard topics={this.props.topics} />
      </div>
    );
  }
}

Vote.propTypes = {
  topics: React.PropTypes.object, newTopic: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

export default connect(mapStateToProps)(Vote);
