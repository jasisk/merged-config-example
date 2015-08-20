module.exports = function (router) {
  router.get('/', function (req, res) {
    res.send('child: ' + req.app.kraken.get('some:special:config:child') + '\n' +
             'parent: ' + req.app.kraken.get('some:special:config:parent'));
  });
};
