import React, { Component } from 'react';

import shortid from 'shortid';
import _ from 'lodash';

import RadialGauge from './widgets/RadicalGauge'

import { WS } from '../config';

class CurrentSensorsPanel2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render() {
    const gauges = this.state.data.map((d, index) => {
      console.log(d)
      return <RadialGauge
        key={ index }
        units=''
        title={ d.name }
        colorTitle={'black'}
        fontTitleSize={40}
        value={ d.value }
        minValue={0} maxValue={100}  
        majorTicks={_.times(11, d=>100*d)}
        minorTicks={1}
        width={140}
        height={140}
      />
    })
    return gauges
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
      // [[source_1], [source_2]]
      const data = _.map(this.props.devices.source, (source, i)=>{
        return JSON.parse(socket.data)[this.sessionKey][source]
      })
      
      const updated_data = _.map(this.props.gauges, (g, i)=>{
        const p_0 = data[g.source[0][0]]? data[g.source[0][0]][g.source[0][1]] : null
        const p_1 = data[g.source[1][0]]? data[g.source[1][0]][g.source[1][1]] : null
        const p_2 = data[g.source[2][0]]? data[g.source[2][0]][g.source[2][1]] : null
        if(p_0 && p_1 && p_2) {
          return {
            name: g.name,
            value: Math.sqrt(3)*415*(p_0+p_1+p_2)/3
          }
        }
        return {
          name: g.name,
          value: 0
        }
      })
      console.log(updated_data)
      // Update state data of this panel
      this.setState({data: updated_data});
    }
  }
  componentsWillUnmount() {
    this.socket.close();
  }
}

export default CurrentSensorsPanel2;