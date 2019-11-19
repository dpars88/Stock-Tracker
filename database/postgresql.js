const Pool = require('pg').Pool;

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
        console.log('this is after second query', resultTwo.rows)
        res.send(resultTwo.rows)
      })
    } else {
      res.send(req.user);
    }
  })
}

addToUserStocks = (req, res) => {

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