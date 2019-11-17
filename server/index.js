var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
const Axios = require('axios');

var app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

//API Keys:
// FCXT01X6H9P25PU0
// PY5TE4O1HV3HVT2S

app.get('/search/:id', function (req, res) {
  Axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.id}&apikey=FCXT01X6H9P25PU0`)
    .then(function(response) {
      res.send(response.data);
    })
})

app.post('/')

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

