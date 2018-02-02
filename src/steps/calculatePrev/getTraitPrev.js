const roundFactor = 100;

/**
 * Calculates trait prevalence.
 * @param  {Array}  instances   List of all instances of given collocation.
 * @param  {Number} index       Index of trait that is being calculated.
 * @param  {Number} traitCount  Number of all points with trait that is being calculated.
 * @return {Number}             Trait prevalence
 */

module.exports = function getTraitPrev(instances, index, traitCount) {
  const helperObject = {};

  for (const instance of instances) {
    const pointID = instance[index];

    if (!helperObject[pointID]) {
      helperObject[pointID] = 1;
    }
  }

  const pointCount = Object.keys(helperObject).length;
  const traitPrev = pointCount / traitCount;

  return Math.round(traitPrev * roundFactor) / roundFactor;
};
