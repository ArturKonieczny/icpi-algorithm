const { expect } = require('chai');
const findCollocations = require('../../src');
const testCases = require('./testCases');

describe('findCollocations results', () => {
  testCases.forEach((testCase) => {
    const result = findCollocations(testCase.input.pointData, testCase.input.icpiTree);

    it(`result should be an Array`, () => {
      expect(result).to.be.an('Array');
    });

    it(`result length should be equal to ${testCase.outputlength}`, () => {
      expect(result.length).to.be.equal(testCase.output.length);
    });
  });
});
