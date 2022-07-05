'use strict';

const HongKongClient = require('./client');
const { Chance } = require('chance');
const chance = new Chance();
const portHK = new HongKongClient('portHK');

// setInterval(() => {
const order = {
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
};
portHK.publish('CARGO_ORDER', {portId: chance.guid(), ...order});
console.log(`Hong Kong port placed order ${order.orderId}`);
// }, 3000);

portHK.subscribe('DELIVERED', (payload) => {
  setTimeout(() => {
    console.log(`Hong Kong port received order ${payload.orderId}`);
    portHK.publish('THANK_YOU', payload);
  }, 3000);
});