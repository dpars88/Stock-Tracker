import React from 'react';
import ListItem from './ListItem.jsx';
import StockList from './StockList.jsx';
import $ from 'jquery';
import Axios from 'axios';
import SearchedList from './SearchedList.jsx';
import data from '../../../sampleAPIdata.js';
import Chart from './Chart.jsx';

class PortfolioMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioItems: [],
      searchItems: [],
      stockList: [],
      stockSymbols: [],
      datePrices: [],
      user: '',
      value: '',
      userName: '',
      userPassword: '',
      loggedIn: false,
      createUserName: '',
      createPassword: '',
      createEmail: '',
      newUser: false
    }

    this.logOut = this.logOut.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleRemoveStock = this.handleRemoveStock.bind(this);
  }

  handleSearch(event) {
    const symbol = event.target.value;
    this.setState({
      searchItems: []
    })
    if(symbol.length > 0) {
      Axios.get(`/search/${symbol}`)
        .then((response) => {
          console.log('this should be the search response from API', response.data.bestMatches);
          var data = response.data.bestMatches;
          data = data.slice(0,4);
          this.setState({
            searchItems: data
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      this.setState({
        value: event.target.value
      })
    } else {
      this.setState({
        searchItems: []
      })
    }
  }

  handleNewUserSubmit(event) {
    Axios.post('/save', {
      email: this.state.createEmail,
      userName: this.state.createUserName,
      password: this.state.createPassword
    })
      .then((response) => {
        alert(response)
        this.setState({
          newUser: false,
          createEmail: '',
          createUserName: '',
          createPassword: '',
          userName: '',
          userPassword: '',
          userId: 0
        })
      })

    event.preventDefault();
  }

  handleLogin(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log('this is username/password', name)
    // console.log(value)
    //Axios.get('/login', )
    this.setState({
      [name]: value
    })
  }

  handleCreate() {
    this.setState({
      newUser: true
    })
  }

  handleSubmitLogin(event) {
    let symbolsArr = [];
    let datePriceArr = [];
    const username = this.state.userName;
    const password = this.state.userPassword;
    if (username.length < 5 && password < 6) {
      alert('Username or password inccorrect')
    } else {
      Axios.get(`/login/${username}/${password}`)
        .then((response) => {
          const stringName = username.toString();
          //console.log('this is response from DB user',response.data.user)
          //console.log('this is string name', stringName);
          if (response.data.user === stringName) {
            console.log('this is response after logging in',response.data)
            const responseData = response.data.data;
            const existingUserStocks = response.data.data; //array of objects
            console.log(existingUserStocks);
            if (existingUserStocks.length > 0) {
              const stockSymbolArr = [];
              existingUserStocks.map(item => {
                stockSymbolArr.push(item.stock_symbol)
              })
              let currentPriceArr = [];

              const lookup = key => Axios.get(`/price/${key}`)
              const processList = list => Promise.all(list.map(item => lookup(item)));

              (async () => {
                let dailyStockData = await processList(stockSymbolArr);
                //console.log(results);
              })();

              for (var t = 0; t < dailyStockData.length; t ++) {
                  Axios.get(`/price/${stockSymbolArr[t]}`)
                    .then((response) => {
                      currentPriceArr.push(response.data)
                      currentPriceArr.map(item => {
                          symbolsArr.push(item["Meta Data"]["2. Symbol"])
                          datePriceArr.push(item["Time Series (Daily)"])
                      })
                    })
              }
              this.setState({
                stockList: response.data.data,
                userId: response.data.id,
                loggedIn: true,
                newUser: false,
                stockSymbols: symbolsArr,
                datePrices: datePriceArr
              })

            } else {
              this.setState({
                stockList: response.data.data,
                userId: response.data.id,
                loggedIn: true,
                newUser: false
              })
            }
            console.log('this is state after logging in', this.state)
          } else {
            alert('Incorrect Login')
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
    }
    event.preventDefault();
  }

  handleAddStock(event) {
    const symbol = this.state.value;
    const loggedInUserId = this.state.userId;
    Axios.get(`/add/${symbol}/${loggedInUserId}`)
      .then((response) => {
        console.log('this should be the stock added plus others', response.data)
        this.setState({
          stockList: response.data,
          value: ''
        })
      })
    event.preventDefault()
  }

  handleRemoveStock(event) {

  }

  logOut() {
    this.setState({
      loggedIn: false,
      newUser: false
    })
  }

  componentDidMount() {
  }

  render() {
    if (this.state.loggedIn !== true && this.state.newUser !== true) {
      return (
        <div>
          <div>
            <h2>Sign In To Get Started!</h2>
            <form onSubmit={this.handleSubmitLogin}>
              <label>
                Username
                <input
                  name="userName"
                  type="text"
                  value={this.userName}
                  onChange={this.handleLogin} />
              </label>
              <label>
                Password
              <input
                  name="userPassword"
                  type="text"
                  value={this.userPassword}
                  onChange={this.handleLogin} />
              </label>
              <input type="submit" value="Sign In" />
            </form>
          </div>
          <div>
            If you don't have an account yet, click here to create one!
            <button onClick={this.handleCreate}>
              Create New Account!
            </button>
          </div>
        </div>
      )
    } else if (this.state.newUser === true) {
      return (
        <div>
          <div>
            Create Account
            <form onSubmit={this.handleNewUserSubmit}>
              <label>
                Enter Email:
                <input
                  name="createEmail"
                  type="text"
                  value={this.createEmail}
                  onChange={this.handleLogin} />
              </label>
              <label>
                Create Username:
                <input
                  name="createUserName"
                  type="text"
                  value={this.createUserName}
                  onChange={this.handleLogin} />
              </label>
              <label>
                Create Password:
                <input
                  name="createPassword"
                  type="text"
                  value={this.createPassword}
                  onChange={this.handleLogin} />
              </label>
              <input type="submit" value="Create!" />
            </form>
            <div>
              <button onClick={this.logOut}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.loggedIn === true && this.state.newUser !== true && this.state.stockList.length > 0) {
      return (
        <div>
          Welcome back {this.state.userName}!
          <div>
            <div>
              <button onClick={this.logOut}>
                Log Out
              </button>
            </div>
            <h3>Search And Add To Your Portfolio</h3>
            <form onSubmit={this.handleAddStock}>
              <label>
                Search For A Stock!
            <input type="text" value={this.value} onChange={this.handleSearch} />
              </label>
              <input type="submit" value="Add To Portfolio" />
            </form>
          </div>
          <div>
            <SearchedList items={this.state.searchItems} />
          </div>
          <div>
            <StockList items={this.state.stockList} />
          </div>
          <div>
            <Chart />
          </div>
        </div>
      )
      } else if (this.state.loggedIn === true && this.state.newUser !== true && this.state.stockList.length === 0) {
        return (
          <div>
            Welcome back {this.state.userName}!
            <div>
              <div>
                <button onClick={this.logOut}>
                  Log Out
                </button>
              </div>
              <h3>Search And Add To Your Portfolio</h3>
              <form onSubmit={this.handleAddStock}>
                <label>
                  Search For A Stock!
              <input type="text" value={this.value} onChange={this.handleSearch} />
                </label>
                <input type="submit" value="Add To Portfolio" />
              </form>
            </div>
            <div>
              <SearchedList items={this.state.searchItems} />
            </div>
            <div>

            </div>
          </div>
        )
      }
  }
}


export default PortfolioMain;