/**
 * Generate new collocation instances based on collocation instance found in n-1 step.
 * @param  {Array} prevCollInstance  List of point Objects that are part of previous step collocation instance.
 * @param  {String} newTrait         New trait that is added to previous collocation to create new one.
 * @param  {Object} icpiTree         Hashmap representation of iCPI-tree. {pointID:trait}
 * @return {Array}                   List of instances found from given previous collocation instance.
 */
module.exports = function generateInstances(prevCollInstance, newTrait, icpiTree) {
  const prevInstancePoints = prevCollInstance.slice();
  const centerPoint = prevInstancePoints.shift();
  const centerPointNeighbours = icpiTree[`${centerPoint}:${newTrait}`] || [];

  const commonNeighbours = centerPointNeighbours.filter((centerNeighbour) => {
    for (const prevInstancePoint of prevInstancePoints) {
      const prevInstancePointNeighb = icpiTree[`${prevInstancePoint}:${newTrait}`] || [];
      const checkCommon = prevInstancePointNeighb.some((neighbour) => neighbour === centerNeighbour);

      if (!checkCommon) {
        return false;
      }
    }

    return true;
  });

  const newInstances = commonNeighbours.map((commonNeighbour) => prevCollInstance.concat(commonNeighbour));

  return newInstances;
};
