/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethods
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var vitals = require('node-vitals')('base');
var cut    = vitals.cut;
var fuse   = vitals.fuse;
var get    = vitals.get;
var remap  = vitals.remap;
var roll   = vitals.roll;

var METHOD = /[a-z]+(?:\.[a-zA-Z.]+)?/;
var ALIAS  = /\([a-zA-Z.*|]+\)/;

/**
 * @param {string} section
 * @param {string} content
 * @return {string}
 */
module.exports = function getMethods(section, content) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var alias;
  /** @type {!Array<string>} */
  var lines;

  section = fuse('[', section, '][', section, ']');
  lines = content.split('\n');

  return roll.up('', lines, function(line) {

    method = get(line, METHOD)[0];
    method = fuse('[', method, '](#', cut(method, '.'), ')');

    alias = get(line, ALIAS)[0] || '';
    alias = remap(alias, '|', '\\|');
    alias = cut(alias, /\*/g);

    return fuse('| ', method, ' | ', section, ' | ', alias, ' |\n');
  });
};
