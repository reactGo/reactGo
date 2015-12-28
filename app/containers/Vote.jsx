import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { incrementCount, decrementCount, destroyTopic } from 'actions/topics';
import styles from 'scss/components/_vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
  }

  onIncrement(id, index) {
    const { dispatch } = this.props;
    dispatch(incrementCount(id, index));
  }

  onDecrement(id, index) {
    const { dispatch } = this.props;
    dispatch(decrementCount(id, index));
  }

  onDestroy(id, index) {
    const { dispatch } = this.props;
    dispatch(destroyTopic(id, index));
  }

  render() {
    return (
      <div className={cx('vote')}>
        <EntryBox topic={this.props.newTopic} />
        <MainSection topics={this.props.topics}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
          onDestroy={this.onDestroy} />
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

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Vote);
