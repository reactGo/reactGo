export default function loading(
  state = {
    status: false
  },
  action = {}
) {
  switch (action.type) {
    case 'loading-bar/SHOW':
      return Object.assign({}, state, {
        status: true,
      });
    case 'loading-bar/HIDE':
      return Object.assign({}, state, {
        status: false,
      });
    default:
      return state
  }
}
