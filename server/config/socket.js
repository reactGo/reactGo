import socket from 'socket.io';
import {
  addUser,
  removeAUser,
  getUserList
} from './chat';

export default (server) => {

  const io = socket.listen(server);
  let numUsers = 0;


  io.sockets.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'

      /// remove socket.broadcast.emit
      // because I want this messgae to come back to myself
      socket.emit('new message', {
        username: socket.username,
        message: data
      });

      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
      console.log('SERVER ADD USER ##');


      console.log('username', username, addedUser);
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      addUser(username);
      socket.emit('login', {
        //username: socket.username,
        users:getUserList()
      });



      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });

    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      console.log('DISCONNECT!!!');
      if (addedUser) {
        --numUsers;

        removeAUser(socket.username);
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });

  });
};
