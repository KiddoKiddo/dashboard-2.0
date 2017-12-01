import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';

class FFTBarChart extends Component {
  state = {
      labelCount: 120
  }

  componentWillReceiveProps(props){
    const chart  = this.refs.chart.chart_instance

    // Update data
    chart.data.datasets[0].data = props.data

    // Update number of label (if any)
    if(props.data.length !== this.state.labelCount) {
      chart.data.labels = Array.from(new Array(props.data.length), (d, i) => i )
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
      labels: Array.from(new Array(120), (d, i) => i ), 
      datasets: [{
          data: [],
          borderSkipped: 'left',
          backgroundColor: 'rgba(21, 101, 192, 0.8)',
          borderWidth: 0,
      }]
    }

  	return (
  		<div style={this.props.containerStyle}>
        <Bar
          ref='chart'   
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: false,
            tooltips: { enabled: false },
            layout: {
              padding: { top: 10, left: 10, right: 10, bottom: 10}
            } 
          }}
        />
      </div>
    )
  }
}
export default FFTBarChart;