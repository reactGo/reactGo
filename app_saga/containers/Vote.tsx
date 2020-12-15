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
import { RootState } from '../reducers';
import { Topic } from '../reducers/topic';

const Vote = () => {
  const { topics, newTopic } = useSelector((state: RootState) => state.topic);
  const dispatch = useDispatch();
  const dispatchCreateTopic = (data: string) => dispatch(createTopicRequest(data));
  const dispatchTyping = (data: string) => dispatch(typing(data));
  const dispatchIncrementCount = (data: string) => dispatch(incrementCountRequest(data));
  const dispatchDecrementCount = (data: string) => dispatch(decrementCountRequest(data));
  const dispatchDestroyTopic = (data: string) => dispatch(destroyTopicRequest(data));

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
