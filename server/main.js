'use strict';

const Bacon           = require('baconjs');
const WebSocketServer = require('ws').Server;

function makeServer(){
  const wss = new WebSocketServer({port: 5555});

  const connections = Bacon.fromEvent(wss, 'connection');

  connections
    .onValue((ws) => {
      console.log('connection opened');
    });

  connections
    .onValue((ws) => {
      const receive = Bacon.fromEvent(ws, 'message');
      const close   = Bacon.fromEvent(ws, 'close');

      receive
        .onValue((message) => {
          console.log('got message: ' + message);
        });

      close
        .onValue((message) => {
          console.log('connection closed');
        });
    });
}

makeServer();
