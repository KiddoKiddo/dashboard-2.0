import React, { Component } from 'react';

import shortid from 'shortid'
// import _ from 'lodash'

import FFTBarChart from './widgets/FFTBarChart'
import { WS } from '../config';

class SignalProcessingPanel extends Component {
  state = {
    data: [],
    max: undefined
  }

  // To receive event of gauge clicking from Vibration Sensors Panel
  componentWillReceiveProps(props){
    const new_source = props.dataFromParent['fft']
    this.subscription[this.sessionKey] = Object.assign(this.subscription[this.sessionKey], {source: new_source})
    this.socket.send(JSON.stringify(this.subscription))
  }

  render() {
    const titles = ['X-axis', 'Y-axis', 'Z-axis']
    const barCharts = this.state.data.map( (d, i) => {
      return <FFTBarChart 
                title={titles[i]}
                key={d.key}
                data={d.values}
                containerStyle={{
                  width: '30%', height: '90%',
                  margin: '0 1% 0',
                  display: 'inline-block'
                }}
                max={this.state.max}
            />
    })
    return barCharts
  }

  componentDidMount() {
    // Websocket initialization
    this.socket = new WebSocket(WS.url)
    this.socket.onopen = () => {
      // Setup subscription
      this.sessionKey = shortid.generate()
      this.subscription = {}
      this.subscription[this.sessionKey] = this.props.devices

      // Send subscription
      this.socket.send(JSON.stringify(this.subscription))
    }

    // Update websocket once receiving messages
    this.socket.onmessage = (socket) => {
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      const data = JSON.parse(socket.data)[this.sessionKey]
      const updated_data = Object.keys(data).map((channel) => {
        return {  key: channel, label: channel, values: data[channel] }
      })

      // Update state data of this panel
      if(updated_data.length > 0) {
        this.setState({
          data: updated_data,
          max: 0.1 // Temp set to fixed max
        });
      }
    }
  }
  componentsWillUnmount() {
    this.socket.close();
  }
}

export default SignalProcessingPanel;