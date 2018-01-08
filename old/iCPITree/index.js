const { first, next } = require('./steps');

module.exports = function iCPItreeAlg(pointData, pointNeighb, minPrev, startButton, dataTextVis, colocations, step) {
  if (step === 0) {
    colocations[0] = first(pointNeighb, pointData, dataTextVis);
  } else if (Object.keys(colocations[step - 1]).length === 0) {
    startButton.innerText = 'DONE!';
    startButton.disabled = true;
  } else {
    colocations[step] = next(pointNeighb, colocations[step - 1], minPrev, pointData, dataTextVis);
    startButton.innerText = 'NEXT';
    startButton.disabled = false;
  }

  if (step === pointData.traitCounter - 2) {
    startButton.innerText = 'DONE!';
    startButton.disabled = true;
  }

  return colocations;
};
