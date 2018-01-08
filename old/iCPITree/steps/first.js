const cacp = require('./countAndCalcPrev');
const { textVisHeader, textVisFooter, textVisDataRow } = require('../textVis/');

/**
 * Apriori algorythm for length 2 candidates.
 *
 * @param  {Array} pointData Array of point Objects ({id, trait, locationX, locationY})
 * @return {Object}           Hashmap of all generated candidates {'trait1,trait2'}.
 */
function genCandidates2(pointData) {
  const candidates = {};

  for (const traitName1 in pointData.traits) {
    const trait1 = traitName1.split(':')[1];

    for (const traitName2 in pointData.traits) {
      const trait2 = traitName2.split(':')[1];

      if (trait1 < trait2) {
        candidates[`${trait1},${trait2}`] = {};
      }
    }
  }

  return candidates;
}

/**
 * Fills colocation candidates with instances using iCPI tree neighbourhoods.
 *
 * @param  {String} candidate   Hash of candidate to fill 'trait1,trait2'
 * @param  {Object} pointNeighb Hashmap of all points neighbourhoods <pointIDtraittraitID>.
 *                                Each item is an Array of neighbours IDs.
 * @param  {Array} pointData   Array of point Objects ({id, trait, locationX, locationY})
 * @param  {String} textVisHtml Part of text visualisation to be filled with data.
 * @return {Array}             [Colocation instances, newTextVisHtml]
 *                             Colocation instances: Array, instance: {points: [centerPoint, point2], correct: bool}
 */
function fillCandidates2(candidate, pointNeighb, pointData, textVisHtml) {
  const instances = [];
  const candidateTraits = candidate.split(',');
  let newTextVisHtml = textVisHtml;

  for (let i = 0; i < pointData.traits[`trait:${candidateTraits[0]}`].length; i++) {
    const centerPoint = pointData.traits[`trait:${candidateTraits[0]}`][i];
    const index = `${centerPoint}trait${candidateTraits[1]}`;

    if (pointNeighb[index]) {
      for (let k = 0; k < pointNeighb[index].length; k++) {
        const instance = {
          points: [centerPoint, pointNeighb[index][k]],
          correct: true
        };

        instances[instances.length] = instance;
      }
    }
    newTextVisHtml += textVisDataRow(candidate, {
      points: [centerPoint]
    }, pointNeighb, instances);
  }

  return [instances, newTextVisHtml];
}

/**
 * First step of iCPI algorythm. Generates and fills lenght 2 colocations.
 *
 * @param  {Object} pointNeighb Hashmap of all points neighbourhoods <pointIDtraittraitID>.
 *                                Each item is an Array of neighbours IDs.
 * @param  {Array} pointData   Array of point Objects ({id, trait, locationX, locationY})
 * @param  {HTMLNode} dataTextVis Container for text visualisation
 * @return {Object}             Hashmap of lenght 2 colocations.
 */
module.exports = function generateColocations(pointNeighb, pointData, dataTextVis) {
  const col2 = genCandidates2(pointData);
  let textVisHtml = '<table>';

  for (const candidate in col2) {
    textVisHtml += textVisHeader(candidate);
    [col2[candidate].instances, textVisHtml] = fillCandidates2(candidate, pointNeighb, pointData, textVisHtml);
    col2[candidate] = cacp(col2[candidate], candidate, pointData);
    textVisHtml += textVisFooter(candidate, col2[candidate]);
  }

  textVisHtml += '</table>';
  dataTextVis.innerHTML = textVisHtml;

  return col2;
};
