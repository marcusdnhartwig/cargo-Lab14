'use strict';

require('dotenv').config;

const IO_PORT = process.env.PORT || 3000;
const io = require('socket.io')(IO_PORT);
const hub = io.of('/hub');

io.on('connection', socket => {
    console.log('client:', socket.id);
});

hub.on('connection', socket => {
    socket.on('join', room => {
        console.log('rooom name:', room);
        socket.join(room);
    });
    socket.on('pickup', payload => {
        logger('pickup', payload);
        hub.emit('pickup', payload);
    });
    socket.on('in-transit', payload => {
        logger('in-transit', payload);
        hub.emit('in-transit', payload);
    });
    socket.on('delivered', payload => {
        logger('delivered', payload);
        hub.to(payload.store).emit('delivered', payload);
        hub.emit('delivered', payload);
    });
});

function logger(event, payload){
    let time = new Date();
    console.log('event:', {event, time, payload});
}