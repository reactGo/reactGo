import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { wrap } from 'react-stateless-wrapper';
import MainSection from 'components/MainSection';
import TopicItem from 'components/TopicItem';

let WrappedMainSection = wrap(MainSection);

describe('MainSection', () => {
  let result;
  let topicItems;
  const topicItemData = {
    text: '',
    id: '',
    index: 0,
    onIncrement: () => {},
    onDecrement: () => {},
    onDestroy: () => {}
  };
  const stubFunctions = {
    onIncrement: () => {},
    onDecrement: () => {},
    onDestroy: () => {}
  };
  const topics = [topicItemData];

  describe('Has topics', () => {
    it('should render TopicItems', () => {
      result = ReactTestUtils.renderIntoDocument(<WrappedMainSection topics={topics} {...stubFunctions} />);
      topicItems = ReactTestUtils.scryRenderedComponentsWithType(result, TopicItem);
      expect(topicItems.length).toBe(1);
    });
  });

  describe('Does not have topics', () => {
    it('should not render TopicItems', () => {
      result = ReactTestUtils.renderIntoDocument(<WrappedMainSection topics={[]} {...stubFunctions} />);
      topicItems = ReactTestUtils.scryRenderedComponentsWithType(result, TopicItem);
      expect(topicItems.length).toBe(0);
    });
  });
});
