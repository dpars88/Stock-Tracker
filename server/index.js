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
  Axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.id}&apikey=FCXT01X6H9P25PU0`)
    .then(function(response) {
      //console.log(response.data);
      res.send(response.data);
    })
})

app.get('/add/:id/:user', function (req, res) {
  console.log(req.params.id)
  console.log(req.params.user)
  Axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.id}&apikey=PY5TE4O1HV3HVT2S`)
    .then((response) => {
      console.log(response.data)
      const dbInfo = {};
      dbInfo['data'] = response.data;
      dbInfo['userId'] = req.params.user;
      console.log('this is my new made up object with a nested object and a userId', dbInfo);
      db.addToUserStocks(dbInfo, res)
    })
})

app.get('/price/:symbol', function (req, res) {
  //console.log(req.params.symbol);
  Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&outputsize=compact&apikey=FCXT01X6H9P25PU0`)
    .then((response) => {
      //console.log(response.data);
      res.send(response.data);
    })
})

app.get('/current/:symbol', function (req,res) {
  // console.log('this should be each stock symbol in order, msft apple tesla jnj', req.params.symbol);
  Axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=PY5TE4O1HV3HVT2S`)
    .then((response) => {
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

