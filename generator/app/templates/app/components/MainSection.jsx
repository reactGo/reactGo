import React, { Component, PropTypes } from 'react';
import TopicItem from 'components/TopicItem';
import classNames from 'classnames/bind';
import styles from 'scss/components/_main-section';

const cx = classNames.bind(styles);

export default class MainSection extends Component {
  render() {
    // Passing down the callback functions from props to each <TopicItem>
    const { onIncrement, onDecrement, onDestroy } = this.props;
    const topics = this.props.topics ? this.props.topics.map((topic, key) => {
      return (
      <TopicItem index={key}
        id={topic.id}
        key={key}
        text={topic.text}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDestroy={onDestroy} />);
    })
    : null;
    return (
      <div className={cx('main-section')}>
        <h3 className={cx('main-section__header')}>Vote for your favorite hack day idea</h3>
        <ul className={cx('main-section__list')}>{topics}</ul>
      </div>
    );
  }
}

MainSection.propTypes = {
  topics: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};
