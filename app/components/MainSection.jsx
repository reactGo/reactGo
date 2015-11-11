import React from 'react';
import TopicItem from 'components/TopicItem';
import styles from 'scss/components/_vote';

export default class MainSection extends React.Component {
  render() {
    const topics = this.props.topics ? this.props.topics.map((topic, key) => {
      return (<TopicItem id={key} key={key} text={topic.text} />);
    })
    : null;
    return (
      <div className={styles['main-section']}>
        <h3 className={styles['main-section__header']}>Vote for your favorite hack day idea</h3>
        <ul className={styles['main-section__list']}>{topics}</ul>
      </div>
    );
  }
}

MainSection.propTypes = { topics: React.PropTypes.object };
