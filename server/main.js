'use strict';

const Bacon           = require('baconjs');
const WebSocketServer = require('ws').Server;
const serverEvents    = require('./events');

function startServer(){
  const wss    = new WebSocketServer({port: 5555});
  const events = serverEvents(wss);


  const new_player      = events.messages
    .filter((msg) => msg.message === 'player')
    .map((msg) => msg.connection);
  const new_presenter   = events.messages
    .filter((msg) => msg.message === 'presenter')
    .map((msg) => msg.connection);
  const new_game_master = events.messages
    .filter((msg) => msg.message === 'game master')
    .map((msg) => msg.connection);


  const connections  = Bacon.update([],
    [events.new_connections],   (prev, connection) => prev.concat(connection),
    [events.closed_connection], (prev, closed)     => prev.filter(x => x !== closed)
  );
  const players      = Bacon.update([],
    [new_player],               (prev, connection) => prev.concat(connection),
    [events.closed_connection], (prev, closed)     => prev.filter(x => x !== closed)
  );
  const presenters   = Bacon.update([],
    [new_presenter],            (prev, connection) => prev.concat(connection),
    [events.closed_connection], (prev, closed)     => prev.filter(x => x !== closed)
  );
  const game_masters = Bacon.update([],
    [new_game_master],          (prev, connection) => prev.concat(connection),
    [events.closed_connection], (prev, closed)     => prev.filter(x => x !== closed)
  );

  //Log stuff
  events.new_connections
    .onValue((ws) => console.log('connection opened'));

  events.messages
    .onValue((msg) => console.log('got message: ' + msg.message));

  events.closed_connection
    .onValue((message) => console.log('connection closed'));
}

startServer();
