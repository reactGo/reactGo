import * as types from '../types/message';

/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
export default function message(
  state = {style: '', text: ''},
  action = {}
) {
  switch (action.type) {
    case types.SHOW_MESSAGE:
      return Object.assign({}, state, {
        style: action.style,
        text: action.text
      });
    case types.DISMISS_MESSAGE:
      return Object.assign({}, state, {
        style: '',
        text: ''
      });
    default:
      return state;
  }
}
