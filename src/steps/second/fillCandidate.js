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
