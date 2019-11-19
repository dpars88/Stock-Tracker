import React from 'react';
const moment = require('moment');

class PortfolioList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var dateAdd = this.props.item['date_added'];
    var formated = moment(dateAdd).format('MM-DD-YYYY');
    return (
      <div>
        <li>
          {this.props.item['stock_symbol']}
          {this.props.item['price_added']}
          {formated}
        </li>

      </div>
    )
  }
}

export default PortfolioList;