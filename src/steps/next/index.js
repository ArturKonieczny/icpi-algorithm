const generateCandidates = require('./generateCandidates');
const fillCandidate = require('./fillCandidate');
const calculatePrev = require('../calculatePrev');

module.exports = function next(icpiTree, prevCollocations, singleElementCollocations, minPrev = 0) {
  const candidates = generateCandidates(prevCollocations, minPrev);
  const collocations = {};

  for (const candidate of candidates) {
    const instances = fillCandidate(candidate, prevCollocations, icpiTree);
    const prevalence = calculatePrev(candidate, instances, singleElementCollocations);

    collocations[candidate] = Object.assign({
      instances
    }, prevalence);
  }

  return collocations;
};
