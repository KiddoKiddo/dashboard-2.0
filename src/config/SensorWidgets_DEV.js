import VibrationSensorsPanel from '../components/VibrationSensorsPanel';
import CurrentSensorsPanel from '../components/CurrentSensorsPanel';
import SignalProcessingPanel from '../components/SignalProcessingPanel';
import MachineTemperaturePanel from '../components/MachineTemperaturePanel';

const Widgets_DEVELOPMENT = [
  {
    // This is for vibration sensors with
    pos: 'a', // Match with 'i' in layoutt 
    title: 'Vibration Sensors',
    panel: VibrationSensorsPanel,
    devices: [
      {
        'device': 'Main spindle front bearing',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Main spindle rear bearing',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-drive X',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-drive Y',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-drive Z',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive X',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive Y',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive Z',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
            {
        'device': 'Z-drive X',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-drive Y',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-drive Z',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 1',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 2',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
            {
        'device': 'Y-slide 1',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 2',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 1',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 2',
        'source':['12345'],
        'filter':[{'process':'range'}]
      }
    ]
  },
  {
    pos: 'b',
    title: 'Current Sensors',
    panel: CurrentSensorsPanel,
    devices: {
      'source': [ '#2#COU', '#2#COV', '#2#COW', '#2#YU'],
      'filter': [{'process': 'interlace', 'argument': 100 }]
    }
  },
  {
    pos: 'c',
    title: 'Process Signal',
    panel: SignalProcessingPanel,
    devices: {
      'source': ['#2#B-X-FFT', '#2#B-Y-FFT', '#2#B-Z-FFT'],
      'filter': [{"process": "group", "argument": 10}]
    }
  },
  {
    pos: 'd',
    title: 'Temperature',
    panel: MachineTemperaturePanel,
    devices: [
      { key: 1, source: '12345'},
      { key: 2, source: '123456'},
      { key: 3, source: 'abcde'},
      { key: 4, source: '12345'},
      { key: 5, source: '12345'},
      { key: 6, source: 'abcde'},
      { key: 7, source: '123456'},
      { key: 8, source: 'abcde'},
      { key: 9, source: '123456'},
      { key: 10, source: 'abcde'},
      { key: 11, source: 'abcde'},
      { key: 12, source: 'abcde'},
    ]
  }  
]
export default Widgets_DEVELOPMENT;