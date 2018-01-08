const traitNames = require('../dictionaries/traitNames');

/**
 * Returns trait name. Hotfix...
 *
 * @param  {Integer} traitID Trait ID.
 * @return {String}         Trait Name.
 */
function translateTrait(traitID) {
  return traitNames(traitID);
}

/**
 * Creates header row for text visualisation table.
 *
 * @param  {String} candidate Candidate hash 'trait1,trait2,...'
 * @return {String}           Text visualisation table header.
 */
module.exports = function createHeaderRow(candidate) {
  const candidateTraits = candidate.split(',');
  const candidateTraitNames = candidateTraits.map(translateTrait).join(',');
  const lastTrait = candidateTraits.pop();
  const prevColocation = candidateTraits.map(translateTrait).join(',');

  return `<tr class="row-header">
          <td class="width30">
            instances (${prevColocation})
          </td>
          <td class="width10">

          </td>
          <td class="width30">
            feature ${traitNames(lastTrait)} neigb.
          </td>
          <td class="width30">
            instances (${candidateTraitNames})
          </td>
        </tr>`;
};
