const roundFactor = 100;

module.exports = function getTraitPrev(instances, index, traitCount) {
  const helperObject = {};

  for (const instance of instances) {
    if (!helperObject[instance]) {
      helperObject[instance] = 1;
    }
  }

  const pointCount = Object.keys(helperObject).length;
  const traitPrev = pointCount / traitCount;

  return Math.round(traitPrev * roundFactor) / roundFactor;
};
