// const express = require('express');
// const app = express();
// const io = require('socket.io')(app);
// const http = require('http').Server(app);

const http = require('http');
const express = require('express');
const app = module.exports.app = express();

const server = http.createServer(app);
const io = require('socket.io').listen(server);
server.listen(5000);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

io.on('connection', function (socket) {
  console.log('User connected');

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

  socket.emit('news', { hello: 'world' });

  socket.on('news', function (data) {
    console.log(data);

    socket.emit('news', { text: 'NEW NEWS!', data });
  });

});

// http.listen(5000, () => {
//   console.log('started on port 5000');
// });
