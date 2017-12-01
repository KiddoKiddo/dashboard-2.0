import React, { Component } from 'react';

const style={
  container: {
    height: 200,
    autoflowY: 'auto'
  }
}

class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
    this.handleClickItems.bind(this)
  }
  handleClickItems(id) {
    const selected = this.state.selected.slice()
    if(selected.includes(id)){
      selected.splice(selected.indexOf(id), 1)
    }else{
      selected.push(id)
    }

    // Update selected state
    this.setState({
      selected: selected
    })

    // Pass data to parent (if any)
    if( this.props.getSelected ) {
      this.props.getSelected(selected)
    }
  }
	render() {
    const list = this.props.items.map((d, i) => 
        <a val={d.id} key={d.id}   
          className={'list-group-item list-group-item-action '+ (this.state.selected.includes(d.id) && 'active')}
          onClick={() => this.handleClickItems(d.id)}>{d.name}
        </a>)
    
		return (
      <div key='panel' style={style.container}>
        <div className="list-group">
          {list}
        </div>
      </div>
    )
	}
}
export default ItemList; 