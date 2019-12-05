import React from 'react';
import ListItem from './ListItem.jsx';

const SearchedList = (props) => (
  <div>
    <div>
      <ul>
    { props.items.map(item => <ListItem key={item['9. matchScore']} item={item}/>)}
      </ul>
    </div>
  </div>
)

export default SearchedList;