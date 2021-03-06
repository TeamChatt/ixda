'use strict';

const Bacon = require('baconjs');
const fix = require('./fix');
// Note: ws here is different from ws on the server side

//Returns evst of JSON objects
function evstFromWebSocket(ws){
  return Bacon.fromBinder((sink) => {
    ws.onopen    = (message) => {
      sink(new Bacon.Next(() => message));
    };
    ws.onmessage = (message) => {
      sink(new Bacon.Next(() => message));
    };
    ws.onerror   = (error) => {
      sink(new Bacon.Error(() => error));
    };
    ws.onclose   = (error) => {
      sink(new Bacon.End(() => error));
    };

    return () => {
      ws.onopen = ws.onmessage = ws.onerror = ws.onclose = () => {};
    };
  });
}

function makeConnection(evst_st_send){
  const ws           = new WebSocket('ws://' + window.location.hostname + ':5555');
  const evst_receive = evstFromWebSocket(ws);

  //Send messages through the WebSocket
  //If the socket isn't open yet, buffer until it is before sending
  const prop_connected = evst_receive
    .take(1)
    .map(true)
    .toProperty(false);

  evst_st_send
    .holdWhen(prop_connected.not())
    .map(JSON.stringify)
    .onValue((st_send) => {
      ws.send(st_send);
    });

  //evst_message
  return evst_receive
    .skip(1)
    .filter((message) => message.data !== undefined)
    .map((message) => message.data)
    .map(JSON.parse);
}

function connection(f){
  fix(evst_st_receive => {
    const evst_st_send = f(evst_st_receive);
    return makeConnection(evst_st_send);
  });
}

module.exports = connection;
