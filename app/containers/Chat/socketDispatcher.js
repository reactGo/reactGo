import * as actions from 'actions/chat';


export default (dispatch) => {

  let connected = false;
  let socket = io();

  socket.on('login', function (data) {
    let { users } = data;
    dispatch(actions.addUserList(users));
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    dispatch(actions.receiveChat(data));
    //addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    dispatch(actions.addNewUser(data.username));
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    dispatch(actions.removeUser(data.username));
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    console.log('ON TYPING', data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    console.log('ON STOP TYPING', data);
    //removeChatTyping(data);
  });

  return socket;
}
