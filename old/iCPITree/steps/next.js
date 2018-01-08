const cacp = require('./countAndCalcPrev');
const { textVisHeader, textVisFooter, textVisDataRow } = require('../textVis/');

/**
 * Checks if given item exists in an array.
 *
 * @param  {type} item  Item to be checked.
 * @param  {Array} array Array that will be searched.
 * @return {bool}       True if item is in array.
 */
function checkIfInArray(item, array) {
  if (!array) {
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (item === array[i]) {
      return true;
    }
  }

  return false;
}

/**
 * Generates colocation candidates based on previous instances.
 *
 * @param  {Object} prevColInstance   {points: [centerPoint, point2, point3, ...], correct: bool}
 * @param  {Object} pointNeighb       Hashmap of all point neighbourhoods 'pointIDtraittraitID'
 * @param  {Integer} commonNeighbTrait Trait ID.
 * @return {Array}                      instance: {points: [centerPoint, point2, point3,...], correct: bool}
 */
function generateInstances(prevColInstance, pointNeighb, commonNeighbTrait) {
  const instances = [];
  const commonNeighb = [];
  const firstNeighb = pointNeighb[`${prevColInstance.points[0]}trait${commonNeighbTrait}`];

  if (!firstNeighb) {
    return instances;
  }

  for (let i = 0; i < firstNeighb.length; i++) {
    let flag = false;

    for (let j = 1; j < prevColInstance.points.length; j++) {
      const index = `${prevColInstance.points[j]}trait${commonNeighbTrait}`;

      flag = checkIfInArray(firstNeighb[i], pointNeighb[index]);
      if (!flag) {
        break;
      }
    }

    if (flag) {
      commonNeighb.push(firstNeighb[i]);
    }
  }

  for (let k = 0; k < commonNeighb.length; k++) {
    instances.push({
      points: prevColInstance.points.concat([commonNeighb[k]]),
      correct: true
    });
  }

  return instances;
}

/**
 * Fills colocation candidate with instances.
 *
 * @param  {String} candidate       Candidate hash 'trait1,trait2,...'
 * @param  {Object} pointNeighb     Hashmap of all point neighbourhoods 'pointIDtraittraitID'
 * @param  {Object} prevColocations Hashmap of previous step colocations 'trait1,trait2,...'
 *                                {points: [centerPoint, point2, point3, ...], correct: bool}
 * @param  {String} textVisHtml     Text visualisation HTML part.
 * @return {Array}                 [Colocation instances, newTextVisHtml]
 *                             Colocation instance: {points: [centerPoint, point2, point3,...], correct: bool}
 */
function fillCandidate(candidate, pointNeighb, prevColocations, textVisHtml) {
  let instances = [];
  let newTextVisHtml = textVisHtml;
  const prevCandidate = candidate.split(',');
  const commonNeighbTrait = prevCandidate.pop();
  const prevColInstances = prevColocations[prevCandidate.join(',')].instances;

  for (let i = 0; i < prevColInstances.length; i++) {
    instances = instances.concat(generateInstances(prevColInstances[i], pointNeighb, commonNeighbTrait));
    newTextVisHtml += textVisDataRow(candidate, prevColInstances[i], pointNeighb, instances);
  }

  return [instances, newTextVisHtml];
}

/**
 * Generates new colocation candidate.
 * If first n-1 traits of prev colocation are the same, new colocation candidate is created.
 * (n-1 traits) + n1trait + n2trait.
 *
 * @param  {String} part1 Previous step colocation.
 * @param  {String} part2 Previous step colocation.
 * @return {String}       New colocation string or false if no candidate is generated.
 */
function genCandidate(part1, part2) {
  let result = [];

  const part1Traits = part1.split(',');
  const part2Traits = part2.split(',');

  if (part1Traits[part1Traits.length - 1] === part2Traits[part1Traits.length - 1]) {
    return false;
  }

  for (let i = 0; i < part1Traits.length - 1; i++) {
    if (part1Traits[i] !== part2Traits[i]) {
      return false;
    }
    result.push(part1Traits[i]);
  }

  result.push(part1Traits[part1Traits.length - 1]);
  result.push(part2Traits[part2Traits.length - 1]);
  result = result.sort((one, two) => one - two);

  return result.join(',');
}

/**
 * Generates new colocation candidates.
 *
 * @param  {Object} prevColocations Hashmap of previous step colocations 'trait1,trait2,...'
 *                                {points: [centerPoint, point2, point3, ...], correct: bool}
 * @param  {Float} minPrev         Minimum prev. for colocation to be considered valid.
 * @return {Object}                Hashmap of colocations 'trait1,trait2,...'
 *                                {points: [centerPoint, point2, point3, ...], correct: bool}
 */
function genCandidates(prevColocations, minPrev) {
  const candidates = {};

  for (const prevCol1 in prevColocations) {
    if (prevColocations[prevCol1].prev < minPrev || prevColocations[prevCol1].prev === 0) {
      continue;
    }

    for (const prevCol2 in prevColocations) {
      if (prevColocations[prevCol2].prev < minPrev || prevColocations[prevCol2].prev === 0) {
        continue;
      }

      const index = genCandidate(prevCol1, prevCol2);

      if (index) {
        candidates[index] = {};
      }
    }
  }

  return candidates;
}

/**
 * Next step of algorythm.
 *
 * @param  {Object} pointNeighb     Hashmap of all point neighbourhoods 'pointIDtraittraitID'
 * @param  {Object} prevColocations Hashmap of previous step colocations 'trait1,trait2,...'
 *                                {points: [centerPoint, point2, point3, ...], correct: bool}
 * @param  {Float} minPrev         Minimum prev. for colocation to be considered valid
 * @param  {Object} pointData    Array of point Objects ({id, trait, locationX, locationY})
 * @param  {HTMLNode} dataTextVis Container for text visualisation
 * @return {Object}             Hashmap of lenght 3 (4, 5, 6,...) colocations.
 */
module.exports = function generateColocations(pointNeighb, prevColocations, minPrev, pointData, dataTextVis) {
  const col = genCandidates(prevColocations, minPrev);
  let textVisHtml = '<table>';

  for (const candidate in col) {
    textVisHtml += textVisHeader(candidate);
    [col[candidate].instances, textVisHtml] = fillCandidate(candidate, pointNeighb, prevColocations, textVisHtml);
    col[candidate] = cacp(col[candidate], candidate, pointData);
    textVisHtml += textVisFooter(candidate, col[candidate]);
  }

  textVisHtml += '</table>';
  if (textVisHtml !== '<table></table>') {
    dataTextVis.innerHTML = textVisHtml;
  }

  return col;
};
