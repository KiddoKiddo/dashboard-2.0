import React, { Component } from 'react';

import moment from 'moment'

import ItemList from './widgets/ItemList'
import './css-js/InputPanel.css'

class InputPanel extends Component {
  constructor(props) {
    super(props)

    this.state={

    };
    this.handleChange = this.handleChange.bind(this);
    this.queryHandler = this.queryHandler.bind(this);
    this.getSelectedSensors = this.getSelectedSensors.bind(this);
  }
  
  handleChange(e){
    const target = e.target;
    const value = target.type === 'checkbox'? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: e.target.value});
  }

  queryHandler(e){
    console.log(this.state)
  }
  
  // Callback from list of sensors
  getSelectedSensors(selectedSensors){
    this.sensors = selectedSensors
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }
  
  render() {
    // TODO Getting from API (pending for API)
    const sensors = [
      { id: '1', 'name': 'one'},
      { id: '2', 'name': 'two'},
      { id: '3', 'name': 'three'},
      { id: '4', 'name': 'four'},
      { id: '5', 'name': 'five'},
      { id: '6', 'name': 'six'},
      { id: '7', 'name': 'one'},
      { id: '8', 'name': 'two'},
      { id: '9', 'name': 'three'},
      { id: '10', 'name': 'four'},
      { id: '11', 'name': 'five'},
      { id: '12', 'name': 'six'},
    ]

    return (
      <div className="">
        <div className="in-container">
          <div className="in-container">
            <div className="in-label">Date Time:</div>
            <input id="datetime" type="datetime-local" step="1" value={this.state.datetime} onChange={this.handleChange}/>
          </div>
          <div className="in-container"> 
            <div className="in-label">Duration:</div>
            <input id='duration' type="number" min="1" max="10" defaultValue="5" value={this.state.duration} onChange={this.handleChange}/>
          </div>
        </div>
        
        <div className="in-container">
          <div className="in-label">Sensor lists:</div>
          <ItemList className='item-list' id='sensors' items={sensors} getSelected={this.getSelectedSensors}/>
        </div>
        
        <div className="in-container button-container">
          <button className="btn btn-success" onClick={ this.queryHandler }>QUERY</button> 
        </div>
    </div>
    );
  }
}
export default InputPanel;
