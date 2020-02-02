import React from 'react';
import PortfolioList from './PortfolioList.jsx';
const moment = require('moment');


class StockList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTableData() {
    var today = moment().format('YYYY-MM-DD');
    console.log('this should be todays date',typeof today);
    var count = 0;
    var currentPrices = this.props.datePrice;
    // var prices = [];
    // console.log('this should be currentprices', currentPrices)
    // currentPrices.map(item => {
    //   console.log(item);
    //   if (item === today) {
    //     console.log('found it!');
    //     prices.push(item['1. open']);
    //   }
    // })
    // console.log('this should be an array of prices', prices);



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
        {/* <ul>
          {props.items.map(item => <PortfolioList key={item.stock_symbol} item={item} />)}
        </ul> */}
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