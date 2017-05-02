/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: toFile
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
var FS = require('fs');

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBuffer = IS.buffer;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} filepath
 * @param {(string|!Buffer)} content
 * @param {string=} encoding
 * @return {(string|!Buffer)}
 */
var writeFile = FS.writeFileSync;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {(!Buffer|string)} content
 * @param {string} filepath
 * @return {(!Buffer|string)}
 */
module.exports = function toFile(content, filepath) {

  if ( !isString(content) && !isBuffer(content) )
    throw new TypeError('invalid `content` type (must be a string or buffer)');
  if ( !isString(filepath) )
    throw new TypeError('invalid `filepath` type (must be a string)');

  if ( isBuffer(content) )
    writeFile(filepath, content);
  else
    writeFile(filepath, content, 'utf8');

  return content;
};
