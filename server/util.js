'use strict';

const Bacon = require('baconjs');


function messagesFromWebSocket(ws){
  //evst_message
  return Bacon.fromEvent(ws, 'message')
    .map(st_content => makeMessage(ws, st_content));
}
function makeMessage(ws_sender, st_content){
  //message
  return {
    ws_sender: ws_sender,
    st_content: st_content
  };
}
const sendMessages = (evst_st_content) => (ws) => {
  evst_st_content
    .takeUntil(Bacon.fromEvent(ws, 'close'))
    .onValue((st_content) => {
      console.log('sending... ' + st_content + ' to ' + ws);
      ws.send(st_content);
    });
};

module.exports = {
  makeMessage:           makeMessage,
  messagesFromWebSocket: messagesFromWebSocket,
  sendMessages:          sendMessages
};
