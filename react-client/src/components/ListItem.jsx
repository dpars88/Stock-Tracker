import React from 'react';

const ListItem = (props) => (
  <div>
    <li>
    { props.item['1. symbol'] }
    { props.item['2. name'] }
    </li>

  </div>
)

export default ListItem;