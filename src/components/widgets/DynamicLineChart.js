import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';
import moment from 'moment'

class DynamicLineChart extends Component {
  constructor(props) {
    super(props)
    /*
    this.state = {
      datasets: {
        "<key>": { label: <label>, data: [..., ...] }
      }
    }
    */
    this.state = {
      datasets: []
    }
  }

  componentWillReceiveProps(props){
    const datasets = []
    props.data.forEach((datapoint) => {
      // TODO remove the customzied data here: 'channel', 'sessionKey'
      let serie = this.state.datasets[datapoint.sessionKey]
      
      // Initialize serie
      if( ! serie) {
        serie = Object.assign({
          label: datapoint.channel,
          sessionKey: datapoint.sessionKey,
          data: Array.from(new Array(props.maxItems), () => null ),
          fill: false
        }, serie)
      }

      // (Shift and) add new data point
      if(serie.data.length >= props.maxItems) serie.data.shift();
      serie.data.push(datapoint.value)
      datasets.push(serie)

      // Save in state
      let key = datapoint.sessionKey
      datasets[datapoint.sessionKey] = serie
    })
    this.setState({datasets: datasets})
  }

  render() {

    // Prepare format for data
    const data = {
      labels: Array.from(new Array(this.props.maxItems), 
                          (d, i) => moment().add(i - this.props.maxItems, 's')
                                            .format('HH:mm:ss')),
      datasets: this.state.datasets
    }
    return (
        <Line
          data={data} 
          options={{
            animation : false,
            elements: {
              line: {
                  tension: 0, // disables bezier curves
              }
            }
          }} 
          height={200} width={800}
        />
    )
  }
}

export default DynamicLineChart;