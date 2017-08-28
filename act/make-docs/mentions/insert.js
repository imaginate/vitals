/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: insertMentions
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

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} doc
 * @return {string}
 */
var insertMentionsName = require('./insert-name.js');

/**
 * @private
 * @param {string} doc
 * @return {string}
 */
var insertMentionsUrl = require('./insert-url.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} doc
 * @return {string}
 */
module.exports = function insertMentions(doc) {

  if ( !isString(doc) )
    throw new TypeError('invalid `doc` type (must be a string)');

  doc = insertMentionsName(doc);
  return insertMentionsUrl(doc);
};
