/**
 * ---------------------------------------------------------------------------
 * HAS-BUILD HELPER
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

/// #{{{ @func setFileError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setFileError = setError.file;
/// #}}} @func setFileError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

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

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isInArray
/**
 * @private
 * @param {(!Array|!Arguments|!Object)} src
 *   The #src must be `array-like`.
 * @param {*} val
 * @return {boolean}
 */
var isInArray = IS.inArray;
/// #}}} @func isInArray

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getBuilds
/**
 * @private
 * @param {string} path
 * @return {!Array<string>}
 */
var getBuilds = require('./get-builds.js');
/// #}}} @func getBuilds

/// #{{{ @func hasBuild
/**
 * @public
 * @param {string} path
 * @param {string} build
 * @return {boolean}
 */
function hasBuild(path, build) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var builds;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      throw setNoArgError(new Error, 'build');
  }

  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if ( !isString(build) ) {
    throw setTypeError(new TypeError, 'build', 'string');
  }

  if (!path) {
    throw setEmptyError(new Error, 'path');
  }
  if (!build) {
    throw setEmptyError(new Error, 'build');
  }

  if ( !isFile(path) ) {
    throw setFileError(new Error, 'path', path);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-builds

  builds = getBuilds(path);

  /// #}}} @step get-builds

  /// #{{{ @step return-result

  return isInArray(builds, build);

  /// #}}} @step return-result
}
/// #}}} @func hasBuild

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = hasBuild;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
