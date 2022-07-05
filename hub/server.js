'use strict';

// require('dotenv').config();

const { Server } = require('socket.io');
const PORT = 3000 || 3001;
const Queue = require('./lib/queue');

const server = new Server(PORT);
const cargo = server.of('/cargo');
const cargoQueue = new Queue();

cargo.on('connection', socket => {
  console.log('Joined the cargo namespace', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  });

  socket.on('JOIN', queueId => {
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('CARGO_ORDER', payload => {
    let currentQueue = cargoQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = cargoQueue.store(payload.queueId, new Queue());
      currentQueue = cargoQueue.read(queueKey);
    }
    currentQueue.store(payload.cargoId, payload);
    cargo.emit('CARGO_ORDER', payload);
  });

  socket.on('CARGO_READY', payload => {
    let currentQueue = cargoQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = cargoQueue.store(payload.queueId, new Queue());
      currentQueue = cargoQueue.read(queueKey);
    }
    currentQueue.store(payload.cargoId, payload);
    cargo.emit('CARGO_READY', payload);
  });

  socket.on('IN_TRANSIT', payload => {
    let currentQueue = cargoQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = cargoQueue.store(payload.queueId, new Queue());
      currentQueue = cargoQueue.read(queueKey);
    }
    currentQueue.store(payload.cargoId, payload);
    cargo.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', payload => {
    let currentQueue = cargoQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = cargoQueue.store(payload.queueId, new Queue());
      currentQueue = cargoQueue.read(queueKey);
    }
    currentQueue.store(payload.cargoId, payload);
    cargo.emit('DELIVERED', payload);
  });

})

//--------------------------------------------------------------------
// require('dotenv').config;

// const IO_PORT = process.env.PORT || 3000;
// const io = require('socket.io')(IO_PORT);
// const hub = io.of('/hub');

// io.on('connection', socket => {
//     console.log('client:', socket.id);
// });

// hub.on('connection', socket => {
//     socket.on('join', room => {
//         console.log('rooom name:', room);
//         socket.join(room);
//     });
//     socket.on('pickup', payload => {
//         logger('pickup', payload);
//         hub.emit('pickup', payload);
//     });
//     socket.on('in-transit', payload => {
//         logger('in-transit', payload);
//         hub.emit('in-transit', payload);
//     });
//     socket.on('delivered', payload => {
//         logger('delivered', payload);
//         hub.to(payload.store).emit('delivered', payload);
//         hub.emit('delivered', payload);
//     });
// });

// function logger(event, payload){
//     let time = new Date();
//     console.log('event:', {event, time, payload});
// }

