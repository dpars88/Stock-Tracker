import React from 'react';
import { VictoryLine, VictoryChart, VictoryVoronoiContainer, VictoryTheme, VictoryAxis } from 'victory';

//https://formidable.com/open-source/victory/docs/

class Chart extends React.Component {
  constructor(props) {
    super(props);
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
    var second = [];

    if (rawData.length > 0) {
      rawData.map((item) => {
        console.log('this is item',item)
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
      second = chartData[1]
    }

    return (

      <VictoryChart
        scale={{x: "time", y: "linear"}}
        data={first}
        domainPadding={20}
        padding={75}
        containerComponent={
          <VictoryVoronoiContainer
            // labels={(first) => `Price: + ${first.y}, Date: + ${first.x}`} --- this doesn't make labels like I'd like them to be
          />
        }
        // theme={VictoryTheme.material}
      >
        <VictoryAxis
          fixLabelOverlap={true}
          style={{ tickLabels: { padding: 16, fontSize: 8 } }}
        />
        <VictoryAxis
          dependentAxis={true}
          fixLabelOverlap={true}

         />
        <VictoryLine
          // labels={(first) => `Price: + ${first.y}, Date: + ${first.x}`} ---- this makes labels everywhere
          interpolation="natural"
          data={first}
          x={first['x']} y={first['y']}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          animate={{
            delay: 2000,
            duration: 5000,
          }}
        />
      </VictoryChart>

    );
  }
}

export default Chart;