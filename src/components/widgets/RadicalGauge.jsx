import React, { Component } from 'react'

import { RadialGauge } from 'canvas-gauges'

class ReactRadialGauge extends Component {
  state = {
    noDataCount: 0
  }
  componentDidMount () {
    const options = Object.assign({}, this.props, {
      renderTo: this.el
    })
    this.gauge = new RadialGauge(options).draw()
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.value !== undefined && nextProps.value !== null){
      this.gauge.value = nextProps.value.toFixed(3)
      this.setState({ noDataCount: 0 })
    } else {
      this.setState({ noDataCount: this.state.noDataCount + 1})

      if(this.state.noDataCount > 5) {
        this.gauge.options['colorPlate'] = '#ffb5b5'
        this.gauge.update()
      }
    }
  }

  shouldComponentUpdate() {
    return false // manually re-render to resolve metadata problem
  }

  render(){
    return (
      <canvas ref={(canvas) => { this.el = canvas }} 
              onClick={ this.props.clickHandler }
      />
    )
  }
}

export default ReactRadialGauge;