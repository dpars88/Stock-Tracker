import React from 'react';
import ListItem from './ListItem.jsx';
import StockList from './StockList.jsx';
import $ from 'jquery';
import Axios from 'axios';
import SearchedList from './SearchedList.jsx';
import data from '../../../sampleAPIdata.js';

class PortfolioMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioItems: [],
      searchItems: [],
      stockList: [],
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleSearch(event) {
    const symbol = event.target.value;
    Axios.get(`/search/${symbol}`)
      .then((response) => {
        console.log('this should be the search response from API', response.data.bestMatches);
        this.setState({
          searchItems: response.data.bestMatches
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
          userPassword: ''
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

  handleSubmit(event) {

    const username = this.state.userName;
    const password = this.state.userPassword;
    // const sendObj ={};
    // sendObj['username'] = username;
    // sendObj['password'] = password;
    if (username.length < 5 && password < 5) {
      alert('Username or password inccorrect')
    } else {
      Axios.get(`/login/${username}/${password}`)
        .then((response) => {
          console.log('this is response in client', response);
          if(response.data !== username) {
            this.setState({
              stockList: response.data,
              loggedIn: true,
              newUser: false
            })
          } else {
            alert('Incorrect Login')
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then( function () {
        });
    }
    event.preventDefault();
  }

  logOut() {
    this.setState ({
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
            <form onSubmit={this.handleSubmit}>
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
    } else if (this.state.loggedIn === true && this.state.newUser !== true) {
      return (
        <div>
          Welcome *USERNAME* or First Name
          <div>
            <div>
              <button onClick={this.logOut}>
                Log Out
              </button>
            </div>
            <h3>Search And Add To Your Portfolio</h3>
            <form onSubmit={this.handleSubmit}>
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
            <StockList items={this.state.portfolioItems} />
          </div>
        </div>
      )
    }
  }
}


export default PortfolioMain;