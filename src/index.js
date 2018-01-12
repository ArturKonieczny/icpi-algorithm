const { first, second, next } = require('./steps');

/**
 * Function uses iCPI-Algorithm to find collocations
 * @param  {Array}  pointData   Array of point Objects {id, trait, locationX, locationY}
 * @param  {Object} icpiTree    Hashmap representation of iCPI-tree. {pointID:trait}
 * @param  {Number} [minPrev=0] Minimum prevalence for collocation to be considered valid
 * @return {Array}              Array of founc collocations (0 -> 1 el collocations, 1 -> 2 el collocations etc.),
 *                              each element is a hashmap of found collocations. 'trait1,...,traitn'.
 *                              Collocation Object {instances: Array, trait1prev,...,traitnprev, prev}
 */
module.exports = function findCollocations(pointData, icpiTree, minPrev = 0) {
  const collocations = [];

  collocations.push(first(pointData));
  const maxCandidateLength = Object.keys(collocations[0]).length;

  if (maxCandidateLength === 1) {
    return collocations;
  }

  collocations.push(second(icpiTree, collocations[0]));

  while (collocations.length < maxCandidateLength) {
    const prevCollocations = collocations.slice(-1).pop();

    if (Object.keys(prevCollocations).length === 0) {
      break;
    }

    collocations.push(next(icpiTree, prevCollocations, collocations[0], minPrev));
  }

  return collocations;
};
