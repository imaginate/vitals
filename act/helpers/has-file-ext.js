/**
 * ---------------------------------------------------------------------------
 * HAS-FILE-EXT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @const {!RegExp}
 */
var DIR = /^[\s\S]*[\\\/]/;
/// #}}} @const DIR

/// #{{{ @const DOT
/**
 * @private
 * @const {!RegExp}
 */
var DOT = /^\./;
/// #}}} @const DOT

/// #{{{ @const EXT
/**
 * @private
 * @const {!RegExp}
 */
var EXT = /[^\.]\.[a-zA-Z0-9]+$/;
/// #}}} @const EXT

/// #{{{ @const EXT_ONLY
/**
 * @private
 * @const {!RegExp}
 */
var EXT_ONLY = /\.[a-zA-Z0-9]+$/;
/// #}}} @const EXT_ONLY

/// #{{{ @const FILE
/**
 * @private
 * @const {!RegExp}
 */
var FILE = /^\.?[\s\S]+\./;
/// #}}} @const FILE

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const VALID_EXT
/**
 * @private
 * @const {!RegExp}
 */
var VALID_EXT = /^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/;
/// #}}} @const VALID_EXT

/// #{{{ @const VALID_FILE
/**
 * @private
 * @const {!RegExp}
 */
var VALID_FILE = /^\.?[^\.]+/;
/// #}}} @const VALID_FILE

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasFileExt
/**
 * @public
 * @param {string} ext
 *   If the *ext* does not begin with a period, `"."`, one will be
 *   automatically appended. The *ext* must match the following `RegExp` of
 *   valid characters: `/^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/`.
 * @param {string} path
 * @return {boolean}
 */
function hasFileExt(ext, path) {

  /** @type {string} */
  var name;

  if ( !isString(ext) )
    throw new TypeError('invalid `ext` datat type\n' +
      '    valid-types: `string`');
  if (!ext)
    throw new Error('invalid empty `string` for `ext`');
  if ( !VALID_EXT.test(ext) )
    throw new Error('invalid characters in `ext`\n' +
      '    valid: `' + VALID_EXT.toString() + '`\n' +
      '    ext: `"' + ext + '"`');

  if ( !isString(path) )
    throw new TypeError('invalid `path` datat type\n' +
      '    valid-types: `string`');
  if (!path)
    throw new Error('invalid empty `string` for `path`');

  name = path.replace(DIR, '');

  if ( !VALID_FILE.test(name) )
    throw new Error('invalid file name in `path`\n' +
      '    valid: `' + VALID_FILE.toString() + '`\n' +
      '    path: `"' + path + '"`\n' +
      '    name: `"' + name + '"`');

  ext = ext.replace(DOT, '');

  if ( !EXT.test(name) )
    return false;

  name = name.replace(FILE, '');
  return ext === name;
}
/// #}}} @func hasFileExt

/// #{{{ @func newHasFileExt
/**
 * @public
 * @param {string} ext
 *   If the *ext* does not begin with a period, `"."`, one will be
 *   automatically appended. The *ext* must match the following `RegExp` of
 *   valid characters: `/^\.?[a-zA-Z0-9][a-zA-Z0-9\.]*$/`.
 * @return {!function(string): boolean}
 */
function newHasFileExt(ext) {

  if ( !isString(ext) )
    throw new TypeError('invalid `ext` datat type\n' +
      '    valid-types: `string`');
  if (!ext)
    throw new Error('invalid empty `string` for `ext`');
  if ( !VALID_EXT.test(ext) )
    throw new Error('invalid characters in `ext`\n' +
      '    valid: `' + VALID_EXT.toString() + '`\n' +
      '    ext: `"' + ext + '"`');

  ext = '.' + ext.replace(DOT, '');
  ext = ext.replace(/\./g, '\\.');

  /// #{{{ @const EXT_PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var EXT_PATTERN = new RegExp(ext + '$');
  /// #}}} @const EXT_PATTERN

  /// #{{{ @func hasFileExt
  /**
   * @public
   * @param {string} path
   * @return {boolean}
   */
  function hasFileExt(path) {

    /** @type {string} */
    var name;

    if ( !isString(path) )
      throw new TypeError('invalid `path` datat type\n' +
        '    valid-types: `string`');
    if (!path)
      throw new Error('invalid empty `string` for `path`');

    name = path.replace(DIR, '');

    if ( !VALID_FILE.test(name) )
      throw new Error('invalid file name in `path`\n' +
        '    valid: `' + VALID_FILE.toString() + '`\n' +
        '    path: `"' + path + '"`\n' +
        '    name: `"' + name + '"`');

    return EXT_PATTERN.test(path);
  }
  /// #}}} @func hasFileExt

  return hasFileExt;
}
/// #}}} @func newHasFileExt

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

hasFileExt.construct = newHasFileExt;
module.exports = hasFileExt;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
