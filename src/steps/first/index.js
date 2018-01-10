module.exports = function firstStep(pointData) {
  const collocation = {};

  for (const point of pointData) {
    const { id, trait } = point;

    if (collocation[trait]) {
      collocation[trait].instances.push(id);
    } else {
      collocation[trait] = {
        instances: [id]
      };
    }
  }

  return collocation;
};
