'use strict';

const { io } = require('socket.io-client');
// const socket = io('http://localhost3001/cargo');
const HOST = process.env.HOST || 'http://localhost:3001';
const cargoConnection = io.connect(`${HOST}/cargo`);

cargoConnection.on('PICKUP', cargoPickup);

function cargoPickedUp(payload) {
  setTimeout(() => {
    console.log(`Package was PICKED_UP. Order ${payload}`);
    cargoConnection.emit('IN_TRANSIT', payload);
  }, 2000);
};

cargoConnection.on('IN_TRANSIT', cargoTransit);

function cargoTransit(payload) {
  setTimeout(() => {
    console.log(`Package in TRANSIT. Order ${payload}`);
    cargoConnection.emit('DELIVERED', payload);
  }, 2000);
};

cargoConnection.on('DELIVERED', cargoDelivered);

function cargoDelivered(payload) {
  setTimeout(() => {
    cargoConnection.log(`Package DELIVERED. Order ${payload}`);
  }, 2000);
};

module.exports = {
  cargoPickedUp,
  cargoTransit,
  cargoDelivered,
};
