'use strict';

const Bacon           = require('baconjs');
const WebSocketServer = require('ws').Server;
const serverEvents    = require('./events');

function startServer(){
  const wss    = new WebSocketServer({port: 5555});
  const server = serverEvents(wss);                 // server: {evst_ws_connections, evst_message, evst_ws_closed}


  const evst_ws_new_player     = server.evst_message
    .filter((message) => message.st_content === 'player')      // message: {ws_sender, st_content}
    .map((message)    => message.ws_sender);

  const evst_ws_new_presenter  = server.evst_message
    .filter((message) => message.st_content === 'presenter')
    .map((message)    => message.ws_sender);

  const evst_ws_new_gm         = server.evst_message
    .filter((message) => message.st_content === 'game master')
    .map((message)    => message.ws_sender);

  const prop_rgws_connections  = Bacon.update([],
    [server.evst_ws_connections], (prev, ws_connection)    => prev.concat(ws_connection),
    [server.evst_ws_closed],      (prev, ws_closed)        => prev.filter(x => x !== ws_closed)
  );
  const prop_rgws_players      = Bacon.update([],
    [evst_ws_new_player],         (prev, ws_new_player)    => prev.concat(ws_new_player),
    [server.evst_ws_closed],      (prev, ws_closed)        => prev.filter(x => x !== ws_closed)
  );
  const prop_rgws_presenters   = Bacon.update([],
    [evst_ws_new_presenter],      (prev, ws_new_presenter) => prev.concat(ws_new_presenter),
    [server.evst_ws_closed],      (prev, ws_closed)        => prev.filter(x => x !== ws_closed)
  );
  const prop_rgws_gms          = Bacon.update([],
    [evst_ws_new_gm],             (prev, ws_new_gm)        => prev.concat(ws_new_gm),
    [server.evst_ws_closed],      (prev, ws_closed)        => prev.filter(x => x !== ws_closed)
  );

  //Log stuff
  server.evst_ws_connections
    .onValue((ws) => console.log(ws + ': opened'));

  server.evst_message
    .onValue((message) => console.log(message.ws_sender + ': ' + message.st_content));

  server.evst_ws_closed
    .onValue((ws) => console.log(ws + ': closed'));
}

startServer();
