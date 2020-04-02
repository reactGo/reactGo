import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const TopicTextForm = ({
  onEntrySave, onEntryChange, value, className, placeholder,
}) => {
  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  const onSave = useCallback(() => {
    onEntrySave(value);
  }, [value]);

  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   * @param  {object} event
   */
  const onChange = useCallback((event) => {
    onEntryChange(event.currentTarget.value);
  }, []);

  /*
   * Be careful that value is a dependency for onSave function!
   * @param  {object} event
   */
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    onSave();
  }, [value]);

  return (
    <form onSubmit={onSubmit}>
      <input
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus
      />
    </form>
  );
};

TopicTextForm.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onEntrySave: PropTypes.func,
  onEntryChange: PropTypes.func,
};

TopicTextForm.defaultProps = {
  placeholder: '',
  value: '',
  onEntrySave: () => {},
  onEntryChange: () => {},
};

export default TopicTextForm;
