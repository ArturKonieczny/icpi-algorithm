const generateCandidates = require('./generateCandidates');
const fillCandidate = require('./fillCandidate');
const calculatePrev = require('../calculatePrev');

/**
 * Finds (3+)-el collocations.
 * @param  {Object} icpiTree                    Hashmap representation of iCPI-tree. {pointID:trait}
 * @param  {Array}   prevCollocations           List of collocations found in n-1 step.
 * @param  {Object} singleElementCollocations   Hashmap of 1-el collocations.
 * @param  {Number} [minPrev=0]                 Minimum prevalence for collocation to be considered valid
 * @return {Object}                             Hashmap of (3+)-el collocations. 
 */
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
