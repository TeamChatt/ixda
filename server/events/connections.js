'use strict';

const Bacon = require('baconjs');
const util  = require('../util');


module.exports = function connectionEvents(wss){
  const evst_ws_opened = Bacon.fromEvent(wss, 'connection');
  const evst_message   = evst_ws_opened
    .flatMap(util.messagesFromWebSocket);
  const evst_ws_closed = evst_ws_opened
    .flatMap((ws) => Bacon.fromEvent(ws, 'close')
        .map(() => ws)
      );

  //connection_events
  return  {
    evst_ws_opened: evst_ws_opened,
    evst_ws_closed: evst_ws_closed,
    evst_message:   evst_message
  };
};
