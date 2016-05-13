/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types/message';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}
