import * as actions from 'actions/chat';


export default (dispatch) => {

  let connected = false;
  let socket = io();

  socket.on('login', function (data) {
    console.log('SOME ONE LOGGED ON', data);
    let { username } = data;
    dispatch(actions.userJoined(username));
    //connected = true;
    // Display the welcome message
    //var message = "Welcome to Socket.IO Chat – ";
    // log(message, {
    //   prepend: true
    // });
    // addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    console.log('SOMONE SENT A MESSGE NEW MESSAGE', data);
    dispatch(actions.receiveChat(data));
    //addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    //log(data.username + ' joined')
    console.log('ON USER JOINED', data);
    dispatch(actions.userJoined(data.username));
    //addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    console.log('ON USER LEFT', data);
    //log(data.username + ' left');
    //addParticipantsMessage(data);
    //removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    console.log('ON TYPING', data);
    //addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    console.log('ON STOP TYPING', data);
    //removeChatTyping(data);
  });

  return socket;
}
