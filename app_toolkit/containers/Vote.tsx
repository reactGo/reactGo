import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import {
 createTopic, incrementCount, decrementCount, destroyTopic,
} from '../actions/topics';
import { VoteWrapper } from '../css/components/vote';
import { RootState } from '../reducers';
import { newTopicSlice } from '../reducers/topic';

const Vote = () => {
  const { topics, newTopic } = useSelector<RootState, RootState['topic']>((state) => state.topic);
  const dispatch = useDispatch();
  const dispatchCreateTopic = (data: string) => dispatch(createTopic(data));
  const dispatchTyping = (data: string) => dispatch(newTopicSlice.actions.typing(data));
  const dispatchIncrementCount = (data: string) => dispatch(incrementCount(data));
  const dispatchDecrementCount = (data: string) => dispatch(decrementCount(data));
  const dispatchDestroyTopic = (data: string) => dispatch(destroyTopic(data));

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
