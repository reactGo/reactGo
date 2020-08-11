import React from 'react';
import PropTypes from 'prop-types';
import { Count, Item, Topic, ScoreboardWrapper, Header, List } from '../css/components/scoreboard';

const Scoreboard = ({topics}) => {
  const topicListItems = topics.map((topic, key) => {
    return (
      <Item key={key}>
        <Topic>{topic.text}</Topic>
        <Count>{topic.count}</Count>
      </Item>
    );
  });
  return (
    <ScoreboardWrapper>
      <Header>Vote count</Header>
      <List>
        {topicListItems}
      </List>
    </ScoreboardWrapper>
  );
};

Scoreboard.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Scoreboard;
