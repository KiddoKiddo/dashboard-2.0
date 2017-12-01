import React from 'react';

/*
  Wrapper with title around each Panel
*/
const style = {
  'container': {
    background: 'rgba(200, 200, 200, 0.3)',
    width: '100%',
    height: '100%',
    padding: 10
  },
  'title': {
    color: 'rgba(255, 255, 255, 0.8)',
    borderBottom: '1px rgba(255, 255, 255, 0.8) solid',
    padding: 5,
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))',
    marginBottom: 5
  }
}

const Container = (props) => {
  const Panel = props.panel;
  return (
      <div style={style.container}>
        <div key='title' style={style.title}>{ props.title }</div>
        {<Panel {...props} />}
      </div>
  )
}
export default Container;