import React from 'react';


const StockList = (props) => (
  <div>
    <h4> Current Portfolio </h4>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default StockList;