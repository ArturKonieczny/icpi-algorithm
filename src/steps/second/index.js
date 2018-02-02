const generateCandidates = require('./generateCandidates');
const fillCandidate = require('./fillCandidate');
const calculatePrev = require('../calculatePrev');

/**
 * Finds 2-el collocations.
 * @param  {Object} icpiTree                  Hashmap representation of iCPI-tree. {pointID:trait}
 * @param  {Object} singleElementCollocations Hashmap of 1-el collocations.
 * @return {Object}                           Hashmap of 2-el collocations.
 */
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
