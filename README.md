# iCPI Algorithm

Finds spatial collocations using iCPI-algorithm.

## Installation

```bash
npm install icpi-algorithm
```

or simply download and "require" this repository.

## Usage

```js
const icpiAlgorithm = require('icpi-algorithm');

const collocations = icpiAlgorithm(pointData, icpiTree, minPrev); // default minPrev is 0

```

## Entry data

Max distance = 3 for points to be considered neighbours was assumed.
```js
const  inputData = [ { id: '1', trait: '0', locationX: '1', locationY: '7' },
  { id: '2', trait: '3', locationX: '2', locationY: '6' },
  { id: '3', trait: '1', locationX: '3', locationY: '8' },
  { id: '4', trait: '2', locationX: '4', locationY: '7' },
  { id: '5', trait: '2', locationX: '5', locationY: '4' },
  { id: '6', trait: '1', locationX: '6', locationY: '7' },
  { id: '7', trait: '0', locationX: '11', locationY: '2' },
  { id: '8', trait: '2', locationX: '12', locationY: '1' },
  { id: '9', trait: '1', locationX: '13', locationY: '2' },
  { id: '10', trait: '0', locationX: '18', locationY: '6' },
  { id: '11', trait: '2', locationX: '19', locationY: '5' },
  { id: '12', trait: '0', locationX: '20', locationY: '7' },
  { id: '13', trait: '3', locationX: '21', locationY: '5' },
  { id: '14', trait: '1', locationX: '26', locationY: '4' },
  { id: '15', trait: '2', locationX: '27', locationY: '4' } ];

const icpiTree = {
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
};
```

## Returns

Array of found collocations (0 -> 1 el collocations, 1 -> 2 el collocations etc.),
each element is a hashmap of found collocations. 'trait1,...,traitn'.
Collocation Object {instances: Array, trait1prev,...,traitnprev, prev}

### Example 3-el collocation for above input data

```js
[...,
  {
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
      instances: [ ['3', '4', '2' ]],
      '1': 0.25,
      '2': 0.2,
      '3': 0.5,
      prev: 0.2
    }
  },
...]
```
