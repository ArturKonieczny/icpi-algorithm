/**
 * Generates (3+)-el collocation candidates.
 * @param  {Array}   prevCollocations           List of collocations found in n-1 step.
 * @param  {Number} [minPrev=0]                 Minimum prevalence for collocation to be considered valid
 * @return {Array}                              List of collocation candidates 'triat1,...,traitn'
 */
module.exports = function genCandidates(prevCollocations, minPrev = 0) {
  const candidates = [];
  const validPrevCandidates = [];

  for (const prevColl in prevCollocations) {
    if (prevCollocations[prevColl].prev !== 0 && prevCollocations[prevColl].prev >= minPrev) {
      validPrevCandidates.push(prevColl);
    }
  }

  for (const traitsOne of validPrevCandidates) {
    for (const traitsTwo of validPrevCandidates) {
      const lastTraitOne = traitsOne.slice(-1);
      const lastTraitTwo = traitsTwo.slice(-1);
      const partOne = traitsOne.slice(0, -1);
      const partTwo = traitsTwo.slice(0, -1);

      if (partOne === partTwo && Number(lastTraitOne) < Number(lastTraitTwo)) {
        candidates.push(`${traitsOne},${lastTraitTwo}`);
      }
    }
  }

  return candidates;
};
