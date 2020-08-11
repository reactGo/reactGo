import React from 'react';
import PropTypes from 'prop-types';

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

MainSection.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default MainSection;
