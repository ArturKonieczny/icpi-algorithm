const { first, second, next } = require('./steps');

module.exports = function findCollocations(pointData, icpiTree) {
  const collocations = [];

  collocations.push(first(pointData));
  const maxCandidateLength = Object.keys(collocations[0]).length;

  if (maxCandidateLength === 1) {
    return collocations;
  }

  collocations.push(second(icpiTree, collocations[0]));

  while (collocations.length < maxCandidateLength) {
    const prevCollocations = collocations.slice(-1).pop();

    if (Object.keys(prevCollocations).length === 0) {
      break;
    }

    collocations.push(next(icpiTree, prevCollocations, collocations[0]));
  }

  return collocations;
};
