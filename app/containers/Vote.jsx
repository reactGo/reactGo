import React, { Component, PropTypes } from 'react';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'scss/components/_vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  render() {
    return (
      <div className={cx('vote')}>
        <EntryBox topic={this.props.newTopic} />
        <MainSection topics={this.props.topics} />
        <Scoreboard topics={this.props.topics} />
      </div>
    );
  }
}

Vote.propTypes = {
  topics: PropTypes.array, newTopic: PropTypes.string
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

export default connect(mapStateToProps)(Vote);
