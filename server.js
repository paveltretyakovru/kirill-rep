const express = require('express');
const app = express();
const io = require('socket.io')(app);
const http = require('http').Server(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

io.on('connection', function (socket) {
  console.log('User connected');

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

});

http.listen(5000, () => {
  console.log('started on port 5000');
});
