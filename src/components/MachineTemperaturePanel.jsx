import React, { Component } from 'react';

import shortid from 'shortid'
import _ from 'lodash'

import { WS } from '../config';
import background from '../img/machine-temperature.png';

const style = {
  background: {
    width: '100%'
  },
  textStyle: {
    textAnchor: 'middle',
    fontSize: 2.5,
    fontWeight: 'bold',
    fill: '#ff0000aa'
  }
}

class MachineTemperaturePanel extends Component {
  state = {
    data: [
      { key: 1, label: 'Spindle',           pos: {top: '43.5', left: '0'}, value: 1 },
      { key: 2, label: 'SHOE Z LEFT FRONT', pos: {top: '55', left: '35'}, value: 2 },
      { key: 3, label: 'NUT Z',             pos: {top: '53', left: '53'}, value: 3 },
      { key: 4, label: 'SHOE Z RIGHT REAR', pos: {top: '55', left: '82'}, value: 4 },
      { key: 5, label: 'BED Z RIGHT REAR',  pos: {top: '60', left: '102'}, value: 5 },
      { key: 6, label: 'BED Z LEFT REAR',   pos: {top: '34', left: '20'}, value: 6 },
      { key: 7, label: 'SHOE X FRONT DOWN', pos: {top: '22', left: '27'}, value: 7 },
      { key: 8, label: 'SHOE Z LEFT REAR',  pos: {top: '6', left: '32'}, value: 8 },
      { key: 9, label: 'SHOE X FRONT UP',   pos: {top: '4', left: '64'}, value: 9 },
      { key: 10, label: 'SHOE X REAR UP',   pos: {top: '5', left: '80'}, value: 10 },
      { key: 11, label: 'NUT X',            pos: {top: '14', left: '83'}, value: 11 },
      { key: 12, label: 'SHOE X REAR DOWN', pos: {top: '21', left: '92'}, value: 12 },
    ]
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <img src={ background } alt='Machine Map' style={style.background} />
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
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      const ws_data = JSON.parse(socket.data)[this.sessionKey]

      // Update state data
      const updated_data = this.state.data.map((d, i) => {
        const device = _.find(this.props.devices, ['key', d.key])
        if( device ){
          if( ws_data[device['source']] ){
            d['value'] = ws_data[device['source']][0].toFixed(1) // UGLY FIX THIS
            d['emptyCount'] = 0 // Reset counter
          }else{
            // If the source repeatively receiving no data, set to 0
            // To smooth sudden the needle position because of ONE occasion of no data
            if( ! d['emptyCount']) d['emptyCount'] = 0
            if(d['emptyCount'] > 10){
              d['emptyCount'] = 0
              d['value'] = '-'
            } else {
              d['emptyCount'] = d['emptyCount'] + 1
            }
          }
        }
        return d
      })
      this.setState({data: updated_data});
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
  const measures = props.values.map((d, i) => {
    return (
      <text key={i} x={d.pos.left} y={d.pos.top} style={ style.textStyle }>
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