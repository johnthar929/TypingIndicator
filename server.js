const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
    cors: {
        origin: "*", // <-- your website domain
        methods: ["GET", "POST"]
    }
});


app.get('/', (req, res) => {
  res.send('Socket.IO Server running!');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('typing', (username) => {
    console.log(username + ' is typing');
    socket.broadcast.emit('typing', username);
  });

  socket.on('stop typing', (username) => {
    console.log(username + ' stopped typing');
    socket.broadcast.emit('stop typing', username);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
