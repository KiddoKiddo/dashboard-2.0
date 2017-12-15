import React, { Component } from 'react';

import ReactList from 'react-list';
import _ from 'lodash'

import ResultItem from './widgets/ResultItem'

class ResultPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accounts: _.times(200, {
    	  name: 'somename',
        id: 'someid'
      })
    }

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(index, key) {
    return <ResultItem 
    	key={index}
    	sensor={{
    		name: 'Sensor Name',
    		id: ''
    	}}
    	options={ this.props.options }
    />
  }

  render() {
  	// BUG: First item is not rendered after scroll back
    return (
      <div style={{ height: '100%' }}>
        <div style={{ overflow: 'auto', height: '100%' }}>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.state.accounts.length}
            type='uniform'
            minSize={10}
          />
        </div>
      </div>
    )
  }
}
export default ResultPanel;