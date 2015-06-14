import React from 'react';
import Immutable from 'immutable';
import TopicItem from './TopicItem.react';

export default class MainSection extends React.Component {
  render() {
    const topics = this.props.topics.map((topic) => {
      return (<TopicItem id={topic.get('id')} key={topic.get('id')} text={topic.get('text')} />);
    });
    return (
      <div className="main-section">
        <h3 className="main-section__header">Vote for your favorite hack day idea</h3>
        <ul className="main-section__list">{topics}</ul>
      </div>
    );
  }
}

MainSection.propTypes = { topics: React.PropTypes.instanceOf(Immutable.OrderedMap) };
