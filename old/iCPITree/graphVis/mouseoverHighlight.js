const traitColors = require('../dictionaries/traitColors');

/**
 * Highlights a colocation on sigma.js graph.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Object} source        Source event object.
 * @return {type}               Does not return anything.
 */
function highlightColocation(sigmaInstance, source) {
  const points = source.target.innerText.replace(/\(/g, '').replace(/\)/g, '').split(', ');

  points.forEach((point) => {
    sigmaInstance.graph.nodes(point).color = '#000';
  });

  for (let index1 = 0; index1 < points.length; index1++) {
    for (let index2 = index1 + 1; index2 < points.length; index2++) {
      sigmaInstance.graph.edges(`${points[index1]}:${points[index2]}`).color = '#f00';
    }
  }

  sigmaInstance.refresh();
}

/**
 * Resets highlighted colocation after a "mouseleave".
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Object} source        Source event object.
 * @param  {Array} graphPoints   Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function resetColocation(sigmaInstance, source, graphPoints) {
  const colocationPoints = source.target.innerText.replace(/\(/g, '').replace(/\)/g, '').split(', ');

  colocationPoints.forEach((point) => {
    const pointTrait = graphPoints.find((graphPoint) => graphPoint.id === point
    ).trait;

    sigmaInstance.graph.nodes(point).color = traitColors(pointTrait);
  });

  for (let index1 = 0; index1 < colocationPoints.length; index1++) {
    for (let index2 = index1 + 1; index2 < colocationPoints.length; index2++) {
      sigmaInstance.graph.edges(`${colocationPoints[index1]}:${colocationPoints[index2]}`).color = '#000';
    }
  }
  sigmaInstance.refresh();
}

/**
 * Creates "mouseenter" and "mouseleave" events for colocations.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {HTMLnode} node        HTML node containing colocation points.
 * @param  {Array} points        Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function createColocationEvent(sigmaInstance, node, points) {
  node.addEventListener('mouseenter', (source) => highlightColocation(sigmaInstance, source));
  node.addEventListener('mouseleave', (source) => resetColocation(sigmaInstance, source, points));
}

/**
 * Creates events related to colocations mouseover.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {Array} points        Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function createColocationNodeEvents(sigmaInstance, points) {
  const colocationNodes = document.querySelectorAll('.colocation-instance')
  .forEach((node) => createColocationEvent(sigmaInstance, node, points));
}

/**
 * Highlights a point and its neighbourhood on a sigma.js graph.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Object} source        Source event object.
 * @return {type}               Does not return anything.
 */
function highlightNeightborhood(sigmaInstance, source) {
  const points = source.target.innerText.split(', ');
  const sourcePoint = source.target.title;

  sigmaInstance.graph.nodes(sourcePoint).color = '#777';
  points.forEach((point) => {
    sigmaInstance.graph.nodes(point).color = '#000';
    sigmaInstance.graph.edges(`${sourcePoint}:${point}`).color = '#f00';
  });
  sigmaInstance.refresh();
}

/**
 * Resets highlighted point and its neighbourhood after a "mouseleave".
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Object} source        Source event object.
 * @param  {Array} graphPoints   Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function resetNeightborhood(sigmaInstance, source, graphPoints) {
  const neighborhoodPoints = source.target.innerText.split(', ');
  const sourcePoint = source.target.title;
  const sourcePointTrait = graphPoints.find((graphPoint) => graphPoint.id === sourcePoint
  ).trait;

  sigmaInstance.graph.nodes(sourcePoint).color = traitColors(sourcePointTrait);
  neighborhoodPoints.forEach((point) => {
    const pointTrait = graphPoints.find((graphPoint) => graphPoint.id === point
    ).trait;

    sigmaInstance.graph.nodes(point).color = traitColors(pointTrait);
    sigmaInstance.graph.edges(`${sourcePoint}:${point}`).color = '#000';
  });
  sigmaInstance.refresh();
}

/**
 * Creates "mouseenter" and "mouseleave" events for neighbourhoods.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {HTMLnode} node        HTML node containing colocation points.
 * @param  {Array} points        Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function createNeighborhoodEvent(sigmaInstance, node, points) {
  node.addEventListener('mouseenter', (source) => highlightNeightborhood(sigmaInstance, source));
  node.addEventListener('mouseleave', (source) => resetNeightborhood(sigmaInstance, source, points));
}

/**
 * Creates events related to neighbourhood mouseover.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {Array} points        Array of point objects ({id, trait, locationX, locationY}).
 * @return {type}               Does not return anything.
 */
function createNeighborhoodNodeEvents(sigmaInstance, points) {
  const colocationNodes = document.querySelectorAll('.point-neighb')
  .forEach((node) => createNeighborhoodEvent(sigmaInstance, node, points));
}

module.exports = {
  createColocationNodeEvents,
  createNeighborhoodNodeEvents
};
