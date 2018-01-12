module.exports = function generateInstances(prevCollInstance, newTrait, icpiTree) {
  const prevInstancePoints = prevCollInstance.slice();
  const centerPoint = prevInstancePoints.shift();
  const centerPointNeighbours = icpiTree[`${centerPoint}:${newTrait}`] || [];
  const commonNeighbours = centerPointNeighbours.filter((centerNeighbour) => {
    for (const prevInstancePoint of prevInstancePoints){
      const prevInstancePointNeighb = icpiTree[`${prevInstancePoint}:${newTrait}`] || [];
      const checkCommon = prevInstancePointNeighb.some((neighbour) => {
        return neighbour === centerNeighbour;
      });

      if (!checkCommon) {
        return false;
      }
    }

    return true;
  });
  const newInstances = commonNeighbours.map((commonNeighbour) => {
      return prevCollInstance.concat(commonNeighbour);
  });

  return newInstances;
};
