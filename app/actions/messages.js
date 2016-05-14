/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types/message';

export function showMessage(
  style = 'error',
  text = 'YOU MAY FORGOT TO PASS TEXT THROUGH!'
) {
  return {
    type: types.SHOW_MESSAGE,
    style: style,
    text: text
  };
}

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}
