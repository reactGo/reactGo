import React, { FC } from 'react';
import { Topic } from '../reducers/topic';

import TopicItem from './TopicItem';
import { Header, List, MainSectionWrapper } from '../css/components/mainSection';

interface Props {
  topics: Topic[],
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onDestroy: (id: string) => void,
}
const MainSection: FC<Props> = ({
                                  topics, onIncrement, onDecrement, onDestroy
                                }) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <TopicItem
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
