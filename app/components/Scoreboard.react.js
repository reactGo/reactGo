import React from 'react';
import Immutable from 'immutable';
import TopicCountItem from 'components/TopicCountItem.react';

export default class Scoreboard extends React.Component {
  render() {
    const topicListItems = this.props.topics.map((topic) => {
      return (<TopicCountItem key={topic.get('id')} title={topic.get('text')} count={topic.get('count')}/>);
    });

    return (
      <div className="scoreboard">
        <h3 className="scoreboard__header">Vote count</h3>
        <ul className="scoreboard__list">
          {topicListItems}
        </ul>
      </div>
    );
  }
}

Scoreboard.propTypes = { topics: React.PropTypes.instanceOf(Immutable.OrderedMap) };
