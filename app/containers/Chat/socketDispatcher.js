


const log = (message, options) =>{
  var $el = $('<li>').addClass('log').text(message);
  addMessageElement($el, options);
};



const addParticipantsMessage = (data) => {
  var message = '';
  if (data.numUsers === 1) {
    message += "there's 1 participant";
  } else {
    message += "there are " + data.numUsers + " participants";
  }
  log(message);
};

function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
}

export default (dispatch) => {

  let connected = false;
  let socket = io();

  socket.on('login', function (data) {
    console.log('SOME ONE LOGGED ON', data);
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
    //addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    //log(data.username + ' joined');
    console.log('ON USER JOINED', data);
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
