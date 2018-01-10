module.exports = function genCandidates(traits) {
  const candidates = [];

  for (const traitOne of traits) {
    for (const traitTwo of traits) {
      if (traitOne < traitTwo) {
        candidates.push(`${traitOne},${traitTwo}`);
      }
    }
  }

  return candidates;
};
