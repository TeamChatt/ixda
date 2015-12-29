'use strict';

const Bacon = require('baconjs');

module.exports = function serverEvents(wss){
  const new_connections   = Bacon.fromEvent(wss, 'connection');
  const messages          = new_connections
    .flatMap((ws) => Bacon
        .fromEvent(ws, 'message')
        .map(msg => {
          return {connection: ws, message: msg};
        })
      );
  const closed_connection = new_connections
    .flatMap((ws) => Bacon
        .fromEvent(ws, 'close')
        .map(ws)
      );

  return {
    new_connections:   new_connections,
    messages:          messages,
    closed_connection: closed_connection
  };
};
