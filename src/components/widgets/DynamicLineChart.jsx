import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash'

import { getColor } from './utils'

class DynamicLineChart extends Component {
  state = {
    series: {}
  }

  componentWillReceiveProps(props){
    const chart  = this.refs.chart.chart_instance
    const series = this.state.series

    // One datapoint for each series
    props.data.forEach((datapoint) => {
      let index = series[datapoint.key]
      
      // Add to series to keep track the index of data in the chart
      if(index === undefined) {
        index = Object.keys(this.state.series).length
        series[datapoint.key] = index
        
        // Initialize the chart
        chart.data.datasets.push({
            label: datapoint.label,
            data: Array.from(new Array(props.maxItems), () => null ),
            fill: false,
            borderColor: getColor(index, 0.9),
            borderWidth: 2,
            pointBorderColor: getColor(index, 0.7),
            pointBackgroundColor: getColor(index, 0.5),
            pointBorderWidth: 1,
            backgroundColor: getColor(index, 0.5),
        })

      }
      // Data update
      const data = chart.data.datasets[index].data
      while(data.length >= props.maxItems - datapoint.values.length){
        data.shift()
      }
      Array.prototype.push.apply(data, datapoint.values)
    })
    // Update series in the setState
    this.setState({series: series})

    // Label update
    // TODO: correct label to be correct time
    if(chart.data.labels.length >= props.maxItems){
        chart.data.labels.shift()
    }
    chart.data.labels.push(moment().format('HH:mm:ss'))

    // Hide data (if any)
    if( props.hidden ) {
      props.hidden.forEach((d, i) => chart.data.datasets[i].hidden = d )
    }

    // Chart update
    chart.update()
  }

  shouldComponentUpdate() {
    return false // manually re-render to resolve metadata problem
  }

  render() {
    // Prepare format for data
    const data = {
      labels: Array.from(
                new Array(this.props.maxItems), 
                (d, i) => moment().add(i - this.props.maxItems, 's')
                                  .format('HH:mm:ss')),
      datasets: [] // Empty datasets at first
    }
    // Default options
    const options = {
      maintainAspectRatio: false,
      elements: {
        // disables bezier curves to increase the performance 
        line: { tension: 0 },
        point: { radius: 0 }
      },
      layout: {
        padding: { top: 5, left: 5, right: 5, bottom: 5}
      }
    }
    // Merge default with customized options
    _.merge(options, this.props.options)

    return (
      <div className ="line-chart-container" 
          style={this.props.containerStyle}>
        <Line
          ref='chart'
          data={data}
          options={options}
        />
      </div>
    )
  }
}

export default DynamicLineChart;