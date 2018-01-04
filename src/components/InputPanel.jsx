import React, { Component } from 'react';

import moment from 'moment';
import axios from 'axios';

import ItemList from './widgets/ItemList'
import './css-js/InputPanel.css'

class InputPanel extends Component {
  constructor(props) {
    super(props)

    this.state={
      allSensors: [],
      sensors: [],
      datetime: moment('2017-11-02 08:13:00').add(-1, 'days').format('YYYY-MM-DDTHH:mm'),
      duration: 10
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.getSelectedSensors = this.getSelectedSensors.bind(this);
  }
  
  handleChange(e){
    const target = e.target;
    const name = target.name;
    this.setState({[name]: e.target.value});
  }
  
  validateInput(){
    if(this.state.sensors.length === 0)  {
      alert('Pls choose at least one sensors.')
      return
    }
    const options = {
      datetime: moment(this.state.datetime),
      duration: this.state.duration
    }
    this.props.queryHandler(this.state.sensors, options)
  }

  // Callback from list of sensors
  getSelectedSensors(selectedSensors){
    this.setState({ sensors: selectedSensors })
  }

  componentDidMount() {
    axios.get('/all_sensors')
      .then((result)=> {
        if(result.data.status === 'OK') {
          this.setState({
            allSensors: result.data.data
          });  
        }
      })
  }  
  render() {

    return (
      <div className="">
        <div className="in-container">
          <div className="in-container">
            <div className="in-label">Date Time:</div>
            <input id="datetime" type="datetime-local" step="1" name="datetime" 
                  value={ this.state.datetime } onChange={this.handleChange}/>
          </div>
          <div className="in-container"> 
            <div className="in-label">Duration:</div>
            <input id='duration' type="number" min="1" max="10" name="duration" 
                  value={ this.state.duration } onChange={ this.handleChange }/>
          </div>
        </div>
        
        <div className="in-container">
          <div className="in-label">Sensor lists:</div>
          <ItemList className='item-list' id='sensors' 
                    items={ this.state.allSensors } getSelected={ this.getSelectedSensors }/>
        </div>
        
        <div className="in-container button-container">
          <button className="btn btn-success" onClick={ this.validateInput }>QUERY</button> 
        </div>
    </div>
    );
  }
}
export default InputPanel;
