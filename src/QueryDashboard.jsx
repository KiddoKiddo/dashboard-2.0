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
  container: {
    background: 'rgba(200, 200, 200, 0.3)'
  },
  prevNextBtn: {
    float: 'right',
    height: '100%',
    borderRadius: '5px',
    marginLeft: '10px'
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

    }

    this.prevTimeWindow = this.prevTimeWindow.bind(this)
    this.nextTimeWindow = this.nextTimeWindow.bind(this)
  }

  prevTimeWindow() {
    this.setState({ next: false })
  }

  nextTimeWindow() {
    this.setState({ next: true })
  }

  render() {
    return (
      <ReactGridLayout className='layout' {...layout}>
          <div key='input'>
            <Container panel={InputPanel} title='Input' nextTimeWindow={ this.state.next } />
          </div>
          <div key='toolbar' style={style.container}>
            <button key='next' style={style.prevNextBtn} onClick={ this.nextTimeWindow }>NEXT</button>
            <button key='prev' style={style.prevNextBtn} onClick={ this.prevTimeWindow }>PREV</button>
          </div>
          <div key='result' style={style.container}>
            <ResultPanel sensors options />
          </div>
      </ReactGridLayout>
    )
  }
}
export default QueryDashboard;