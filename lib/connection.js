const Bacon = require('baconjs');
const fix = require('./fix');

function websocketAsEventStream(ws){
  return Bacon.fromBinder(function(sink){
    ws.onopen    = function(message){
      sink(new Bacon.Next(function(){ return message; }));
    };
    ws.onmessage = function(message){
      sink(new Bacon.Next(function(){ return message; }));
    };
    ws.onerror   = function(error){
      sink(new Bacon.Error(function(){ return error; }));
    };
    ws.onclose   = function(error){
      sink(new Bacon.End(function(){ return error; }));
    };

    return function(){
      ws.onopen = ws.onmessage = ws.onerror = ws.onclose = function(){};
    };
  });
}

function connection(send){
  const ws = new WebSocket('ws://' + window.location.hostname + ':5555');
  send.onValue(msg => ws.send(msg));
  return websocketAsEventStream(ws);
}

function makeConnection(f){
  fix(receive => {
    const send = f(receive);
    return connection(send);
  });
}

module.exports = makeConnection;
