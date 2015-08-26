'use strict';

const { TestUtils } = require('react/addons').addons;
const { expect } = require('chai');

describe('Main module', () => {

  it('should re-export expected submodules', () => {
    let Classy = require('../src/index');
    let decorator = require('../src/decorator');
    let utils = require('../src/utils');
    expect(Classy.default).to.be.a('function');
    expect(Classy.default).to.equal(Classy.Classy);
    expect(Classy.default).to.equal(decorator);
    expect(Classy.Utils).to.be.an('object');
    expect(Classy.Utils).to.equal(utils);
  });

});