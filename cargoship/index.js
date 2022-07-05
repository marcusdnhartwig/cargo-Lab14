'use strict';

const ShipClient = require('./cargo');
const ship = new ShipClient('ship');

ship.subscribe('CARGO_READY', payload => {
  setTimeout(() => {
    console.log(`Cargo ${payload.orderId} picked up.`);
    ship.publish('IN_TRANSIT', payload);
  }, 3000);
});

ship.subscribe('IN_TRANSIT', payload => {
  setTimeout(() => {
    console.log(`Cargo ${payload.orderId} has been delivered to ${payload.address}.`);
    ship.publish('DELIVERED', payload);
  });
});