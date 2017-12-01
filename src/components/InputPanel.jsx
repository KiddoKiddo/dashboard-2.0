import React, { Component } from 'react';

import ItemList from './widgets/ItemList'

class InputPanel extends Component {
  constructor(props) {
    super(props)

    this.getSelectedSensors.bind(this)
  }

  // Callback from list of sensors
  getSelectedSensors(selectedSensors){
    // TODO store selected sensors   
  }

  render() {
    // TODO Getting from API
    const items = [
      { id: '1', 'name': 'one'},
      { id: '2', 'name': 'two'},
      { id: '3', 'name': 'three'},
      { id: '4', 'name': 'four'},
      { id: '5', 'name': 'five'},
      { id: '6', 'name': 'six'},
    ]

    return ([
      // <DateTimePicker/>,
      // <DataTypeSelection/>,
      <ItemList key='item-list' items={items} getSelected={this.getSelectedSensors}/>,
      <button key='query-btn'>QUERY</button>, 
    ])
  }
}
export default InputPanel;