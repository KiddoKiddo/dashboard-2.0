import React, { Component } from 'react'

import { RadialGauge } from 'canvas-gauges'

class ReactRadialGauge extends Component {
  componentDidMount () {
    const options = Object.assign({}, this.props, {
      renderTo: this.el
    })
    this.gauge = new RadialGauge(options).draw()
  }

  componentWillReceiveProps (nextProps) {
    this.gauge.update({
      value: nextProps.value
    })
  }

  shouldComponentUpdate() {
    return false // manually re-render to resolve metadata problem
  }

  render () {
    return (
      <canvas ref={(canvas) => {
        this.el = canvas
      }} 
              onClick={ this.props.clickHandler }
      />
    )
  }
}

export default ReactRadialGauge