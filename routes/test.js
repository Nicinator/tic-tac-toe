var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { content: 'Hallo Welt', title: 'Dies ist ein Titel?' });
});

module.exports = router;
