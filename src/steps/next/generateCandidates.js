module.exports = function genCandidates(prevCollocations, minPrev) {
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
