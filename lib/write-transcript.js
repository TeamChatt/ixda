'use strict';

const transcript_element = document.querySelector('.transcript');

module.exports = function appendMessage(st_message){
  const text  = document.createTextNode(st_message);
  const new_p = document.createElement('p');

  new_p.appendChild(text);
  transcript_element.appendChild(new_p);
};
