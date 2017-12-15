import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

const containerStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '2px'
}

class FFTBarChart extends Component {
  state = {
      labelCount: 120
  }

  componentWillReceiveProps(props){
    const chart  = this.refs.chart.chart_instance

    // Update data
    chart.data.datasets[0].data = props.data

    // Update number of label (bucket) (if any)
    if(props.data.length !== this.state.labelCount) {
      chart.data.labels = _.times(props.data.length, (i) => i)
      this.setState({
        labelCount: props.data.length
      })
    }

    // Update the max scale of Y axis
    if(props.max) {
      chart.options.scales.yAxes[0].ticks.suggestedMax = props.max
    }
    // Manually update chart
    chart.update()
  }

  shouldComponentUpdate() {
    return false // manually re-render to resolve metadata problem
  }

  render() {
    // Default look
  	const data = {
      labels: _.times(this.state.labelCount, (i) => i), 
      datasets: [{
          data: [],
          borderSkipped: 'left',
          backgroundColor: 'rgba(21, 101, 192, 0.8)',
          borderWidth: 0,
      }]
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      tooltips: { enabled: false },
      layout: {
        padding: { top: 10, left: 10, right: 10, bottom: 10}
      }
    }

    // Set title
    const title = this.props.title
    if( title ) {
      _.assign(options, {
        title:  { display: true, text: title }
      })
    }
  	return (
  		<div style={ _.assign(containerStyle, this.props.containerStyle) }>
        <Bar
          ref='chart'   
          data={ data } 
          options={ options }
        />
      </div>
    )
  }
}
export default FFTBarChart;