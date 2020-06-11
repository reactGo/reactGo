import React from 'react';

import { Decrement, Destroy, Increment, Topic, TopicItemWrapper } from '../css/components/topicItem';

const TopicItem = ({
 text, id, incrementCount, decrementCount, destroyTopic
}) => {
  const onIncrement = () => {
    incrementCount(id);
  };
  const onDecrement = () => {
    decrementCount(id);
  };
  const onDestroy = () => {
    destroyTopic(id);
  };

  return (
    <TopicItemWrapper key={id}>
      <Topic>{text}</Topic>
      <Increment
        type="button"
        onClick={onIncrement}>
        +
      </Increment>
      <Decrement
        type="button"
        onClick={onDecrement}>
        -
      </Decrement>
      <Destroy
        type="button"
        onClick={onDestroy}>
        {String.fromCharCode(215)}
      </Destroy>
    </TopicItemWrapper>
  );
};

export default TopicItem;
