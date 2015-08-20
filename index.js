var express = require('express');
var kraken = require('kraken-js');

var app = express();
var PORT = 8000;

app.use(kraken());

app.on('start', function () {
  app.listen(PORT).on('listening', function () {
    console.log('listening on %s ...', this.address().port || this.address());
  });
});
