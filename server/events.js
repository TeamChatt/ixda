'use strict';

const Bacon = require('baconjs');

module.exports = function serverEvents(wss){
  const evst_ws_connections   = Bacon.fromEvent(wss, 'connection');
  const evst_message      = evst_ws_connections
    .flatMap((ws) => Bacon
        .fromEvent(ws, 'message')
        .map(st_content => {
          return {ws_sender: ws, st_content: st_content} // message
        })
      );
  const evst_ws_closed = evst_ws_connections
    .flatMap((ws) => Bacon
        .fromEvent(ws, 'close')
        .map(ws)
      );

  // server
  return  {
    evst_ws_connections:  evst_ws_connections,
    evst_message:         evst_message,
    evst_ws_closed:       evst_ws_closed
  };
}
