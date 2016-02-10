'use strict';

const WIDTH      = 1000;
const HEIGHT     = 1000;
const FILL_COLOR = 'rgb(100,100,100)';

function drawTimerSweep(canvas, timeout){
  const context     = canvas.getContext('2d');
  context.fillStyle = FILL_COLOR;

  function clear(){
    context.clearRect(0,0,WIDTH,HEIGHT);
  }
  function arc(radians){
    context.save();
    context.rotate(-Math.PI/2);
    context.translate(-HEIGHT/2,WIDTH/2);
    context.beginPath();
    context.arc(0, 0, Math.max(WIDTH, HEIGHT), 0, radians);
    context.lineTo(0,0);
    context.closePath();
    context.fill();
    context.restore();
  }
  function draw(radians){
    clear();
    arc(radians);
  }

  //Start the animation
  let start_time;
  function animate(current_time){
    if(!start_time){ start_time = current_time; }
    const progress = (current_time - start_time) / timeout;

    if(progress < 1){
      draw(progress * 2 * Math.PI);
      window.requestAnimationFrame(animate);
    } else {
      clear();
    }
  }
  window.requestAnimationFrame(animate);
}

module.exports = drawTimerSweep;
