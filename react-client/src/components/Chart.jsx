import React from 'react';
import { VictoryLine, VictoryChart, VictoryVoronoiContainer } from 'victory';

//https://formidable.com/open-source/victory/docs/

class Chart extends React.Component {
  render() {
    return (

      <VictoryChart>
        <VictoryVoronoiContainer
      labels={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
    />
        <VictoryLine y={(datum) => Math.sin(2 * Math.PI * datum.x)}/>

      </VictoryChart>

    );
  }
}

export default Chart;