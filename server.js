const express = require('express');
const app = express();
const http = require('http');
const path = require('path'); // Import the 'path' module
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve static files from the 'public' directory (best practice)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Construct the absolute path to index.html
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast to all connected clients
    console.log('message: ' + msg);
  });
});

const port = process.env.PORT || 3000; // Use environment variable or default

server.listen(port, () => {  // Listen on the dynamically assigned PORT
  console.log(`listening on *:${port}`);
});