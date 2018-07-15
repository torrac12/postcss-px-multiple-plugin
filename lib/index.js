'use strict';

var postcss = require('postcss');
var multiple = require('./multiple')

module.exports = postcss.plugin('postcss-multiple', function (options) {
  return function (css, result) {
    var oldCssText = css.toString();
    var instance = new multiple(options);
    var newCssText = instance.generate(oldCssText);
    var newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  };
});
