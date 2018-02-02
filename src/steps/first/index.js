/**
 * Finds 1-el collocations.
 * @param  {Array}  pointData   Array of point Objects {id, trait, locationX, locationY}
 * @return {Object}                           Hashmap of 2-el collocations.
 */
module.exports = function firstStep(pointData) {
  const collocation = {};

  for (const point of pointData) {
    const { id, trait } = point;

    if (collocation[trait]) {
      collocation[trait].instances.push([id]);
    } else {
      collocation[trait] = {
        instances: [ [id] ]
      };
    }
  }

  return collocation;
};
