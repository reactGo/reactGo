import React from 'react';
import { useObserver } from 'mobx-react';

import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import { VoteWrapper } from '../css/components/vote';
import useStore from '../useStore';

const Vote = () => {
  const { topicStore } = useStore();

  return useObserver(() => (
    <VoteWrapper>
      <EntryBox
        topic={topicStore.newTopic}
        onEntryChange={topicStore.typing}
        onEntrySave={topicStore.createTopic}
      />
      <MainSection
        topics={topicStore.topics}
        onIncrement={topicStore.incrementCount}
        onDecrement={topicStore.decrementCount}
        onDestroy={topicStore.destroyTopic}
      />
      <Scoreboard topics={topicStore.topics} />
    </VoteWrapper>
  ));
};

export default Vote;
