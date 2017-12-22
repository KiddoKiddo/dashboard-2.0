import Widgets_PRODUCTION from './config/SensorWidgets_PROD'
import Widgets_DEVELOPMENT from './config/SensorWidgets_DEV'

// Setup enviroment 
const ENV = 'DEVELOPMENT' // 'DEVELOPMENT' or 'PRODUCTION'

export const WS = { 
  url: 'ws://localhost:5001/ws'
};

export const Layout = {
  layout: [
    // First row
    {i: 'a', x: 0, y: 0, w: 8, h: 6, static: true},
    {i: 'b', x: 8, y: 0, w: 4, h: 5, static: true},
    // Second row
    {i: 'c', x: 0, y: 6, w: 8, h: 4, static: true},
    {i: 'd', x: 8, y: 5, w: 4, h: 5, static: true}
  ],
  cols: 12,
  rowHeight: 80
};

export const Widgets = ENV === 'PRODUCTION' ? Widgets_PRODUCTION : Widgets_DEVELOPMENT;

