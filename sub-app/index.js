var express = require('express');
var kraken = require('kraken-js');

var PORT = 8000;

function init(onstart) {
  var app = express();

  function onmount(onstart, opts) {
    app.once('start', onstart);
    app.use(kraken(opts));
  }

  function onconfig(config, next) {
    var conf = Object.create(config);
    conf.get = function () {
      return config.get.apply(config, arguments) ||
        app.parent.kraken.get.apply(app.parent.kraken, arguments);
    };
    next(null, conf);
  }

  onstart || (onstart = function () {app.parent.emit('childStart', app);});

  if (require.main === module) {
    onmount(onstart);
  } else {
    app.on('mount', function () {
      console.log('Sub-app mounted ...');
      onmount(onstart, {onconfig: onconfig});
    });
  }

  return app;
}

if (require.main === module) {
  init(function () {
    this.listen(PORT).on('listening', function () {
      console.log('listening on %s ...', this.address().port || this.address());
    });
  });
}

module.exports = init;
