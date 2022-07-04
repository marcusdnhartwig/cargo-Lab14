'use strict';

const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000/cargo';
// require('dotenv').config();

class ShipClient {
  constructor(queueId) {
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('JOIN', id => {
      console.log('Joined Client Queue!', id);
    });
  };

  publish(event, payload) {
    this.socket.emit(event, {queueId: this.queueId, ...payload})
  };

  subscribe(event, callback) {
    this.socket.on(event, callback);
  };
};

module.exports = ShipClient;

// cargoConnection.on('PICKUP', cargoPickup);

// function cargoPickedUp(payload) {
//   setTimeout(() => {
//     console.log(`Package was PICKED_UP. Order ${payload}`);
//     cargoConnection.emit('IN_TRANSIT', payload);
//   }, 2000);
// };

// cargoConnection.on('IN_TRANSIT', cargoTransit);

// function cargoTransit(payload) {
//   setTimeout(() => {
//     console.log(`Package in TRANSIT. Order ${payload}`);
//     cargoConnection.emit('DELIVERED', payload);
//   }, 2000);
// };

// cargoConnection.on('DELIVERED', cargoDelivered);

// function cargoDelivered(payload) {
//   setTimeout(() => {
//     cargoConnection.log(`Package DELIVERED. Order ${payload}`);
//   }, 2000);
// };

// module.exports = {
//   cargoPickedUp,
//   cargoTransit,
//   cargoDelivered,
// };
