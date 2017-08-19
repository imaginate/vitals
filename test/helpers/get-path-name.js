/**
 * ---------------------------------------------------------------------------
 * GET-PATH-NAME HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const NOT_PATH_NAME
/**
 * @private
 * @const {!RegExp}
 */
var NOT_PATH_NAME = /^[\s\S]*\//;
/// #}}} @const NOT_PATH_NAME

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

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

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setRootDirError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setRootDirError = setError.rootDir;
/// #}}} @func setRootDirError

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

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isRelativeDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isRelativeDirectory = IS.relativeDirectory;
/// #}}} @func isRelativeDirectory

/// #{{{ @func isRootDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isRootDirectory = IS.rootDirectory;
/// #}}} @func isRootDirectory

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group PATH

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = require('./clean-path.js');
/// #}}} @func cleanPath

/// #{{{ @func trimSlash
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimSlash = require('./trim-slash.js');
/// #}}} @func trimSlash

/// #}}} @group PATH

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

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if (!path) {
    throw setEmptyError(new Error, 'path');
  }
  if ( isRootDirectory(path) ) {
    throw setRootDirError(new Error, 'path', path);
  }
  if ( isRelativeDirectory(path) ) {
    throw setError(new Error,
      'invalid relative directory path for `path` parameter\n' +
      '    path-value: `' + path + '`');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-path-name

  path = cleanPath(path);
  path = trimSlash(path);
  path = path.replace(NOT_PATH_NAME, '');

  /// #}}} @step get-path-name

  /// #{{{ @step return-path-name

  return path;

  /// #}}} @step return-path-name
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
