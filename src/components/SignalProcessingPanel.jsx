import React, { Component } from 'react';

import shortid from 'shortid'
import _ from 'lodash'

import FFTBarChart from './widgets/FFTBarChart'
import { WS } from '../config';

const containerStyle = {
  width: '30%', height: '90%',
  margin: '0 1% 0',
  background: 'rgba(255, 255, 255, 0.8)',
  display: 'inline-block',
  borderRadius: '2px'
}

class SignalProcessingPanel extends Component {
  state = {
    data: [],
    max: undefined
  }

  render() {
    const barCharts = this.state.data.map( (d, i) => {
      return <FFTBarChart 
                key={d.key}
                containerStyle={ containerStyle }
                data={d.values}
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
      const subscription = {}
      subscription[this.sessionKey] = this.props.devices

      // Send subscription
      this.socket.send(JSON.stringify(subscription))
    }

    // Update websocket once receiving messages
    this.socket.onmessage = (socket) => {
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      // TODO: change data format when rewrite the websocket portion
      const data = JSON.parse(socket.data)[this.sessionKey]
      let max = 0
      const updated_data = Object.keys(data).map((channel) => {
        // To find overall max across all charts
        max = _.max([_.max(data[channel]), max])
        return {  key: channel, label: channel, values: data[channel] }
      })
      // Rounded max
      // const order = Math.floor(Math.log10(max))+1
      // max = Math.pow(10, order)

      // Update state data of this panel
      if(updated_data.length > 0) {
        this.setState({
          data: updated_data,
          max: max
        });
      }
    }
  }
  componentsWillUnmount() {
    this.socket.close();
  }
}

export default SignalProcessingPanel;