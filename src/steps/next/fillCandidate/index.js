const generateInstances = require('./generateInstances');

/**
 * Fills (3+)-el collocation candidate with instances.
 * @param  {String} candidate                 'trait1,...,traitn'
 * @param  {Array}   prevCollocations         List of collocations found in n-1 step.
 * @param  {Object} icpiTree                  Hashmap representation of iCPI-tree. {pointID:trait}
 * @return {Array}                            List of all found instances in form of Array, each element is an Array of
 *                                            points that are part of an instance.
 */

module.exports = function fillCandidate(candidate, prevCollocations, icpiTree) {
  const instances = [];
  const newTrait = candidate.slice(-1);
  const mainChunkTraits = candidate.split(',').slice(0, -1);
  const prevCollInstances = prevCollocations[mainChunkTraits.join(',')].instances;

  for (const prevCollInstance of prevCollInstances) {
    instances.push(...generateInstances(prevCollInstance, newTrait, icpiTree));
  }

  return instances;
};
