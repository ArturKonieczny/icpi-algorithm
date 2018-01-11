const generateCandidates = require('./generateCandidates');
const fillCandidate = require('./fillCandidate');
const calculatePrev = require('../calculatePrev');

module.exports = function secondStep(icpiTree, singleElementCollocations) {
  const traits = Object.keys(singleElementCollocations);
  const candidates = generateCandidates(traits);
  const collocations = {};

  for (const candidate of candidates) {
    const instances = fillCandidate(candidate, singleElementCollocations, icpiTree);
    const prevalence = calculatePrev(candidate, instances, singleElementCollocations);

    collocations[candidate] = Object.assign({
      instances
    }, prevalence);
  }

  return collocations;
};
