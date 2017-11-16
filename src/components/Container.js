import React, { Component } from 'react';

import '../css/Container.css'

/*
  To contain different components
*/
class Container extends Component{
  render() {
    const Panel = this.props.panel;
    const className = this.props.className || 'widget-container';
    return (
        <div className={className}>
          <span>{this.props.title}</span>
          {Panel? <Panel {...this.props} /> : ''}
        </div>
    )
  }
}

export default Container;