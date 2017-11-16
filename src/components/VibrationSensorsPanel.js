import React, { Component } from 'react';

import {RadialGauge} from 'react-canvas-gauges'

import DynamicLineChart from './widgets/DynamicLineChart'
import Config from '../config';

class VibrationSensorsPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }
  render() {
    let gauges = this.state.data.map((datum, index) => {
      return <RadialGauge
         key={'gauge-'+index}
         units='<unit>'
         title={datum.channel}
         value={datum.value} // [min, avg, max] because of filter {'process': 'range'}
         minValue={0}
         maxValue={15}  
         majorTicks={['0', '2', '4', '6', '8', '10', '12', '14']}
         minorTicks={1}
         animation ={true}
         animationRule='linear'
         animationDuration={1000}
         width={120}
         height={120}
      />
    })
    return ([ 
      gauges,
      <DynamicLineChart
        key='timeseries'
        data={this.state.data}
        maxItems={20} // 20 points in the chart
      />
    ])
  }
  componentDidMount() {
    // Websocket initialization
    this.socket = new WebSocket(Config.websocket.url)
    this.socket.onopen = () => {
      let config = {
        "gauge-1":{"source":["123456"],"filter":[{"process":"range"}]},
        "gauge-2":{"source":["abcde"],"filter":[{"process":"range"}]},
        "gauge-3":{"source":["12345"],"filter":[{"process":"range"}]},
      }
      this.socket.send(JSON.stringify(config))
    }
    this.socket.onmessage = (socket) => {
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      // TODO: change data format when rewrite the websocket portion
      let data = JSON.parse(socket.data)
      let updated_data = Object.keys(data).map((sessionKey) => {

        // TODO Change when rewriting WS portion 
        let source = data[sessionKey]
        let channel = Object.keys(source)[0] // only one map each sessionKey
        let values = source[channel]
        return { sessionKey: sessionKey, channel: channel, value: values[1] }
      })
      this.setState({data: updated_data});
    }
  }
  componentsWillUnmount() {
    this.socket.close();
  }
}

export default VibrationSensorsPanel;