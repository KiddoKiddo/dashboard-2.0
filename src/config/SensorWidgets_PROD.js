import VibrationSensorsPanel from '../components/VibrationSensorsPanel';
import CurrentSensorsPanel2 from '../components/CurrentSensorsPanel2';
import SignalProcessingPanel from '../components/SignalProcessingPanel';
import MachineTemperaturePanel from '../components/MachineTemperaturePanel';

const Widgets_PRODUCTION = [
  {
    // This is for vibration sensors with
    pos: 'a', // Match with 'i' in layoutt 
    title: 'Vibration Sensors',
    panel: VibrationSensorsPanel,
    devices: [
      {
        'device': 'MSFB X',
        'source':['cRIO-01C4243B.VM6.Ch1'],
        'fft': ['cRIO-01C4243B.VM6_FFT.Ch1_FFT', 'cRIO-01C4243B.VM6_FFT.Ch2_FFT', 'cRIO-01C4243B.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'MSFB Y',
        'source':['cRIO-01C4243B.VM6.Ch2'],
        'fft': ['cRIO-01C4243B.VM6_FFT.Ch1_FFT', 'cRIO-01C4243B.VM6_FFT.Ch2_FFT', 'cRIO-01C4243B.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'MSFB Z',
        'source':['cRIO-01C4243B.VM6.Ch3'],
        'fft': ['cRIO-01C4243B.VM6_FFT.Ch1_FFT', 'cRIO-01C4243B.VM6_FFT.Ch2_FFT', 'cRIO-01C4243B.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'MSRB X',
        'source':['cRIO-01C4243B.VM8.Ch1'],
        'fft': ['cRIO-01C4243B.VM8_FFT.Ch1_FFT', 'cRIO-01C4243B.VM8_FFT.Ch2_FFT', 'cRIO-01C4243B.VM8_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'MSRB Y',
        'source':['cRIO-01C4243B.VM8.Ch2'],
        'fft': ['cRIO-01C4243B.VM8_FFT.Ch1_FFT', 'cRIO-01C4243B.VM8_FFT.Ch2_FFT', 'cRIO-01C4243B.VM8_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'MSRB Z',
        'source':['cRIO-01C4243B.VM8.Ch3'],
        'fft': ['cRIO-01C4243B.VM8_FFT.Ch1_FFT', 'cRIO-01C4243B.VM8_FFT.Ch2_FFT', 'cRIO-01C4243B.VM8_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-drive X',
        'source':['cRIO-01C4243B.VM7.Ch1'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      { 
        'device': 'X-drive Y',
        'source':['cRIO-01C4243B.VM7.Ch2'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-drive Z',
        'source':['cRIO-01C4243B.VM7.Ch3'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive X',
        'source':['cRIO-01C4243E.VM1.Ch1'],
        'fft': ['cRIO-01C4243E.VM1_FFT.Ch1_FFT', 'cRIO-01C4243E.VM1_FFT.Ch2_FFT', 'cRIO-01C4243E.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive Y',
        'source':['cRIO-01C4243E.VM1.Ch2'],
        'fft': ['cRIO-01C4243E.VM1_FFT.Ch1_FFT', 'cRIO-01C4243E.VM1_FFT.Ch2_FFT', 'cRIO-01C4243E.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-drive Z',
        'source':['cRIO-01C4243E.VM1.Ch3'],
        'fft': ['cRIO-01C4243E.VM1_FFT.Ch1_FFT', 'cRIO-01C4243E.VM1_FFT.Ch2_FFT', 'cRIO-01C4243E.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-drive X',
        'source':['cRIO-01C4243D.VM4.Ch1'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-drive Y',
        'source':['cRIO-01C4243D.VM4.Ch2'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-drive Z',
        'source':['cRIO-01C4243D.VM4.Ch3'],
        'fft': ['cRIO-01C4243B.VM7_FFT.Ch1_FFT', 'cRIO-01C4243B.VM7_FFT.Ch2_FFT', 'cRIO-01C4243B.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 1 X',
        'source':['cRIO-01C4243D.VM1.Ch1'],
        'fft': ['cRIO-01C4243D.VM1_FFT.Ch1_FFT', 'cRIO-01C4243D.VM1_FFT.Ch2_FFT', 'cRIO-01C4243D.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 1 Y',
        'source':['cRIO-01C4243D.VM1.Ch2'],
        'fft': ['cRIO-01C4243D.VM1_FFT.Ch1_FFT', 'cRIO-01C4243D.VM1_FFT.Ch2_FFT', 'cRIO-01C4243D.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 1 Z',
        'source':['cRIO-01C4243D.VM1.Ch3'],
        'fft': ['cRIO-01C4243D.VM1_FFT.Ch1_FFT', 'cRIO-01C4243D.VM1_FFT.Ch2_FFT', 'cRIO-01C4243D.VM1_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 2 X',
        'source':['cRIO-01C4243D.VM5.Ch1'],
        'fft': ['cRIO-01C4243D.VM5_FFT.Ch1_FFT', 'cRIO-01C4243D.VM5_FFT.Ch2_FFT', 'cRIO-01C4243D.VM5_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 2 Y',
        'source':['cRIO-01C4243D.VM5.Ch2'],
        'fft': ['cRIO-01C4243D.VM5_FFT.Ch1_FFT', 'cRIO-01C4243D.VM5_FFT.Ch2_FFT', 'cRIO-01C4243D.VM5_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'X-slide 2 Z',
        'source':['cRIO-01C4243D.VM5.Ch3'],
        'fft': ['cRIO-01C4243D.VM5_FFT.Ch1_FFT', 'cRIO-01C4243D.VM5_FFT.Ch2_FFT', 'cRIO-01C4243D.VM5_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 1 X',
        'source':['cRIO-01C4243E.VM3.Ch1'],
        'fft': ['cRIO-01C4243E.VM3_FFT.Ch1_FFT', 'cRIO-01C4243E.VM3_FFT.Ch2_FFT', 'cRIO-01C4243E.VM3_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 1 Y',
        'source':['cRIO-01C4243E.VM3.Ch2'],
        'fft': ['cRIO-01C4243E.VM3_FFT.Ch1_FFT', 'cRIO-01C4243E.VM3_FFT.Ch2_FFT', 'cRIO-01C4243E.VM3_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 1 Z',
        'source':['cRIO-01C4243E.VM3.Ch3'],
        'fft': ['cRIO-01C4243E.VM3_FFT.Ch1_FFT', 'cRIO-01C4243E.VM3_FFT.Ch2_FFT', 'cRIO-01C4243E.VM3_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 2 X',
        'source':['cRIO-01C4243E.VM2.Ch1'],
        'fft': ['cRIO-01C4243E.VM2_FFT.Ch1_FFT', 'cRIO-01C4243E.VM2_FFT.Ch2_FFT', 'cRIO-01C4243E.VM2_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 2 Y',
        'source':['cRIO-01C4243E.VM2.Ch2'],
        'fft': ['cRIO-01C4243E.VM2_FFT.Ch1_FFT', 'cRIO-01C4243E.VM2_FFT.Ch2_FFT', 'cRIO-01C4243E.VM2_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Y-slide 2 Z',
        'source':['cRIO-01C4243E.VM2.Ch3'],
        'fft': ['cRIO-01C4243E.VM2_FFT.Ch1_FFT', 'cRIO-01C4243E.VM2_FFT.Ch2_FFT', 'cRIO-01C4243E.VM2_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 1 X',
        'source':['cRIO-01C4243D.VM4.Ch4'],
        'fft': ['cRIO-01C4243D.VM4_FFT.Ch4_FFT', 'cRIO-01C4243D.VM5_FFT.Ch4_FFT', 'cRIO-01C4243D.VM6_FFT.Ch4_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 1 Y',
        'source':['cRIO-01C4243D.VM5.Ch4'],
        'fft': ['cRIO-01C4243D.VM4_FFT.Ch4_FFT', 'cRIO-01C4243D.VM5_FFT.Ch4_FFT', 'cRIO-01C4243D.VM6_FFT.Ch4_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 1 Z',
        'source':['cRIO-01C4243D.VM6.Ch4'],
        'fft': ['cRIO-01C4243D.VM4_FFT.Ch4_FFT', 'cRIO-01C4243D.VM5_FFT.Ch4_FFT', 'cRIO-01C4243D.VM6_FFT.Ch4_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 2 X',
        'source':['cRIO-01C4243D.VM6.Ch1'],
        'fft': ['cRIO-01C4243D.VM6_FFT.Ch1_FFT', 'cRIO-01C4243D.VM6_FFT.Ch2_FFT', 'cRIO-01C4243D.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 2 Y',
        'source':['cRIO-01C4243D.VM6.Ch2'],
        'fft': ['cRIO-01C4243D.VM6_FFT.Ch1_FFT', 'cRIO-01C4243D.VM6_FFT.Ch2_FFT', 'cRIO-01C4243D.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Z-slide 2 Z',
        'source':['cRIO-01C4243D.VM6.Ch3'],
        'fft': ['cRIO-01C4243D.VM6_FFT.Ch1_FFT', 'cRIO-01C4243D.VM6_FFT.Ch2_FFT', 'cRIO-01C4243D.VM6_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Operation area X',
        'source':['cRIO-01C4243D.VM7.Ch1'],
        'fft': ['cRIO-01C4243D.VM7_FFT.Ch1_FFT', 'cRIO-01C4243D.VM7_FFT.Ch2_FFT', 'cRIO-01C4243D.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Operation area Y',
        'source':['cRIO-01C4243D.VM7.Ch2'],
        'fft': ['cRIO-01C4243D.VM7_FFT.Ch1_FFT', 'cRIO-01C4243D.VM7_FFT.Ch2_FFT', 'cRIO-01C4243D.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
      {
        'device': 'Operation area Z',
        'source':['cRIO-01C4243D.VM7.Ch3'],
        'fft': ['cRIO-01C4243D.VM7_FFT.Ch1_FFT', 'cRIO-01C4243D.VM7_FFT.Ch2_FFT', 'cRIO-01C4243D.VM7_FFT.Ch3_FFT'],
        'filter':[{'process':'range'}]
      },
    ]
  },
  // {
  //   pos: 'b',
  //   title: 'Current Sensors',
  //   panel: CurrentSensorsPanel2,
  //   devices: {
  //     'source': [ 'cRIO-01C4243E.CM4.Ch1', 
  //                 'cRIO-01C4243E.CM4.Ch2', 
  //                 'cRIO-01C4243E.CM4.Ch3', 
  //                 'cRIO-01C4243B.CM5.Ch1'],
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
      'source': [ 'cRIO-01C4243E.VM3_FFT.Ch1_FFT', 
                  'cRIO-01C4243E.VM3_FFT.Ch2_FFT', 
                  'cRIO-01C4243E.VM3_FFT.Ch3_FFT'],
      'filter': [{"process": "group", "argument": 10}]
    }
  },
  {
    pos: 'd',
    title: 'Temperature',
    panel: MachineTemperaturePanel,
    devices: [
      { key: 1, name: 'Spindle',            source: 'cRIO-01C4243D.TM2.Ch4'},
      { key: 2, name: 'SHOE Z LEFT FRONT',  source: 'cRIO-01C4243D.TM3.Ch2'},
      { key: 3, name: 'NUT Z',              source: 'cRIO-01C4243B.TM4.Ch3'},
      { key: 4, name: 'SHOE Z RIGHT REAR',  source: 'cRIO-01C4243B.TM4.Ch2'},
      { key: 5, name: 'BED Z RIGHT REAR',   source: 'cRIO-01C4243D.TM3.Ch4'},
      { key: 6, name: 'BED Z LEFT REAR',    source: 'cRIO-01C4243B.TM4.Ch4'},
      { key: 7, name: 'SHOE X FRONT DOWN',  source: 'cRIO-01C4243D.TM2.Ch1'},
      { key: 8, name: 'SHOE Z LEFT REAR',   source: 'cRIO-01C4243D.TM2.Ch3'},
      { key: 9, name: 'SHOE X FRONT UP',    source: 'cRIO-01C4243D.TM3.Ch1'},
      { key: 10, name: 'SHOE X REAR UP',    source: 'cRIO-01C4243D.TM3.Ch3'},
      { key: 11, name: 'NUT X',             source: 'cRIO-01C4243B.TM4.Ch1'},
      { key: 12, name: 'SHOE X REAR DOWN',  source: 'cRIO-01C4243D.TM2.Ch2'},
    ]
  }  
]
export default Widgets_PRODUCTION;