import VibrationSensorsPanel from '../components/VibrationSensorsPanel';
import CurrentSensorsPanel from '../components/CurrentSensorsPanel';
import CurrentSensorsPanel2 from '../components/CurrentSensorsPanel2';
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
  // {
  //   pos: 'b',
  //   title: 'Current Sensors',
  //   panel: CurrentSensorsPanel,
  //   devices: {
  //     'source': [ '#2#COU', '#2#COV', '#2#COW', '#2#YU'],
  //     'filter': [{'process': 'interlace', 'argument': 100 }]
  //   }
  // },
  {
    pos: 'b',
    title: 'Machine Energy Consumption',
    panel: CurrentSensorsPanel2,
    devices: {
      'source': ['cRIO-01C4243E.Current_RMS', 'cRIO-01C4243B.Current_RMS'],
    },
    // Format: [[a, b], ...]
    //    a is index of source, e.g: cRIO-01C4243E.Current_RMS is 0
    //    b is index in the array result 
    // As in the cRIO documentation: 
    //    cRIO-01C4243E.Current_RMS return array of 4
    //    cRIO-01C4243B.Current_RMS return array of 16
    gauges: [
      {
        name: 'Main spindle motor',
        source: [[1, 4], [1, 7], [1, 9]]
      },
      {
        name: 'Sub spindle motor',
        source: [[1, 10], [1, 11], [0, 1]]
      },
      {
        name: 'Chip conveyor motor',
        source: [[1, 0], [1, 1], [1, 2]]
      },
      {
        name: 'X-Drive',
        source: [[1, 13], [1, 15], [0, 0]]
      },
      {
        name: 'Y-Drive',
        source: [[1, 3], [1, 5], [1, 12]]
      },
      {
        name: 'Z-Drive',
        source: [[1, 6], [1, 8], [1, 14]]
      },
    ]
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