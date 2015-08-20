var express = require('express');
var kraken = require('kraken-js');

function onconfig(config, next) {
  var conf = Object.create(config);
  conf.get = function () {
    return config.get.apply(config, arguments) ||
      app.parent.kraken.get.apply(app.parent.kraken, arguments);
  };
  next(null, conf);
}

var app = express();
var PORT = 8000;

if (require.main === module) {
  app.use(kraken());
  app.on('start', function () {
    app.listen(PORT).on('listening', function () {
      console.log('listening on %s ...', this.address().port || this.address());
    });
  });
} else {
  app.on('mount', function () {
    console.log('Sub-app mounted, initializing kraken ...');
    app.once('start', function () { console.log('sub-app kraken initialized!'); });
    app.use(kraken({ onconfig: onconfig }));
  });
}

module.exports = function () { return app; };
