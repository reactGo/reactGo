import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import {
 typing,
} from '../actions/topics';
import { VoteWrapper } from '../css/components/vote';
import { createTopic, decrementCount, destroyTopic, incrementCount } from '../thunks/topics';

const Vote = () => {
  const { topics, newTopic } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  const dispatchCreateTopic = (data) => dispatch(createTopic(data));
  const dispatchTyping = (data) => dispatch(typing(data));
  const dispatchIncrementCount = (data) => dispatch(incrementCount(data));
  const dispatchDecrementCount = (data) => dispatch(decrementCount(data));
  const dispatchDestroyTopic = (data) => dispatch(destroyTopic(data));

  return (
    <VoteWrapper>
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
    </VoteWrapper>
  );
};

export default Vote;
