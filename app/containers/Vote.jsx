import React from 'react';

import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import { VoteWrapper } from '../css/components/vote';
import useStore from '../useStore';

const Vote = () => {
  const {
    topicStore: {
      topics, newTopic, typing, createTopic, incrementCount, decrementCount, destroyTopic,
    },
  } = useStore();

  return (
    <VoteWrapper>
      <EntryBox
        topic={newTopic}
        onEntryChange={typing}
        onEntrySave={createTopic}
      />
      <MainSection
        topics={topics}
        onIncrement={incrementCount}
        onDecrement={decrementCount}
        onDestroy={destroyTopic}
      />
      <Scoreboard topics={topics} />
    </VoteWrapper>
  );
};

export default Vote;
