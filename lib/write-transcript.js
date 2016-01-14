'use strict';

const transcript_element = document.querySelector('.transcript');

module.exports = function appendMessage(message){
  const text  = document.createTextNode(JSON.stringify(message));
  const new_p = document.createElement('p');

  new_p.appendChild(text);
  transcript_element.appendChild(new_p);
};
