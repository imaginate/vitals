/**
 * ---------------------------------------------------------------------------
 * GET-PATH-NAME HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR_PATH
/**
 * @private
 * @const {!RegExp}
 */
var DIR_PATH = /^.*\//;
/// #}}} @const DIR_PATH

/// #{{{ @const END_SLASH
/**
 * @private
 * @const {!RegExp}
 */
var END_SLASH = /\/$/;
/// #}}} @const END_SLASH

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const REL_DIR
/**
 * @private
 * @const {!RegExp}
 */
var REL_DIR = /^\.\.?\/?$/;
/// #}}} @const REL_DIR

/// #{{{ @const ROOT_PATH
/**
 * @private
 * @const {!RegExp}
 */
var ROOT_PATH = /^(?:[A-Z]:\/?|\/)$/;
/// #}}} @const ROOT_PATH

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = require('./clean-path.js');
/// #}}} @func cleanPath

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getPathName
/**
 * @public
 * @param {string} path
 * @return {string}
 */
function getPathName(path) {

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');

  path = cleanPath(path);

  if ( ROOT_PATH.test(path) )
    throw setError(new Error,
      'invalid root directory path for `path` parameter\n' +
      '    path-value: `' + path + '`');
  if ( REL_DIR.test(path) )
    throw setError(new Error,
      'invalid relative directory path for `path` parameter\n' +
      '    path-value: `' + path + '`');

  path = path.replace(END_SLASH, '');
  return path.replace(DIR_PATH, '');
}
/// #}}} @func getPathName

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getPathName;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
