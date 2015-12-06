import React, { Component, PropTypes } from 'react';
const ENTER_KEY_CODE = 13;

export default class TopicTextInput extends Component {
  constructor(props) {
    super(props);
    this._onSave = this._onSave.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _onSave() {
    this.props.onSave(this.props.value);
  }

  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _onChange(event) {
    this.props.onChange(event.target.value);
  }

  /*
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onSave();
    }
  }

  render() {
    const { className, placeholder, value } = this.props;
    return (
      <input className={className}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={value}
        autoFocus={true} />
    );
  }
}

TopicTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func
};
