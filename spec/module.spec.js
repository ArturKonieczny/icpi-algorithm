const { expect } = require('chai');
const icpi = require('../index');

describe('module exports', () => {
  it('should be a function', () => {
    expect(icpi).to.be.a('function');
  });

  it('should accept at lest one parameter', () => {
    expect(icpi.length).to.equal(2);
  });

  it('should be named icpi', () => {
    expect(icpi.name).to.equal('findCollocations');
  });
});
