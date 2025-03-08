const { Socket } = require('socket.io');
const app = require('./src/app')

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', Socket => {
  console.log('a user connected');

  Socket.on('disconnect',() =>{
    console.log('a user disconnected');
  })

  Socket.on('some-event',(msg) =>{
    console.log(msg);
    console.log("some-event received");
  })
});

server.listen(3000,() =>{
    console.log('Server is running on port 3000')
})


