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
        'device': 'X Right Guide X',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X Right Guide Y',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X Right Guide Z',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z ball screw X',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z ball screw Y',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z ball screw Z',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z inner guide X',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z inner guide Y',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z inner guide Z',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z outer guide X',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
            {
        'device': 'Z outer guide Y',
        'source':['12345'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z outer guide Z',
        'source':['123456'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Operation area X',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Operation area Y',
        'source':['abcde'],
        'filter':[{'process':'range'}]
      },
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
      'source': [ '#2#B-X-FFT', '#2#B-Y-FFT', '#2#B-Z-FFT'],
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
    ]
  }  
]
export default Widgets_DEVELOPMENT;