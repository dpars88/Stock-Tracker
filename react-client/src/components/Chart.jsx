import React from 'react';
import { VictoryLine, VictoryChart, VictoryVoronoiContainer, VictoryTheme } from 'victory';

//https://formidable.com/open-source/victory/docs/

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLine() {

  }

  render() {
    var rawData = this.props.datePrices
    var chartData = [];
    console.log('this is rawdata', rawData)
    var current = [];
    var datesArr = [];
    //var properDate;
    //var myObj;
    var chartData = [];
    var first = [];

    if (rawData.length > 0) {
      rawData.map((item) => {
        //console.log('this is item',item)
        for(var key in item) {
          var properDate = new Date(key);
          //console.log(properDate)
          var myObj = item[key];
          myObj['my_date'] = properDate;
          //myObj['1. open'] =
        }
      })
      rawData.map((each) => {
        var eachArr = [];
        for (var key in each) {
          var specific = each[key]
          var chartObj = {x:'', y:''};
          chartObj['x'] = specific['my_date'];
          chartObj['y'] = specific['1. open'];
          eachArr.push(chartObj);
          }
          chartData.push(eachArr);
      })
      first = chartData[0]
    }

    return (

      <VictoryChart
        scale={{x: "time"}}
        scale={{y: 'linear'}}
        theme={VictoryTheme.material}
        // minDomain={{x:0, y:0}}
        data={first}
        // containerComponent={
        //   <VictoryVoronoiContainer
        //     labels={({ first }) => `${first['x']}, ${first['y']}`}
        //   />
        // }
      >
        <VictoryLine
          interpolation='linear'
          data={first}
          x={first['x']} y={first['y']}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          />
          {/* <VictoryLine
          interpolation='linear'
          data={chartData[1]}
          x={chartData[1]['x']} y={chartData[1]['y']}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}

          So still working on how to add it multiple lines and have as many lines per the count of items in the portfolio

          /> */}

      </VictoryChart>

    );
  }
}

export default Chart;