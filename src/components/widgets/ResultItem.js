import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';

import FFTBarChart from './FFTBarChart'

const style = {
  container: {
    background: '',
    padding: 10,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  valueContainer: {
    margin: '5px 0'
  }
}

class ResultItem extends Component {
  state = {
    sensor: {},
    RMS: 0, PP: 0, FFT: [],
    hasData: false
  }

  componentWillReceiveProps(props){
    const sensor = props.sensor
    const options = props.options
    axios.get('/data_by_sensor_id/'+sensor.id
        +'?datetime='+options.datetime.format('YYYYMMDDkkmmss')
        +'&duration='+options.duration)
      .then((result)=> {
        if(result.data.status === 'OK') {
          const data = result.data.data

          if(data.length == 0) {
            this.setState({ hasData: true })
            return;
          }

          this.setState({
            hasData: true,
            sensor: sensor,
            PP: _.find(data, ['type', 'PP'])['data'],
            RMS: _.find(data, ['type', 'RMS'])['data'],
            FFT:  _.find(data, ['type', 'FFT'])['data']
          });  
        }
      })
  }

  render() {
  	return (
      <div style={ style.container }>
        <div style={ style.title }>{ this.state.sensor.name }</div>
          <FFTBarChart data={ this.state.FFT }/>
          <div style={ style.valueContainer  }>
            RMS: { this.state.RMS }
            <br/>
            Pk - Pk: { this.state.PP }
          </div>
        <hr style={{ margin: 0 }}/>
      </div>
    )
  }
}
export default ResultItem;