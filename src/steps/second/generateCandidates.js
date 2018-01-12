/**
 * Generates 2-el collocation candidates.
 * @param  {Array} traits   List of all given traits.
 * @return {Array}          List of all generated candidates ('traitOne,traitTwo').
 */
module.exports = function genCandidates(traits) {
  const candidates = [];

  for (const traitOne of traits) {
    for (const traitTwo of traits) {
      if (Number(traitOne) < Number(traitTwo)) {
        candidates.push(`${traitOne},${traitTwo}`);
      }
    }
  }

  return candidates;
};
