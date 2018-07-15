'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var postcss = require('postcss');
var multiple = require('../lib/index');

describe('postcss-multiple', function () {
  it('[default] should output right', function () {
    var srcPath = path.join(__dirname, 'source.css');
    var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
    var actual = postcss().use(new multiple({times: 2})).process(srcText).css;
    var expected = fs.readFileSync(path.join(__dirname, 'dist.css'), {encoding: 'utf8'});
    assert.deepEqual(actual, expected);
  });
});
