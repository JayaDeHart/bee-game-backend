const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
app.use(cors);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const assignRole = require('./util/assignRole');

const mainLobby = io.of('/initial');

mainLobby.on('connection', (socket) => {
  socket.emit('welcome', { message: 'welcome to the main lobby!' });
});

let players = {};

io.of(/\/namespace-.+/).on('connection', (socket) => {
  insp = socket.nsp;
  inspName = socket.nsp.name;
  if (!players.hasOwnProperty(inspName)) {
    players[inspName] = [];
  }
  console.log(`welcome ${socket.id} to ${inspName}`);
  socket.on('board-state-update', (action) => {
    socket.broadcast.emit('server-state-update', action);
  });
  socket.on('join', (payload) => {
    players[inspName].push({
      id: socket.id,
      name: payload,
    });
    console.log(players);
    insp.emit('players', players[inspName]);
    //there should be no pushing on the client side. the client will simply accept the server side players array as their own. This will help avoid duplicates
  });
  socket.on('start', () => {
    //assign and send roles
  });
});

server.listen(8000, () => console.log('server running!'));
