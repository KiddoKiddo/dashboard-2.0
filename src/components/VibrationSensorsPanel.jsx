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
  }

  showAll() {
    this.setState({
      hidden: Array.from(new Array(this.state.data.length), (d, i) => false)
    })
  }

  render() {
    const gauges = this.state.data.map((datum, index) => {
      return <RadialGauge
         key={ 'gauge-'+index }
         units=''
         title={ datum.label }
         value={ datum.values[0] }
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
      this.subscription = {}
      this.props.devices.forEach((d, i) => {
        this.subscription[shortid.generate()] = d
      })

      // Send subscription
      this.socket.send(JSON.stringify(this.subscription))
    }

    this.socket.onmessage = (socket) => {
      // Data format
      // {'<sessionKey>': {<channel_name>: [<data>] }}
      // TODO: change data format when rewrite the websocket portion
      const data = JSON.parse(socket.data)

      const updated_data = _.keys(data).map((sessionKey) => {
        const d = data[sessionKey]
        const config = this.subscription[sessionKey]
        return {  
          key: config.device, 
          label: config.device, 
          values: [ _.values(d)[0][1]] } // UGLY FIX THIS
        }
      )

      // Update state data of this panel
      const newState = { data: updated_data }

      // Init hidden array (if any)
      if(this.state.hidden.length === 0) {
        newState['hidden'] = _.times(updated_data.length, false)
      }
      
      this.setState(newState);
    }
  }

  componentsWillUnmount() {
    this.socket.close();
  }
}

export default VibrationSensorsPanel;