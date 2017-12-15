import React, { Component } from 'react';

import shortid from 'shortid'
import _ from 'lodash'

import RadialGauge from './widgets/RadicalGauge'
import DynamicLineChart from './widgets/DynamicLineChart'

import { WS } from '../config';
import { style } from './css-js/VibrationSensorsPanel.css'

class VibrationSensorsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      hidden: []
    }
    this.handleClickGauge = this.handleClickGauge.bind(this)
    this.showAll = this.showAll.bind(this)
  }

  // To handle click on Gauge and change legend on chart
  handleClickGauge(index) {
    this.setState({
      hidden: Array.from(new Array(this.state.data.length), (d, i) => i!==index)
    })
    console.log(this.state.data[index]['fft'])
    this.props.set('c', { // Set to Signal Processing panel (refer to config.js and SensorWidgets_PROD.js)
      device: this.state.data[index]['label'],
      fft: this.state.data[index]['fft']
    })
  }
  // To show all the gauge again
  showAll() {
    this.setState({
      hidden: Array.from(new Array(this.state.data.length), (d, i) => false)
    })
  }

  render() {
    const gauges = this.state.data.map((d, index) => {
      return <RadialGauge
         key={ 'gauge-'+index }
         units=''
         title={ d.label }
         colorTitle={'black'}
         fontTitleSize={40}
         value={ d.values[0] }
         minValue={0} maxValue={15}  
         majorTicks={['0', '2', '4', '6', '8', '10  ', '12', '14']}
         minorTicks={1}
         width={style.gauge.width}
         height={style.gauge.height}

         clickHandler={() => { this.handleClickGauge(index) }}
      />
    })
    const timeseries = <DynamicLineChart
        key='timeseries'
        data={this.state.data}
        maxItems={50}
        containerStyle={ style.chart }
        options={{
          elements: { point: {radius: 1}}
        }}
        hidden={ this.state.hidden }
      />
    const showAllBtn = <button key="all" onClick={ this.showAll } style={ style.allButton } >ALL</button>
    return ([ gauges, timeseries, showAllBtn ])
  }

  componentDidMount() {
    // Websocket initialization
    this.socket = new WebSocket(WS.url)
    this.socket.onopen = () => {
      // Setup subscription
      const subscription = {}
      const init_data = []
      this.props.devices.forEach((d) => {
        const sessionKey = shortid.generate()
        subscription[sessionKey] = d 

        // To setup init data array
        init_data.push({
          key: d.device, 
          label: d.device,
          source: d.source, 
          sessionKey: sessionKey,
          fft: d.fft,
          values: [],
          emptyCount: 0
        })
      })

      // Send subscription
      this.socket.send(JSON.stringify(subscription))

      // Init data & hidden flag 
      this.setState({
        data: init_data,
        hidden: _.times(_.size(init_data), false)
      })
    }

    this.socket.onmessage = (socket) => {
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      const data = JSON.parse(socket.data)

      const updated_data = this.state.data.map((d) => {
        // new_data format:
        // {<channel_name>: [<data>]}
        const new_data = data[d['sessionKey']]
        if( ! _.isEmpty(new_data)) {
          d['values'] = [ _.values(new_data)[0][1] ]
          d['emptyCount'] = 0 // Reset counter
        } else {
          // If the source repeatively receiving no data, set to 0
          // To smooth sudden the needle position because of ONE occasion of no data
          if(d['emptyCount'] > 5){
            d['emptyCount'] = 0
            d['values'] = []
          } else {
            d['emptyCount'] = d['emptyCount'] + 1
          }
        }
        return d
      })
      
      this.setState({ data: updated_data });
    }
  }

  componentsWillUnmount() {
    this.socket.close();
  }
}

export default VibrationSensorsPanel;