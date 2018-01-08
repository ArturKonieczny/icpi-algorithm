const traitNames = require('../dictionaries/traitNames');

/**
 * Creates table footer for text visualisation.
 *
 * @param  {String} candidate  Colocation candidate hash 'trait1,trait2,...'
 * @param  {Object} colocation  {instances: Array, trait1count: int, trait2count: int, ..., prev: float }
 * @return {String}            Text visualisation table footer.
 */
module.exports = function createFooterRow(candidate, colocation) {
  const candidateTraits = candidate.split(',');
  let textVisHtml = `<tr class="row-header">
    <td>

    </td>
    <td>

    </td>
    <td>

    </td>
    <td>`;

  for (let i = 0; i < candidateTraits.length; i++) {
    const index = `trait${candidateTraits[i]}count`;

    if (colocation[index]) {
      textVisHtml += `feature ${traitNames(candidateTraits[i])}: ${colocation[index]}; <br>`;
    }
  }

  return `${textVisHtml}<hr> prev.: ${colocation.prev}</td></tr>`;
};
