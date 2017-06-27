/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkDetails
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

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
 * @param {string} content
 * @param {!Object<string, string>} refs
 * @return {string}
 */
var insertRefs = require('./insert-refs.js');

/**
 * @private
 * @param {string} docs
 * @return {string}
 */
var mkDetail = require('./mk-detail.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} docs
 *   The JSDoc details for each public method.
 * @param {!Object<string, string>} refs
 * @return {string}
 */
module.exports = function mkDetails(docs, refs) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  result = '';

  len = docs.length;
  i = -1;
  while ( isLT(++i, len) )
    result += mkDetail(docs[i]);

  return insertRefs(result, refs);
};
