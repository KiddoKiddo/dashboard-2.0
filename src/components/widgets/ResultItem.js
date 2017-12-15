import React, { Component } from 'react';

import _ from 'lodash'

import FFTBarChart from './FFTBarChart'

const style = {
  container: {
    background: '',
    padding: 10,
    color: 'white',
    fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace'
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
    
  }

  componentWillReceiveProps(props){
    
  }

  render() {
    const sensor = this.props.sensor
    const options = this.props.options

    const data = _.times(120, () => Math.random())
  	return (
      <div style={ style.container }>
        <div style={ style.title }>Sensor Name</div>
        <FFTBarChart data={ data }/>
        <div style={ style.valueContainer  }>
          RMS: 
          <br/>
          Pk - Pk:
        </div>
        <hr style={{ margin: 0 }}/>
      </div>
    )
  }
}
export default ResultItem;