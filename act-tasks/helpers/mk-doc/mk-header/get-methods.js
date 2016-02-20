/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethods
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var get = require('../../get-match');

var METHOD = /[a-z]+(?:\.[a-zA-Z._]+)?/;
var ALIAS  = /\([a-zA-Z.*|_]+\)/;

/**
 * @param {string} section
 * @param {string} content
 * @return {string}
 */
module.exports = function getMethods(section, content) {

  /** @type {string} */
  var methods;
  /** @type {!Array<string>} */
  var lines;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  section = '[' + section + '][' + section, ']';
  methods = '';
  lines = content.split('\n');
  len = lines.length;
  i = -1;
  while (++i < len) methods += getMethod(section, lines[i]);
};

/**
 * @private
 * @param {string} section
 * @param {string} line
 * @return {string}
 */
function getMethod(section, line) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var alias;

  method = get(line, METHOD);
  method = '[' + method + '](#' + method.replace(/\./g, '') + ')';

  alias = get(line, ALIAS);
  alias = alias.replace('|', ', ');
  alias = alias.replace(/[*()]/g, '');

  return '| ' + method + ' | ' + section + ' | ' + alias + ' |\n';
}
