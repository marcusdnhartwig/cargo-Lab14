'use strict';

const SanfranClient = require('./client');
const portSF = new SanfranClient('portSF');

portSF.subscribe('CARGO_ORDER', payload => {
  setTimeout(() => {
    console.log(`San Francisco port received cargo order# ${payload.orderId} from Hong Kong`);
    portSF.publish('CARGO_READY', payload);

  }, 3000);
});

portSF.subscribe('DELIVERED', payload => {
  setTimeout(() => {
    console.log(`Message from Cargo Ship: Cargo order# ${payload.orderId} has been delivered to Hong Kong`);
    portSF.publish('THANK_YOU', payload);
  }, 3000);

  portSF.subscribe('RECEIVED', payload => {
    setTimeout(() => {
      console.log(`Client received order# ${payload.orderId}.`);
    }, 3000);
  });
});