/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDocs
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
 * @const {!RegExp}
 */
var DOCS = /\/\*\*[^@]*?@public[\s\S]+?\*\/\n[a-zA-Z .'[\]_]+/g;

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
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {!Array<string>}
 */
var getMatches = require('../../get-matches.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @return {string}
 */
module.exports = function getDocs(content) {

  /** @type {!Array<string>} */
  var docs;

  docs = getMatches(content, DOCS);

  if ( isLT(methods.length, 1) )
    throw new Error('no public methods found for `mkBody` in `' + content + '`');

  return docs;
};
