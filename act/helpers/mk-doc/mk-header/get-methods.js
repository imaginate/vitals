/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethods
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var get = require('../../get-match');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!RegExp}
 */
var ALIAS = /\([a-zA-Z.*|_]+\)/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var MAIN = /^[^\.]+/;

/**
 * @private
 * @const {!RegExp}
 */
var METHOD = /[a-z]+(?:\.[a-zA-Z._]+)?/;

/**
 * @private
 * @const {!RegExp}
 */
var PROP = /[a-z]\./;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

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
  /** @type {string} */
  var link;

  method = getMatch(line, METHOD);

  link = '#user-content-';
  link += PROP.test(method)
    ? method.replace(MAIN, '')
    : 'main';
  link = link.replace(/\./g, '');

  alias = getMatch(line, ALIAS);
  alias = alias.replace('|', ', ');
  alias = alias.replace(/[*()]/g, '');

  return '| [' + method  + '](' + link    + ') ' +
         '| [' + section + '][' + section + '] ' +
         '| ' + alias + ' ' +
         '|\n';
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
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

  methods = '';

  lines = content.split('\n');
  len = lines.length;
  i = -1;
  while ( isLT(++i, len) )
    methods += getMethod(section, lines[i]);
  return methods;
};
