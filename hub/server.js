'use strict';

require('dotenv').config();

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

  socket.on('THANK_YOU', payload => {
    let currentQueue = cargoQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = cargoQueue.store(payload.queueId, new Queue());
      currentQueue = cargoQueue.read(queueKey);
    }
    currentQueue.store(payload.cargoId, payload);
    cargo.emit('THANK_YOU', payload);
  });

  // socket.on('RECEIVED', payload => {
  //   let currentQueue = cargoQueue.read(payload.queueId);
  //   if(!currentQueue){
  //     throw new Error('No queue created for this cargo');
  //   }
  //   let cargo = currentQueue.remove(payload.cargoId);
  //   cargo.to(payload.queueId).emit('RECEIVED', cargo);
  // });
});


