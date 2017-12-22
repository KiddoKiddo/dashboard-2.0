import React, { Component } from 'react';
import RGL, {WidthProvider} from 'react-grid-layout';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// React Grid Layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Container from './components/Container'
import InputPanel from './components/InputPanel'
import ResultPanel from './components/ResultPanel'

const ReactGridLayout = WidthProvider(RGL);

// TODO Organize css style too messi here properly
const style = {
  font: {
    fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace'
  }, 
  container: {
    background: 'rgba(200, 200, 200, 0.3)',
  },
  prevNextBtn: {
    float: 'right',
    height: '100%',
    borderRadius: '5px',
    marginLeft: '10px'
  },
  datetime: {
    float: 'left',
    color: 'white'
  }
}

// TODO Organize config properly
const layout = {
    layout: [
      {i: 'input', x: 0, y: 0, w: 3, h: 15, static: true},
      {i: 'toolbar', x: 3, y: 0, w: 9, h: 1, static: true},
      {i: 'result', x: 3, y: 1, w: 9, h: 14, static: true},
    ],
    cols: 12,
    rowHeight: 50
}

class QueryDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [],
      options: {}
    }

    this.queryHandler = this.queryHandler.bind(this)
    this.prevTimeWindow = this.prevTimeWindow.bind(this)
    this.nextTimeWindow = this.nextTimeWindow.bind(this)
  }

  queryHandler(sensors, options){
    this.setState({ 
      sensors: sensors,
      options: options
    })
  }  

  prevTimeWindow() {
    const datetime = this.state.options.datetime
    if( ! datetime) return

    const duration = this.state.options.duration
    const options = Object.assign(this.state.options, {
      datetime: datetime.add(-1 * duration, 'second'),
      duration: duration
    })
    this.setState({ options: options })
  }

  nextTimeWindow() {
    const datetime = this.state.options.datetime
    if( ! datetime) return

    const duration = this.state.options.duration
    const options = Object.assign(this.state.options, {
      datetime: datetime.add(duration, 'second'),
      duration: duration
    })
    this.setState({ options: options })
  }

  render() {
    return (
      <ReactGridLayout className='layout' {...layout} style={ style.font }>
          <div key='input'>
            <Container panel={InputPanel} title='Input' 
                      queryHandler={ this.queryHandler }/>
          </div>
          <div key='toolbar' style={style.container}>
            {this.state.options.datetime && <div style={ style.datetime }>Query Time: { this.state.options.datetime.format('YYYY-MM-DD HH:mm:ss') }</div>}
            <button key='next' style={style.prevNextBtn} onClick={ this.nextTimeWindow }>NEXT</button>
            <button key='prev' style={style.prevNextBtn} onClick={ this.prevTimeWindow }>PREV</button>
          </div>
          <div key='result' style={style.container}>
            <ResultPanel sensors={ this.state.sensors } options={ this.state.options} />
          </div>
      </ReactGridLayout>
    )
  }
}
export default QueryDashboard;