const Bacon = require('baconjs');
const fix = require('./fix');
// Note: ws here is different from ws on the server side

function evstFromWebSocket(ws){ //TODO: returns strings or json objects?
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

function connectionI(evst_st_send){
  const ws = new WebSocket('ws://' + window.location.hostname + ':5555');
  evst_st_send.onValue(st_send => ws.send(st_send));
  return evstFromWebSocket(ws);
}

function connection(f){
  fix(evst_st_receive => {
    const evst_st_send = f(evst_st_receive);
    return connectionI(evst_st_send);
  });
}

module.exports = connection;
