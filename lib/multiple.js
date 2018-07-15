'use strict';

var css = require('css');

var defaultConfig = {

};

var pxRegExp = /\b(\d+(?:\.\d+)?)(px)\b/i;

function Multiple(options) {
  this.config = {};
  if (!options.times) {
    console.error('param times should be set');
  }
  Object.assign(this.config, defaultConfig, options);
}

// generate @1x, @2x and @3x version stylesheet
Multiple.prototype.generate = function (cssText) {
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);
  var times = config.times

  function processRules(rules) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        var matched = pxRegExp.exec(declaration.value)
        // need transform: declaration && has 'px' && not has 'PX'
        if (declaration.type === 'declaration' && matched && matched[2] === 'px') {
          declaration.value = self._getCalcValue('px', declaration.value, times); 
        }
      }
    }
  }
  processRules(astObj.stylesheet.rules)
  return css.stringify(astObj);
};


Multiple.prototype._getCalcValue = function (type, value, times) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

  function getValue(val) {
    val = parseFloat(val.toFixed(config.remPrecision)); 
    return val == 0 ? val : val + type;
  }

  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return getValue($1 * times)
  });
};

module.exports = Multiple;
