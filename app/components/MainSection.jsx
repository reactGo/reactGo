import React from 'react';

import TopicItem from './TopicItem';
import { Header, List, MainSectionWrapper } from '../css/components/mainSection';

const MainSection = ({
 topics, onIncrement, onDecrement, onDestroy
}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <TopicItem
        index={key}
        id={topic.id}
        key={key}
        text={topic.text}
        incrementCount={onIncrement}
        decrementCount={onDecrement}
        destroyTopic={onDestroy} />
);
  });

  return (
    <MainSectionWrapper>
      <Header>Vote for your favorite hack day idea</Header>
      <List>{topicItems}</List>
    </MainSectionWrapper>
  );
};

export default MainSection;
