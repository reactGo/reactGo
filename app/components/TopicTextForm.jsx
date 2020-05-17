import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react';

import useStore from '../useStore';

const TopicTextForm = ({ className, placeholder }) => {
  const { topicStore } = useStore();
  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   * @param  {object} event
   */
  const onChange = useCallback((event) => {
    topicStore.typing(event.currentTarget.value);
  }, []);

  /*
   * Be careful that value is a dependency for onSave function!
   * @param  {object} event
   */
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    topicStore.createTopic(topicStore.newTopic);
  }, [topicStore.newTopic]);

  return useObserver(() => (
    <form onSubmit={onSubmit}>
      <input
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={topicStore.newTopic}
        autoFocus
      />
    </form>
  ));
};

TopicTextForm.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

TopicTextForm.defaultProps = {
  placeholder: '',
};

export default TopicTextForm;
