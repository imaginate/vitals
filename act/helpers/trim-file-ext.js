/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimFileExt
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
 * @const {!RegExp}
 */
var DIR = /^[\s\S]*[\\\/]/;

/**
 * @private
 * @const {!RegExp}
 */
var DOT = /^\./;

/**
 * @private
 * @const {!RegExp}
 */
var EXT = /[^\.]\.[a-zA-Z0-9]+$/;

/**
 * @private
 * @const {!RegExp}
 */
var EXT_ONLY = /\.[a-zA-Z0-9]+$/;

/**
 * @private
 * @const {!RegExp}
 */
var FILE = /^\.?[\s\S]+\./;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

/**
 * @private
 * @const {!RegExp}
 */
var VALID_EXT = /^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/;

/**
 * @private
 * @const {!RegExp}
 */
var VALID_FILE = /^\.?[^\.]+/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = require('./clean-path.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} ext
 *   If `ext` does not begin with a period, `"."`, one will be automatically
 *   appended. The `ext` must match the following `RegExp` of valid characters,
 *   `/^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/`.
 * @param {string} path
 * @return {string}
 */
module.exports = function trimFileExt(ext, path) {

  /** @type {string} */
  var name;

  if ( !isString(ext) )
    throw new TypeError('invalid `ext` type (must be a string)');
  if ( !ext )
    throw new Error('invalid empty `ext` string');
  if ( !VALID_EXT.test(ext) )
    throw new Error('invalid characters in `ext` (alphanumerics only)');
  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');
  if ( !path )
    throw new Error('invalid empty `path` string');

  name = path.replace(DIR, '');

  if ( !VALID_FILE.test(name) )
    throw new TypeError('invalid `path` file name `' + name + '`');

  ext = ext.replace(DOT, '');

  if ( EXT.test(name) ) {
    name = name.replace(FILE, '');
    if (ext === name)
      path = path.replace(EXT_ONLY, '');
  }

  return cleanPath(path);
};

/**
 * @public
 * @param {string} ext
 *   If `ext` does not begin with a period, `"."`, one will be automatically
 *   appended. The `ext` must match the following `RegExp` of valid characters,
 *   `/^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/`.
 * @return {function(string): string}
 */
module.exports.construct = function newTrimFileExt(ext) {

  if ( !isString(ext) )
    throw new TypeError('invalid `ext` type (must be a string)');
  if ( !ext )
    throw new Error('invalid empty `ext` string');
  if ( !VALID_EXT.test(ext) )
    throw new Error('invalid characters in `ext` (alphanumerics only)');

  ext = '.' + ext.replace(DOT, '');
  ext = ext.replace(/\./g, '\\.');

  /**
   * @private
   * @const {!RegExp}
   */
  var EXT_PATTERN = new RegExp(ext + '$');

  /**
   * @public
   * @param {string} path
   * @return {string}
   */
  return trimFileExt(path) {

    /** @type {string} */
    var name;

    if ( !isString(path) )
      throw new TypeError('invalid `path` type (must be a string)');
    if ( !path )
      throw new Error('invalid empty `path` string');

    name = path.replace(DIR, '');

    if ( !VALID_FILE.test(name) )
      throw new TypeError('invalid `path` file name `' + name + '`');

    path = path.replace(EXT_PATTERN, '');
    return cleanPath(path);
  };
};
