const { expect } = require('chai');
const next = require('../../src/steps/next');
const testCases = require('./testCases');

describe('next step results', () => {
  testCases.forEach((testCase) => {
    const result = next(testCase.input.icpiTree, testCase.input.prevCollocations, testCase.input.singleElementCollocations);

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

      it(`Object ${key} should have property prev`, () => {
        expect(result[key]).to.have.property('prev');
      });

      it(`${key} property prev should be equal ${testCase.output[key].prev}`, () => {
        expect(result[key].prev).to.equal(testCase.output[key].prev);
      });

      const traits = key.split(',');

      for (const trait of traits) {
        it(`Object ${key} should have property ${trait}`, () => {
          expect(result[key]).to.have.property(trait);
        });

        it(`${key} property ${trait} should be equal ${testCase.output[key][trait]}`, () => {
          expect(result[key][trait]).to.equal(testCase.output[key][trait]);
        });
      }
    }
  });
});
