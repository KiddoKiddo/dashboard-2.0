import React, { Component } from 'react';

import shortid from 'shortid'

import DynamicLineChart from './widgets/DynamicLineChart'
import { WS } from '../config';

class CurrentSensorsPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render() {
    return <DynamicLineChart
      data={this.state.data}
      maxItems={20} // 20 points in the chart
      containerStyle={{
        height: '90%',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '2px'
      }}
      options={{
        animation: false,
        legend: {
          position: 'bottom'
        }
      }}
    />
  }

  componentDidMount(props) {
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
      const updated_data = Object.keys(data).map((channel) => {
        return {  key: channel, label: channel, values: data[channel] }
      })
      // Update state data of this panel
      this.setState({data: updated_data});
    }
  }
  componentsWillUnmount() {
    this.socket.close();
  }
}

export default CurrentSensorsPanel;