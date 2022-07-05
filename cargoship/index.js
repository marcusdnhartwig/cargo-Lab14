'use strict';

const ShipClient = require('./cargo');
const cargoShip = new ShipClient('cargoship');

cargoShip.subscribe('CARGO_READY', payload => {
  setTimeout(() => {
    console.log(`Cargo order# ${payload.orderId} picked up.`);
    cargoShip.publish('IN_TRANSIT', payload);
  }, 3000);
});

cargoShip.subscribe('IN_TRANSIT', payload => {
  setTimeout(() => {
    console.log(`Cargo order# ${payload.orderId} has been delivered to Hong Kong.`);
    cargoShip.publish('DELIVERED', payload);
  }, 3000);
});

cargoShip.subscribe('THANK_YOU', payload => {
  setTimeout(() => {
    console.log(`Message from SF Port: Thank you for delivering cargo order# ${payload.orderId}.`);
  }, 3000);
});

