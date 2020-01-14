const Pool = require('pg').Pool;
const moment = require('moment');

const pool = new Pool({
  user: 'd.parson',
  host: 'localhost',
  database: 'portfolios',
  password: '',
  port: 5432,
})

pool.connect((err, client, release) => {
  if(err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('Connected to postgresql database portfolios')
})

getUserStocks = (req, res) => {
  console.log('this is req inside db query', req)
  const query = {
    text: 'SELECT * FROM userinfo WHERE user_name = $1 AND user_password = $2',
    values: [req.user, req.password],
  }
  pool.query(query, (err, result) => {
    if (err) {
      return err
    }
    console.log('this is result.rows in db query', result.rows.length);
    if (result.rows.length === 1) {
      const user = result.rows[0];
      const userId = user.id;
      const queryTwo = {
        text: 'SELECT * FROM userportfolio WHERE id = $1',
        values: [userId],
      }
      pool.query(queryTwo, (err, resultTwo) => {
        if (err) {
          return err
        }
        if (resultTwo.rows.length > 0) {
          console.log('this is after second query', resultTwo.rows)
          res.send({data: resultTwo.rows, user: req.user, id:userId})
        } else {
          res.send({user: req.user, id: userId, data:resultTwo.rows})
        }
      })
    } else {
      res.send(req.user);
    }
  })
}

addToUserStocks = (req, res) => {
  const data = req.data['Global Quote'];
  const symbol = data['01. symbol'];
  let price = data['05. price'];
  price = parseFloat(price);
  price = Number(price);
  const now = moment();
  const todayDate = moment(now).format('YYYY-MM-DD')
  const userAdd = req.userId;

  const query = {
    text: 'INSERT INTO userportfolio(id, stock_symbol, price_added, date_added) VALUES ($1, $2, $3, $4)',
    values: [userAdd, symbol, price, todayDate]
  }
  pool.query(query, (err, result) => {
    if (err) {
      return console.error(err)
    }
    const queryThree = {
      text: 'SELECT * FROM userportfolio WHERE id = $1',
      values: [userAdd],
    }
    pool.query(queryThree, (err, result) => {
      if (err) {
        return console.error(err)
      }
      console.log('this is after selectionig all from userportfolio in DB', result.rows)
      res.send(result.rows)
    })
  })
}

addHistoricalPrice = (req, res) => {
  // want to add historical prices from date added up to most recent, will have to do a get request for daily or weekly adjusted prices which returns 20+ years of data and only add in data that had not been added yet to historical prices in database which shouldn't be a lot when logging in new but will need to check date of when stock was added, then check latest price that is in database for that stock, and get all new prices since that date and add to database. OR can just look up historical prices each time logging in which might be even easier. Maybe can find an API that is completely FREE and use that to get weekly or daily adjust prices to then fill out a chart or graph of some sort
}

addUser = (req, res) => {
  const query = {
    text: 'INSERT INTO userinfo(user_name, user_email, user_password) VALUES ($1, $2, $3)',
    values: [req.userName, req.email, req.password],
  }

  if(req.email.length > 0 && req.userName.length >= 5 && req.password.length > 6) {
    pool.query(query, (err, result) => {
      if (err) {
        return console.error(err)
      }
      res.send('Thank you for creating an account!')
    })
  } else {
    res.send('Not successful, please make sure no fields are left blank!')
  }
}

module.exports = {
  getUserStocks,
  addUser,
  addToUserStocks
}

// {
//   "Global Quote": {
//       "01. symbol": "MSFT",
//       "02. open": "150.0700",
//       "03. high": "150.5500",
//       "04. low": "148.9800",
//       "05. price": "150.3300",
//       "06. volume": "13482769",
//       "07. latest trading day": "2019-11-18",
//       "08. previous close": "149.9700",
//       "09. change": "0.3700",
//       "10. change percent": "0.2467%"
//   }
// }