const Bacon = require('baconjs');

module.exports = function fix(f){
  const bus = new Bacon.Bus();
  const ret = f(bus);
  bus.plug(ret);
  return ret;
}
