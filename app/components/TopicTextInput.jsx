import React from 'react';
const ENTER_KEY_CODE = 13;

/*
 * Code modified from https://github.com/facebook/flux/blob/master/examples/flux-todomvc/js/components/TopicTextInput.react.js
 */
export default class TopicTextInput extends React.Component {
  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _onSave = () => {
    this.props.onSave(this.props.value);
  }

  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  /*
   * @param  {object} event
   */
  _onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onSave();
    }
  }

  render() {
    return (
      <input className={this.props.className} placeholder={this.props.placeholder} onChange={this._onChange}
        onKeyDown={this._onKeyDown} value={this.props.value}
        autoFocus={true} />
    );
  }
}

TopicTextInput.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  onSave: React.PropTypes.func,
  onChange: React.PropTypes.func
};
