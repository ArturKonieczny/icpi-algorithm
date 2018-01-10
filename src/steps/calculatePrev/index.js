const getTraitPrev = require('./getTraitPrev');

module.exports = function calculatePrev(candidate, instances, singleElementCollocations) {
  const candidateTraits = candidate.split(',');
  const prevalence = {};
  const traitPrevalences = [];

  candidateTraits.forEach((trait, index) => {
    const traitCount = singleElementCollocations[trait].instances.length;
    const traitPrev = getTraitPrev(instances, index, traitCount);

    prevalence[trait] = traitPrev;
    traitPrevalences.push(traitPrev);
  });

  prevalence.prev = Math.min.apply(null, traitPrevalences);

  return prevalence;
};
