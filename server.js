var express = require('express');
var kraken = require('kraken-js');

var check = thunk();
var app = express();
var PORT = 8000;

app.use(kraken());

app.on('start', check.bind(null, 'start'));
app.on('childStart', check.bind(null, 'childStart'));

function thunk() {
  var checks = ['start', 'childStart'];
  return function (check) {
    var idx;

    console.log('Event: %s ...', check);
    if (~(idx = checks.indexOf(check))) {
      checks.splice(idx, 1);
    }
    if (!checks.length) {
      oncomplete();
    }
  };
}

function oncomplete () {
  app.listen(PORT).on('listening', function () {
    console.log('listening on %s ...', this.address().port || this.address());
  });
}
