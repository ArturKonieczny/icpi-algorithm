const colors = [
  '#ff0000',
  '#40ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ff00',
  '#0080ff',
  '#ffbf00',
  '#ff00bf',
  '#00ff40',
  '#0040ff',
  '#bfff00',
  '#ff0080',
  '#ff4000',
  '#80ff00',
  '#00ffff',
  '#ff8000',
  '#8000ff',
  '#00ff80',
  '#4000ff',
  '#ff0040',
  '#00ffbf',
  '#bf00ff',
  '#00bfff',
  '#330000'
];

/**
 * Returns color of given trait.
 *
 * @param  {Integer} traitID ID of a trait
 * @return {string}         Color of a trait
 */
module.exports = function returnTraitColor(traitID) {
  if (traitID < colors.length) {
    return colors[traitID];
  }

  return '#663300';
};
