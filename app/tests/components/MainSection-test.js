import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainSection from 'components/MainSection';

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
      expect(mount(<MainSection topics={topicItemData} {...stubFunctions} />).find('.list li').length).toBe(1);
    });
  });

  describe('Without Topics', () => {
    it('should not render <TopicItem> list items', () => {
      expect(mount(<MainSection topics={emptyData} {...stubFunctions} />).find('.list li').length).toBe(0);
    });
  });
});
