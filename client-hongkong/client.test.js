'use strict';

const HongKongClient = require('./client');
const { io } = require('socket.io-client');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
      };
    }),
  };
});

describe('HK Client Tests', () => {
  test('Call socket function on instantiation', () => {
    jest.clearAllMocks();
    let client = new HongKongClient('new');
    expect(io).toHaveBeenCalledWith('http://localhost:3000/cargo');
    expect(client.socket.emit).toHaveBeenCalledWith('JOIN', {queueId: 'new'});
    expect(client.socket.on).toHaveBeenCalled();
  });
});