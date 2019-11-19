import React from 'react';
import PortfolioList from './PortfolioList.jsx';
const moment = require('moment');


class StockList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTableData() {
    return this.props.items.map((item, index) => {
      const { stock_symbol, price_added } = item;
      let dateAdd = item.date_added;
      dateAdd = moment(dateAdd).format('MM-DD-YYYY');
      let id = item.id;
      return (
        <tr key={price_added}>
          {/* <td>{id}</td> */}
          <td>{stock_symbol}</td>
          <td>{price_added}</td>
          <td>{dateAdd}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.props.items[0]);
    header = header.slice(1, header.length);
    return header.map((key, index) => {
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