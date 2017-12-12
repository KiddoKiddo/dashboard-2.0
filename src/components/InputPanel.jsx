import React, { Component } from 'react';

import ItemList from './widgets/ItemList'
import './css-js/InputPanel.css'

class InputPanel extends Component {
  constructor(props) {
    super(props)

	this.state={datatype:[]};
	this.handleChange = this.handleChange.bind(this);
	this.handleChkBox = this.handleChkBox.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
    this.getSelectedSensors.bind(this);
  }
  
  handleChange(e){
	  this.setState({[e.target.id]: e.target.value});
  }
  
  handleChkBox(e){
	  const target = e.target;
	  const value = target.type === 'checkbox'? target.checked : target.value;
	  const name = target.name;
	  this.setState({[name] : value});
	  
	  // Store datatypes as array
	  // const datatype = this.state.datatype;
	  // datatype.push({[name]:value});
	  // this.setState({datatype: datatype});
  }

  onSubmit(e){
	e.preventDefault();
	console.log(this.state)
  }
  
  // Callback from list of sensors
  getSelectedSensors(selectedSensors){
    // TODO store selected sensors   
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
    ]

    return (
		<form onSubmit={this.onSubmit}>
			<div className="in-container txtbox-container">
				<div className="in-container">
					<input id="datetime" type="datetime-local" step="1" value={this.state.datetime} onChange={this.handleChange}/>
				</div>
				<div className="in-container"> 
					<label>Duration:</label>
					<input id='duration' type="number" min="1" max="10" value={this.state.duration} onChange={this.handleChange}/>
					<label>&nbsp;s</label>
				</div>r
			</div>
			
			<div className="in-container checkbox-container">
				<label>Data Type:</label>
				<label><input type="checkbox" id='datatype' name='FFT' checked={this.state.FFT} onChange={this.handleChkBox}/>FFT</label>
				<label><input type="checkbox" id='datatype' name='RMS' checked={this.state.RMS} onChange={this.handleChkBox}/>RMS</label>
				<label><input type="checkbox" id='datatype' name='PKPK' checked={this.state.PKPK} onChange={this.handleChkBox}/>Pk-Pk</label>
			</div>
			
			<div className="in-container list-container">
				<label>Sensor lists:</label>
				<ItemList className='item-list' id='sensors' items={sensors} getSelected={this.getSelectedSensors}/>
			</div>
			
			<div className="in-container button-container">
				<button id='query-btn' type="submit">QUERY</button> 
			</div>
		</form>
    );
  }
}
export default InputPanel;
