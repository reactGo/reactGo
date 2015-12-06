import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createTopic, typing } from 'actions/topics';
import TopicTextInput from 'components/TopicTextInput';
import classNames from 'classnames/bind';
import styles from 'scss/components/_entrybox';

const cx = classNames.bind(styles);

class EntryBox extends Component {

  render() {
    const { dispatch } = this.props;
    return (
      <div className={cx('entrybox')}>
        <h1 className={cx('entrybox__header')}>Vote for your top hack idea</h1>
        <TopicTextInput
          className={cx('entrybox__input')}
          value={this.props.topic}
          placeholder="What's yer fav idea?"
          onChange={text => dispatch(typing(text))}
          onSave={text => dispatch(createTopic(text))} />
      </div>
    );
  }
}

EntryBox.propTypes = {
  topic: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect()(EntryBox);
