import React from 'react';
import PropTypes from 'prop-types';

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

TopicItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired
};

export default TopicItem;
