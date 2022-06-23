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

const dns = io.of(/namespace-.+/);

dns.on('connection', (socket) => {
  let players = [];
  console.log(socket.id);
  console.log(socket.nsp);
  socket.on('board-state-update', (action) => {
    console.log(action);
    dns.emit('server-state-update', action);
  });
  socket.on('join', (payload) => {
    players.push(payload);
    dns.emit('join', payload);
  });
  socket.on('start', () => {
    const roles = assignRole(players);
    console.log(roles);
    io.emit('setRoles', roles);
  });
});

server.listen(8000, () => console.log('server running!'));
