/**
 * Fills 2-el collocation candidate with instances.
 * @param  {String} candidate                 'traitOne,traitTwo'
 * @param  {Object} singleElementCollocations Hashmap of 1-el collocations.
 * @param  {Object} icpiTree                  Hashmap representation of iCPI-tree. {pointID:trait}
 * @return {Array}                            List of all found instances in form of Array, each element is an Array of
 *                                            points that are part of an instance.
 */
module.exports = function fillCandidate(candidate, singleElementCollocations, icpiTree) {
  const newInstances = [];
  const [traitOne, traitTwo] = candidate.split(',');
  const traitOnePoints = singleElementCollocations[traitOne].instances;

  for (const point of traitOnePoints) {
    const index = `${point}:${traitTwo}`;

    if (icpiTree[index]) {
      for (const neighbour of icpiTree[index]) {
        newInstances.push([point, neighbour]);
      }
    }
  }

  return newInstances;
};
