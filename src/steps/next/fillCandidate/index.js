const generateInstances = require('./generateInstances');

module.exports = function fillCandidate(candidate, prevCollocations, icpiTree) {
  const instances = [];
  const newTrait = candidate.slice(-1);
  const mainChunkTraits = candidate.split(',').slice(0,-1);
  const prevCollInstances = prevCollocations[mainChunkTraits.join(',')].instances;

  for (const prevCollInstance of prevCollInstances) {
    instances.push.apply(instances, generateInstances(prevCollInstance, newTrait, icpiTree));
  }

  return instances;
};
