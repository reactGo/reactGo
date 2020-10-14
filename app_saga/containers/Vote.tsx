import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import {
  createTopicRequest, decrementCountRequest, destroyTopicRequest, incrementCountRequest,
  typing,
} from '../actions/topics';
import { VoteWrapper } from '../css/components/vote';

const Vote = () => {
  const { topics, newTopic } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  const dispatchCreateTopic = (data) => dispatch(createTopicRequest(data));
  const dispatchTyping = (data) => dispatch(typing(data));
  const dispatchIncrementCount = (data) => dispatch(incrementCountRequest(data));
  const dispatchDecrementCount = (data) => dispatch(decrementCountRequest(data));
  const dispatchDestroyTopic = (data) => dispatch(destroyTopicRequest(data));

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
