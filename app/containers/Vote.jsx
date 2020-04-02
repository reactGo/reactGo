import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import {
 createTopic, typing, incrementCount, decrementCount, destroyTopic,
} from '../actions/topics';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

const Vote = () => {
  const { topics, newTopic } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  const dispatchCreateTopic = (data) => dispatch(createTopic(data));
  const dispatchTyping = (data) => dispatch(typing(data));
  const dispatchIncrementCount = (data) => dispatch(incrementCount(data));
  const dispatchDecrementCount = (data) => dispatch(decrementCount(data));
  const dispatchDestroyTopic = (data) => dispatch(destroyTopic(data));

  return (
    <div className={cx('vote')}>
      <EntryBox
        topic={newTopic}
        onEntryChange={dispatchTyping}
        onEntrySave={dispatchCreateTopic}
      />
      <MainSection
        topics={topics}
        onIncrement={dispatchIncrementCount}
        onDecrement={dispatchDecrementCount}
        onDestroy={dispatchDestroyTopic}
      />
      <Scoreboard topics={topics} />
    </div>
  );
};

export default Vote;
