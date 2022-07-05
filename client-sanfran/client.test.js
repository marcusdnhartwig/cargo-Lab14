'use strict';

const SanfranClient = require('./client');
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

describe('SF Client Tests', () => {
  test('Call socket function on instantiation', () => {
    jest.clearAllMocks();
    let client = new SanfranClient('new');
    expect(io).toHaveBeenCalledWith('http://localhost:3000/cargo');
    expect(client.socket.emit).toHaveBeenCalledWith('JOIN', {queueId: 'new'});
    expect(client.socket.on).toHaveBeenCalled();
  });
});