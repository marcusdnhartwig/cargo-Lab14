'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/hub');
const portCity = 'london';
const portDestination = 'hong kong' || 'sanfrancisco';

// I think we can add the API here somewhere.

socket.on('pickup', portPickup);
function portPickup(payload) {
    setTimeout(() => {
        console.log(`from port city: ${payload.portCity} shipment is ready`);
    }, 5000);
}

socket.on('delivered', destinedPort);
function destinedPort(payload) {
    setTimeout(() => {
        console.log(`Thank you for delivering ${payload.orderId}`);
    }, 1000);
}

const room = portCity;
socket.emit('join', room)

setInterval(() => {
    let order = {
        portCity: portCity,
        orderId: 1,// I think we can refer to the API here?
        portDestination: portDestination, 
    };
    hubServer.emit('pickup', {
        event: 'pickup',
        time: new Date().toISOString(),
        departurePort: portCity,
        portDestination: portDestination,
        order: order,
    });
}, 5000);

// hubServer.on('delivered', (payload) => {
//     if(payload.departurePort === portCity){
//         console.log(`**** was delivered ${payload.order.orderId}`);
//         hubServer.emit('received', payload);
//     }
// });
