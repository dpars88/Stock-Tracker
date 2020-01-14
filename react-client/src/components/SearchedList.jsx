import React from 'react';
import ListItem from './ListItem.jsx';

class SearchedList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var count = 0;
    if (this.props.items.length === 0) {
      return (
        <div></div>
      )
    } else if (this.props.items.length > 0) {
      return (
        <div>
          <div>
            <ul>
            { this.props.items.map(item => <ListItem key={count ++} item={item}/>)}
            </ul>
          </div>
        </div>
      )
    }
  }
}

// const SearchedList = (props) => (
//   <div>
//     <div>
//       <ul>
//     { props.items.map(item => <ListItem key={item['9. matchScore']} item={item}/>)}
//       </ul>
//     </div>
//   </div>
// )

export default SearchedList;