/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkBody
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
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var getDocs = require('./get-docs.js');

/**
 * @private
 * @param {string} content
 * @return {!Object<string, string>}
 */
var getRefs = require('./get-refs.js');

/**
 * @private
 * @param {!Array<string>} docs
 * @param {!Object<string, string>} refs
 * @return {string}
 */
var mkDetails = require('./mk-details.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkBody(content, fscontent) {

  /** @type {!Object<string, string>} */
  var refs;
  /** @type {!Array<string>} */
  var docs;
  /** @type {string} */
  var body;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !isString(fscontent) && !isUndefined(fscontent) )
    throw new TypeError('invalid `fscontent` type (must be a string or undefined)');

  docs = getDocs(content);
  refs = getRefs(content);
  body = mkDetails(docs, refs);

  if (fscontent) {
    docs = getDocs(fscontent);
    refs = getRefs(fscontent);
    body += mkDetails(docs, refs);
  }

  return body;
};
