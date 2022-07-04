'use strict';

const { Chance } = require('chance');
const chance = new Chance();
const SanfranClient = require('./client');
const vendorPort = new SanfranClient('vendorPort');

vendorPort.subscribe('CARGO_ORDER', payload => {
  setTimeout(() => {
    let 
    console.log(`SF-Port: received order ${payload.orderId} from London`);
    vendorPort.publish('CARGO_READY', payload);
  }, 3000);
});