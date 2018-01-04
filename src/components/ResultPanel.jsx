import React, { Component } from 'react';

import ReactList from 'react-list';
import ResultItem from './widgets/ResultItem'

class ResultPanel extends Component {

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(index, key) {
    return <ResultItem 
    	key={index}
    	sensor={ this.props.sensors[index] }
    	options={ this.props.options }
    />
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{ overflow: 'auto', height: '100%' }}>
          <ReactList
            itemRenderer={ this.renderItem }
            length={this.props.sensors.length}
            type='uniform'
            minSize={10}
          />
        </div>
      </div>
    )
  }
}
export default ResultPanel;