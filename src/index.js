import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';

// Config
import Config from './config';

// Widgets
import Container from './components/Container';
import VibrationSensorsPanel from './components/VibrationSensorsPanel';

// TODO Handle css here
import './css/index.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// React Grid Layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class App extends Component {

  render() {
    // Connfig for each widgets
    const widgets = {
      'vibration-sensors': {
        title: 'Vibration Sensors',
        panel: VibrationSensorsPanel,
      },
      'current-sensors': {
        title: 'Current Sensors'
      },
      'process-signal': {
        title: 'Process Signal'

      },
      'temperature-sensors': {
        title: 'Temperature'

      }
    }
    // Layout
    return ( 
      <ReactGridLayout className="layout" {...Config.layout}>
        <div key="a">
          <Container {...widgets['vibration-sensors']}/>
        </div>
        <div key="b">
          <Container {...widgets['current-sensors']}/>
        </div>
        <div key="c">
          <Container {...widgets['process-signal']}  />
        </div>
        <div key="d">
          <Container {...widgets['temperature-sensors']}  />
        </div>
      </ReactGridLayout>
    )
  }

  componentDidMount() {

  }
}
ReactDOM.render( 
  <App />,
  document.getElementById('root')
);