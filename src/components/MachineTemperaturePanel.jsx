import React, { Component } from 'react';

import shortid from 'shortid'
import _ from 'lodash'

import { WS } from '../config';
import SVGBackground from '../img/machine-temperature.svg';

class MachineTemperaturePanel extends Component {
  state = {
    data: [
      { key: 1, pos: {top: '15', left: '-7'}, value: 26 },
      { key: 2, pos: {top: '37', left: '-9'}, value: 26 },
      { key: 3, pos: {top: '37', left: '16'}, value: 26 },
      { key: 4, pos: {top: '57', left: '-9'}, value: 26 },
      { key: 5, pos: {top: '92', left: '-9'}, value: 26 },
      { key: 6, pos: {top: '92', left: '19'}, value: 26 },
      { key: 7, pos: {top: '92', left: '70'}, value: 26 },
      { key: 8, pos: {top: '92', left: '97'}, value: 26 },
      { key: 9, pos: {top: '57', left: '97'}, value: 26 },
      { key: 10, pos: {top: '74', left: '70'}, value: 26 },
    ]
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <img src={ SVGBackground } alt='Machine Map'/>
        <SVGText values={this.state.data} />
      </div>
    )
  }

  componentDidMount() {
    // Websocket initialization
    this.socket = new WebSocket(WS.url)
    this.socket.onopen = () => {
      // Setup subscription
      const subscription = {}
      this.sessionKey = shortid.generate()
      subscription[this.sessionKey] = {
        source: _.map(this.props.devices, 'source')
      }

      // Send subscription
      this.socket.send(JSON.stringify(subscription))
    }

    // Update websocket once receiving messages
    this.socket.onmessage = (socket) => {
      const ws_data = JSON.parse(socket.data)[this.sessionKey]

      // Update state data
      const updated_data = this.state.data.map((d, i) => {
        const source = _.find(this.props.devices, ['key', d.key])['source']
        d['value'] = ws_data[source][0].toFixed(1) // UGLY FIX THIS
        return d
      })
      if(updated_data.length > 0){
        this.setState({data: updated_data})  
      }
    }
  }

  componentsWillUnmount() {
    this.socket.close();
  }
}
export default MachineTemperaturePanel;

// To place a SVG overlay over a picture and place text on top
// For text position to scale with the pictures
function SVGText (props) {
  const unitHTML = '&deg;C'
  const textStyle = {
    textAnchor: 'center',
    fontSize: 4,
    fontWeight: 'bold',
    fill: '#ff0000aa'
  }
  const measures = props.values.map((d, i) => {
    return (
      <text key={i} x={d.pos.left} y={d.pos.top} style={ textStyle }>
        {d.value}<tspan dangerouslySetInnerHTML={{__html: unitHTML}}></tspan>
      </text>
    )
  })
  return (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {measures}
    </svg>
  );
}