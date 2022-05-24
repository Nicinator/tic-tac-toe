var express = require('express');
var router = express.Router();

let availableSigns = {
  x: true,
  o: true
}

let gameStarted = false

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tic Tac Toe' });
});

router.post('/select-sign', function(req, res) {
  const data = req.body
  if(data.selectedSign === 'X') {
    availableSigns.x = false
  } else {
    availableSigns.o = false
  }

  if(availableSigns.x === false && availableSigns.o === false) {
    gameStarted = true
  }
})

router.get('/available-signs', function(req, res) {
  res.send(JSON.stringify(availableSigns))
})

router.get('/update', function(req, res) {
  if(gameStarted === true) {
    res.send(JSON.stringify({gameStarted: true}))
  } else {
    res.send(JSON.stringify({gameStarted: false}))
  }
})

module.exports = router;
