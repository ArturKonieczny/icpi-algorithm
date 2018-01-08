const traitNames = require('../dictionaries/traitNames');
const traitColors = require('../dictionaries/traitColors');
const nodeSize = 1;

/**
 * Adds a node to a graph of a sigma.js instance.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Object} point         Point data {id, trait, locationX, locationY}
 * @return {type}              Does not return anything.
 */
function addNode(sigmaInstance, point) {
  sigmaInstance.graph.addNode({
    id: point.id,
    size: nodeSize,
    x: point.locationX,
    y: point.locationY,
    label: `${traitNames(point.trait)}${point.id}`,
    color: traitColors(point.trait)
  });
}

/**
 * Adds several nodes to a graph of a sigma.js instance.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {Array} points        Array of point Objects ({id, trait, locationX, locationY})
 * @return {type}               Does not return anything.
 */
function addNodes(sigmaInstance, points) {
  points.forEach((point) => addNode(sigmaInstance, point));
}

/**
 * Adds an edge to a graph of a sigma.js instance.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {Integer} sourcePoint   Source point ID
 * @param  {Integer} targetPoint   Target point ID
 * @return {type}               Does not return anything.
 */
function addEdge(sigmaInstance, sourcePoint, targetPoint) {
  sigmaInstance.graph.addEdge({
    id: `${sourcePoint}:${targetPoint}`,
    source: sourcePoint,
    target: targetPoint,
    color: '#000'
  });
}

/**
 * Adds several edges to a graph of a sigma.js instance based on point neighborhood.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js
 * @param  {Object} pointNeighb   Hashmap of all points neighbourhoods <pointIDtraittraitID>.
 *                                Each item is an Array of neighbours IDs.
 * @return {type}               Does not return anything.
 */
function addEdges(sigmaInstance, pointNeighb) {
  for (const pointEdges in pointNeighb) {
    const [sourcePoint] = pointEdges.split('trait');

    for (let index = 0; index < pointNeighb[pointEdges].length; index++) {
      addEdge(sigmaInstance, sourcePoint, pointNeighb[pointEdges][index]);
    }
  }
}

/**
 * Draws a sigma.js graph after adding all points and edges.
 *
 * @param  {Object} sigmaInstance Instance of sigma.js.
 * @param  {Array} points        Array of point objects ({id, trait, locationX, locationY}).
 * @param  {Object} pointNeighb   Hashmap of all points neighbourhoods <pointIDtraittraitID>.
 *                              Each item is an Array of neighbours IDs.
 * @return {type}               Does not return anything.
 */
module.exports = function drawGraph(sigmaInstance, points, pointNeighb) {
  addNodes(sigmaInstance, points);
  addEdges(sigmaInstance, pointNeighb);
  sigmaInstance.refresh();
};
