/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkDoc
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
var IS = require('../is.js');

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
 * @param {string=} fscontent
 * @return {string}
 */
var mkBody = require('./mk-body/index.js');

/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
var mkFooter = require('./mk-footer.js');

/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
var mkHeader = require('./mk-header/index.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkDoc(content, fscontent) {

  /** @type {string} */
  var result;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !isString(fscontent) && !isUndefined(fscontent) )
    throw new TypeError('invalid `fscontent` type (must be a string or undefined)');

  result = mkHeader(content, fscontent);
  result += mkBody(content, fscontent);
  result += mkFooter(content, fscontent);

  return result;
};
