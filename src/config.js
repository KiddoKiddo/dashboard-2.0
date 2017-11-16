const Config = { 
  websocket: {
    url: 'ws://localhost:8081/ws'
  },
  layout: {
    layout: [
      // First row
      {i: 'a', x: 0, y: 0, w: 8, h: 4, static: true},
      {i: 'b', x: 8, y: 0, w: 4, h: 3, static: true},

      // Second row
      {i: 'c', x: 0, y: 4, w: 8, h: 3, static: true},
      {i: 'd', x: 8, y: 3, w: 4, h: 4, static: true}
    ],
    cols: 12,
    rowHeight: 110,
    width: 1430,
    margin: [5, 5]
  }
};
export default Config;
