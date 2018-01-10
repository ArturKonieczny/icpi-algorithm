const { expect } = require('chai');
const first = require('../../src/steps/first');
const testCases = require('./testCases');

describe('first step results', () => {
  testCases.forEach((testCase) => {
    const result = first(testCase.input.pointData);

    for (const key of Object.keys(testCase.output)) {
      it(`Should have property ${key}`, () => {
        expect(result).to.have.property(key);
      });

      it(`property ${key} should be an Object`, () => {
        expect(result[key]).to.be.an('Object');
      });

      it(`Object ${key} should have property instances`, () => {
        expect(result[key]).to.have.property('instances');
      });

      it(`property instances should be an Array`, () => {
        expect(result[key].instances).to.be.an('Array');
      });

      it(`${key} instances length should be equal to ${testCase.output[key].instances.length}`, () => {
        expect(result[key].instances.length).to.be.equal(testCase.output[key].instances.length);
      });
    }
  });
});
