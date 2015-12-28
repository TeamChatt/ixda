const Bacon = require('baconjs');

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

function connection(){
  const ws = new WebSocket('ws://' + window.location.hostname + ':5555');
  return websocketAsEventStream(ws);
}

module.exports = connection;
