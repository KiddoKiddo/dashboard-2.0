import React, { Component } from 'react';
import RGL, {WidthProvider} from 'react-grid-layout';

// Config IMPORTANT: To define layout and what layout to include
import { Layout, Widgets } from './config';

// Widgets
import Container from './components/Container';

// React Grid Layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

class SensorsDashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.setDataForParent = this.setDataForParent.bind(this)
  }

  setDataForParent(panelPos, data) {
    this.setState({ [panelPos]: data })
  }

  renderWidget(config) {
    return (
      <div key={ config['pos'] }> 
        <Container {...config} 
          set={ this.setDataForParent } 
          dataFromParent={ this.state[config['pos']] }
        /> 
      </div>
    )
  }

  render() {
    const widgets = Widgets.map((config, i) => this.renderWidget(config))
    return ( 
      <ReactGridLayout className='layout' {...Layout}>
        { widgets }
      </ReactGridLayout>
    )
  }

  componentDidMount() {

  }

}
export default SensorsDashboard;