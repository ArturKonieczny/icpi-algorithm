const roundFactor = 100;

/**
 * Calculates points count of given trait in colocation candidate.
 *
 * @param  {Object} candidateObj    {instances: Array, trait1count: int, trait2count: int, ..., prev: float }
 * @param  {Array} candidateTraits Colocation candidate traits array.
 * @return {Array}                 Points count of all candidate colocation traits.
 */
function getTraitCount(candidateObj, candidateTraits) {
  const traitCount = [];

  for (let l = 0; l < candidateTraits.length; l++) {
    let pointsCount = 0;
    const helperObject = {};

    for (let j = 0; j < candidateObj.instances.length; j++) {
      const index = `point:${candidateObj.instances[j].points[l]}`;

      if (helperObject[index]) {
        helperObject[index]++;
      } else {
        helperObject[index] = 1;
      }
    }

    pointsCount = Object.keys(helperObject).length;

    traitCount[l] = pointsCount;
  }

  return traitCount;
}

/**
 * Calculates points count and prev of given candidate colocation.
 *
 * @param  {Object} candidateObj {instances: Array, trait1count: int, trait2count: int, ..., prev: float }
 * @param  {Array} candidate    Colocation candidate traits array.
 * @param  {Object} pointData    Array of point Objects ({id, trait, locationX, locationY})
 * @return {Object}              Updated candidate object.
 */
module.exports = function countAndCalcPrev(candidateObj, candidate, pointData) {
  const candidateTraits = candidate.split(',');
  const traitCount = getTraitCount(candidateObj, candidateTraits);

  for (let k = 0; k < traitCount.length; k++) {
    if (traitCount[k]) {
      traitCount[k] /= pointData.traits[`trait:${candidateTraits[k]}`].length;
      candidateObj[`trait${candidateTraits[k]}count`] = Math.round(traitCount[k] * roundFactor) / roundFactor;
    }
  }

  candidateObj.prev = Math.min.apply(null, traitCount);

  return candidateObj;
};
