import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react';

import { Count, Item, Topic, ScoreboardWrapper, Header, List } from '../css/components/scoreboard';

const Scoreboard = ({topics}) => {
  return useObserver(() => (
    <ScoreboardWrapper>
      <Header>Vote count</Header>
      <List>
        {topics.map((topic, key) => (
          <Item key={key}>
            <Topic>{topic.text}</Topic>
            <Count>{topic.count}</Count>
          </Item>
        ))}
      </List>
    </ScoreboardWrapper>
  ));
};

Scoreboard.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Scoreboard;
