const iCPItree = require('./iCPITree');
const { getNeighbours, validateInput: { validateMaxDist, validateMinPrev } } = require('./utils');
const { getData, processCsv } = require('./dataSetup');
const { setUi } = require('./view');
const { drawGraph, mouseoverHighlight } = require('./iCPITree/graphVis');
const sigma = require('./utils/sigma.require');

const sideMargin = 2;
const labelThreshold = 4;
const minNodeSize = 1;
const maxNodeSize = 5;
const skipErrors = true;

let fileData;
let pointData;
let pointNeighb;
let colocations = [];
let step = 0;
let ui = {};
let flag = 0;
let maxDist;
let minPrev;
let sigmaInstance;

/**
 * Processes csv file data,validates user input, creates iCPI tree hashmap and draws graph.
 *
 * @return {type}  Does not return anything.
 */
function stepOne() {
  sigmaInstance.graph.clear();
  pointData = processCsv(fileData);
  ui.vertexCount.innerText = pointData.points.length;
  ui.traitCount.innerText = pointData.traitCounter;
  ui.startButton.disabled = true;

  maxDist = validateMaxDist(ui.maxDist.value);
  minPrev = validateMinPrev(ui.minPrev.value);
  ui.maxDist.value = maxDist;
  ui.minPrev.value = minPrev;
  pointNeighb = getNeighbours(pointData.points, maxDist);

  drawGraph(sigmaInstance, pointData.points, pointNeighb);

  ui.dataTextVis.innerHTML = '';
  ui.startButton.innerText = 'NEXT';
  ui.startButton.disabled = false;
}

/**
 * Perform basic data processing with graph drawing if its first time button is pressed.
 * Otherwise perform next step of algorytm.
 *
 * @return {type}  Does not return anything.
 */
function processData() {
  if (flag === 0) {
    stepOne();
    flag = 1;
  } else {
    colocations = iCPItree(pointData, pointNeighb, minPrev, ui.startButton, ui.dataTextVis, colocations, step);
    step++;
    mouseoverHighlight.createColocationNodeEvents(sigmaInstance, pointData.points);
    mouseoverHighlight.createNeighborhoodNodeEvents(sigmaInstance, pointData.points);
    if (step > 1) {
      ui.prevButton.disabled = false;
    } else {
      ui.prevButton.disabled = true;
    }
  }
}

/**
 * Recalculates previous step of the algorythm.
 *
 * @return {type}  Does not return anything.
 */
function prevButtonHandler() {
  step = step - 2;
  colocations = iCPItree(pointData, pointNeighb, minPrev, ui.startButton, ui.dataTextVis, colocations, step);
  step++;
  mouseoverHighlight.createColocationNodeEvents(sigmaInstance, pointData.points);
  mouseoverHighlight.createNeighborhoodNodeEvents(sigmaInstance, pointData.points);
  if (step > 1) {
    ui.prevButton.disabled = false;
  } else {
    ui.prevButton.disabled = true;
  }
}

/**
 * Load raw csv file data and unlock buttons.
 *
 * @return {type}  Does not return anything.
 */
function setupData() {
  ui.startButton.disabled = true;
  getData(ui.dataFile.files[0]).then((rawData) => {
    step = 0;
    flag = 0;
    fileData = rawData;
    ui.startButton.disabled = false;
    ui.startButton.innerText = 'START';
    ui.resetButton.disabled = false;
  });
}

/**
 * Hotfix for Chrome not spawning "onchange" event when same file is chosen.
 *
 * @param  {HTMLInputNode} target Node to be reseted (value).
 * @return {type}        Does not return anything.
 */
function reset(target) {
  target.value = '';
}

/**
 * Resets all data except raw csv file data.
 *
 * @return {type}  Does not return anything.
 */
function resetButtonHandler() {
  step = 0;
  flag = 0;
  ui.startButton.disabled = false;
  ui.prevButton.disabled = true;
  ui.startButton.innerText = 'START';
  sigmaInstance.graph.clear();
  sigmaInstance.refresh();
  ui.dataTextVis.innerHTML = '';
}

/**
 * Initialises iCPI algorythm ui.
 *
 * @return {type}  Does not return anything.
 */
module.exports = function main() {
  ui = setUi();
  reset(ui.dataFile);
  ui.startButton.disabled = true;
  ui.prevButton.disabled = true;
  ui.resetButton.disabled = true;
  ui.dataFile.addEventListener('click', (source) => reset(source.target));
  ui.dataFile.addEventListener('change', setupData);
  ui.startButton.addEventListener('click', processData);
  ui.prevButton.addEventListener('click', prevButtonHandler);
  ui.resetButton.addEventListener('click', resetButtonHandler);
  sigmaInstance = new sigma({
    container: ui.dataGraph,
    settings: {
      labelThreshold,
      sideMargin,
      drawEdgeLabels: false,
      minNodeSize,
      maxNodeSize,
      skipErrors
    }
  });
};
