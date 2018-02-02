exports.input = {
  icpiTree: {
    '1:3': ['2'],
    '1:1': ['3'],
    '1:2': ['4'],
    '3:3': ['2'],
    '3:2': ['4'],
    '4:3': ['2'],
    '6:2': ['4'],
    '7:2': ['8'],
    '7:1': ['9'],
    '9:2': ['8'],
    '10:2': ['11'],
    '11:3': ['13'],
    '12:2': ['11'],
    '12:3': ['13'],
    '14:2': ['15']
  },
  pointData: [
    {
      id: '1',
      trait: '0',
      locationX: '1',
      locationY: '7'
    },
    {
      id: '2',
      trait: '3',
      locationX: '2',
      locationY: '6'
    },
    {
      id: '3',
      trait: '1',
      locationX: '3',
      locationY: '8'
    },
    {
      id: '4',
      trait: '2',
      locationX: '4',
      locationY: '7'
    },
    {
      id: '5',
      trait: '2',
      locationX: '5',
      locationY: '4'
    },
    {
      id: '6',
      trait: '1',
      locationX: '6',
      locationY: '7'
    },
    {
      id: '7',
      trait: '0',
      locationX: '11',
      locationY: '2'
    },
    {
      id: '8',
      trait: '2',
      locationX: '12',
      locationY: '1'
    },
    {
      id: '9',
      trait: '1',
      locationX: '13',
      locationY: '2'
    },
    {
      id: '10',
      trait: '0',
      locationX: '18',
      locationY: '6'
    },
    {
      id: '11',
      trait: '2',
      locationX: '19',
      locationY: '5'
    },
    {
      id: '12',
      trait: '0',
      locationX: '20',
      locationY: '7'
    },
    {
      id: '13',
      trait: '3',
      locationX: '21',
      locationY: '5'
    },
    {
      id: '14',
      trait: '1',
      locationX: '26',
      locationY: '4'
    },
    {
      id: '15',
      trait: '2',
      locationX: '27',
      locationY: '4'
    }
  ]
};

exports.output = [
  {
    '0': {
      instances: ['1', '7', '10', '12']
    },
    '1': {
      instances: ['3', '6', '9', '14']
    },
    '2': {
      instances: ['4', '5', '8', '11', '15']
    },
    '3': {
      instances: ['2', '13']
    }
  }, {
    '0,1': {
      instances: [ ['1', '3'], ['7', '9'] ],
      '0': 0.5,
      '1': 0.5,
      prev: 0.5
    },
    '0,2': {
      instances: [ ['1', '4'], ['7', '8'], ['10', '11'], ['12', '11'] ],
      '0': 1,
      '2': 0.6,
      prev: 0.6
    },
    '0,3': {
      instances: [ ['1', '2'], ['12', '13'] ],
      '0': 0.5,
      '3': 1,
      prev: 0.5
    },
    '1,2': {
      instances: [ ['3', '4'], ['6', '4'], ['9', '8'], ['14', '15'] ],
      '1': 1,
      '2': 0.6,
      prev: 0.6
    },
    '1,3': {
      instances: [ ['3', '2'] ],
      '1': 0.25,
      '3': 0.5,
      prev: 0.25
    },
    '2,3': {
      instances: [ ['4', '2'], ['11', '13'] ],
      '2': 0.4,
      '3': 1,
      prev: 0.4
    }
  }, {
    '0,1,2': {
      instances: [ ['1', '3', '4'], ['7', '9', '8'] ],
      '0': 0.5,
      '1': 0.5,
      '2': 0.4,
      prev: 0.4
    },
    '0,1,3': {
      instances: [ ['1', '3', '2'] ],
      '0': 0.25,
      '1': 0.25,
      '3': 0.5,
      prev: 0.25
    },
    '0,2,3': {
      instances: [ ['1', '4', '2'], ['12', '11', '13'] ],
      '0': 0.5,
      '2': 0.4,
      '3': 1,
      prev: 0.4
    },
    '1,2,3': {
      instances: [ ['3', '4', '2'] ],
      '1': 0.25,
      '2': 0.2,
      '3': 0.5,
      prev: 0.2
    }
  }, {
    '0,1,2,3': {
      instances: [ ['1', '3', '4', '2'] ],
      '0': 0.25,
      '1': 0.25,
      '2': 0.2,
      '3': 0.5,
      prev: 0.2
    }
  }
];
