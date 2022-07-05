'use strict';

const HongKongClient = require('./client');
const portHK = new HongKongClient('portHK');
const { Chance } = require('chance');
const chance = new Chance();

setTimeout(() => {
const order = {
  orderId: chance.guid(),
  company: chance.company(),
};
portHK.publish('CARGO_ORDER', {portId: chance.guid(), ...order});
console.log(`Hong Kong port placed order# ${order.orderId}`);
}, 3000);

portHK.subscribe('IN_TRANSIT', payload => {
  setTimeout(() => {
    console.log(`Cargo order# ${payload.orderId} is on the way.`);
  }, 3000);
});

portHK.subscribe('DELIVERED', payload => {
  setTimeout(() => {
    console.log(`Hong Kong port received order# ${payload.orderId}`);
    portHK.publish('RECEIVED', payload);
  }, 3000);
});