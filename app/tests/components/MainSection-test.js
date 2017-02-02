import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainSection from '../../components/MainSection';
import TopicItem from '../../components/TopicItem';

const emptyData = [];
const topicItemData = [{
  text: '',
  id: '',
  index: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
}];
const stubFunctions = {
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
};

describe('<MainSection />', () => {
  describe('With Topics', () => {
    it('should render <TopicItem> list items', () => {
      expect(mount(<MainSection topics={topicItemData} {...stubFunctions} />).find(TopicItem).length).toBe(1);
    });
  });

  describe('Without Topics', () => {
    it('should not render <TopicItem> list items', () => {
      expect(mount(<MainSection topics={emptyData} {...stubFunctions} />).find(TopicItem).length).toBe(0);
    });
  });
});
