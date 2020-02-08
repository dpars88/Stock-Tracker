import React from 'react';
import PortfolioList from './PortfolioList.jsx';
const moment = require('moment');


class StockList extends React.Component {
  constructor(props) {
    super(props);
  }

  // currentPrices(event) {
  //   let currentSymbols = this.state.stockSymbols;
  //   let quoteArr = [];

  //   const quote = key => Axios.get(`/current/${key}`);
  //   const quoteProcess = list => Promise.all(list.map(item => quote(item)));

  //   (async () => {
  //     let stockQuoteData = await quoteProcess(currentSymbols);
  //     for (var q = 0; q < stockQuoteData.length; q++) {
  //       let quoteObj = stockQuoteData[q]['Global Quote']
  //       quoteArr.push(quoteObj["05. price"])
  //     }
  //   })();

  //   this.setState({
  //     quotePrices: quoteArr
  //   })
  //   event.preventDefault();
  // }

  renderTableData() {
    var today = moment().format('YYYY-MM-DD');
    console.log('this should be todays date',typeof today);
    var count = 0;
    var currentPrices = this.props.datePrice;

    // new idea to use API call that is used for searching since it brings back updated price data use that to get todays price and then use data that was retrieved for each stock in portfolio for graph only

    return this.props.items.map((item, index) => {
      const { stock_symbol, price_added } = item;
      let dateAdd = item.date_added;
      dateAdd = moment(dateAdd).format('MM-DD-YYYY');
      let id = item.id;
      count ++;
      return (
        <tr key={count}>
          <td>{stock_symbol}</td>
          <td>{price_added}</td>
          <td>{dateAdd}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.props.items[0]);
    let headerTwo = ['Stock Symbol', 'Price Added', 'Date Added', 'Current Price', 'Edit Date Added', 'Remove']
    // header = header.slice(1, header.length);
    headerTwo = headerTwo.slice(0, headerTwo.length);
    return headerTwo.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    return (
      <div>
        <h4> Current Portfolio </h4>
        You have {this.props.items.length} items in your portfolio
        <div>
          Get most up to date prices!
          <button onClick={this.props.latest}>
            Refresh Prices
          </button>
        </div>
        <table className="stocks">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>

    )
  }
}

export default StockList;