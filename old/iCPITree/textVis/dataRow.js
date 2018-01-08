/**
 * Creates table row for text visualisation
 *
 * @param  {String} candidate       Colocation candidate hash 'trait1,trait2,...'
 * @param  {Object} prevColInstance {points: [centerPoint, point2], correct: bool}
 * @param  {Object} pointsNeighb     Hashmap of all point neighbourhoods 'pointIDtraittraitID'
 * @param  {Array} instances        instance: {points: [centerPoint, point2], correct: bool}
 * @return {String}                 Table row for text visualisation
 */
module.exports = function createDataRow(candidate, prevColInstance, pointsNeighb, instances) {
  const candidateTraits = candidate.split(',');
  const lastTrait = candidateTraits.pop();
  let rowDataHtml = `<tr class="row-data">
          <td>
          <div class="colocation-instance hover-gray">
            (${prevColInstance.points.join(', ')})
          </div>
          </td>
          <td>`;

  for (let i = 0; i < prevColInstance.points.length; i++) {
    rowDataHtml += `${prevColInstance.points[i]} neighb. <br />`;
  }

  rowDataHtml += '</td><td>';

  for (let j = 0; j < prevColInstance.points.length; j++) {
    const index = `${prevColInstance.points[j]}trait${lastTrait}`;

    rowDataHtml += pointsNeighb[index] ? `<div class="point-neighb hover-gray" title="${prevColInstance.points[j]}"> ${pointsNeighb[index].join(', ')}</div>` : `<div>&empty;</div>`;
  }
  rowDataHtml += `</td><td>`;

  for (let k = 0; k < instances.length; k++) {
    let flag = 0;

    for (let l = 0; l < instances[k].points.length - 1; l++) {
      if (instances[k].points[l] !== prevColInstance.points[l]) {
        flag = 1;
      }
    }
    if (flag === 0) {
      rowDataHtml += `<div class="colocation-instance hover-gray">(${instances[k].points.join(', ')}) </div>`;
    }
  }

  return `${rowDataHtml}</td></tr>`;
};
