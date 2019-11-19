var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/postgresql.js');
const Axios = require('axios');

var app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

//API Keys:
// FCXT01X6H9P25PU0
// PY5TE4O1HV3HVT2S
// EFQT5ERZWOCD2ZBP

app.get('/search/:id', function (req, res) {
  Axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.id}&apikey=EFQT5ERZWOCD2ZBP`)
    .then(function(response) {
      //console.log(response.data);
      res.send(response.data);
    })
})

app.post('/save', function(req, res) {
  db.addUser(req.body, res)
})

app.get('/login/:user/:password', function (req, res) {
  console.log('this is req.params',req.params)
  const request = req.params
  db.getUserStocks(request, res)
})

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

