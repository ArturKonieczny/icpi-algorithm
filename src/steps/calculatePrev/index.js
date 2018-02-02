const getTraitPrev = require('./getTraitPrev');

/**
 * Calculates collocation prevalence.
 * @param  {String} candidate                 Collocation candidate 'trait1,...,traitn'
 * @param  {Array}  instances                 List of all instances of given collocation.
 * @param  {Object} singleElementCollocations Hashmap of 1-el collocations.
 * @return {Object}                           {trait1prev,...,traitnprev,prev}
 */

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
