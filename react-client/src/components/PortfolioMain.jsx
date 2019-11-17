import React from 'react';
import ListItem from './ListItem.jsx';
import List from './List.jsx';
import $ from 'jquery';
import Axios from 'axios';
import SearchedList from './SearchedList.jsx';

class PortfolioMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioItems: [],
      searchItems: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const symbol = event.target.value;

    console.log('this should be the symbol being searched', symbol)

    Axios.get(`/search/${symbol}`)
      .then((response) => {
        console.log('this should be the search response from API', response.data.bestMatches);
        this.setState ({
          searchItems: response.data.bestMatches
        })
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {

      });

      this.setState ({
        value: event.target.value
      })
  }

  handleSubmit(event) {
    Axios.post('/save')
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          portfolioItems: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
    <div>
      <h1>Item List</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <SearchedList items={this.state.searchItems}/>
      <List items={this.state.portfolioItems}/>
    </div>)
  }
}


export default PortfolioMain;