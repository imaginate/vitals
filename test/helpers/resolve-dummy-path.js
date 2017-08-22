/**
 * ---------------------------------------------------------------------------
 * RESOLVE-DUMMY-PATH HELPER
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

/// #{{{ @const PATH
/**
 * @private
 * @const {!Object}
 * @struct
 */
var PATH = require('path');
/// #}}} @const PATH

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ARRAY

/// #{{{ @func sliceArray
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
 * @return {!Array}
 */
var sliceArray = require('./slice-array.js');
/// #}}} @func sliceArray

/// #}}} @group ARRAY

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

/// #{{{ @func isArguments
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArguments = IS.args;
/// #}}} @func isArguments

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isGT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;
/// #}}} @func isGT

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

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

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func _resolve
/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
 * @private
 * @param {...string} path
 *   In older node.js versions (e.g. `v0.10`) a #path parameter was required.
 * @return {string}
 */
var _resolve = PATH.resolve;
/// #}}} @func _resolve

/// #{{{ @func resolve
/**
 * @private
 * @param {string} cwd
 * @param {(!Array<string>|!Arguments<string>)} paths
 * @return {string}
 */
function resolve(cwd, paths) {

  switch (paths.length) {
    case 0:
      return cwd;
    case 1:
      return _resolve(cwd, paths[0]);
    case 2:
      return _resolve(cwd, paths[0], paths[1]);
    case 3:
      return _resolve(cwd, paths[0], paths[1], paths[2]);
    case 4:
      return _resolve(cwd, paths[0], paths[1], paths[2], paths[3]);
    case 5:
      return _resolve(cwd, paths[0], paths[1], paths[2], paths[3], paths[4]);
  }

  paths = sliceArray(paths);
  paths.unshift(cwd);
  return _resolve.apply(null, paths);
}
/// #}}} @func resolve

/// #{{{ @func resolveDummyPath
/**
 * @public
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
function resolveDummyPath(path) {

  /// #{{{ @const DIR
  /**
   * @private
   * @const {string}
   */
  var DIR = global.VITALS_TEST.DUMMY.DIR;
  /// #}}} @const DIR

  /// #{{{ @step resolve-path

  switch (arguments.length) {
    case 0:
      path = DIR;
      break;

    case 1:
      if ( isUndefined(path) ) {
        path = DIR;
        break;
      }

      if ( isString(path) ) {
        path = _resolve(DIR, path);
        break;
      }

      if ( ( !isArray(path) && !isArguments(path) ) || !isStringList(path) ) {
        throw setTypeError(new TypeError, 'path',
          '(!Array<string>|!Arguments<string>|...string)=');
      }

      path = resolve(DIR, path);
      break;

    default:
      if ( !isStringList(arguments) ) {
        throw setTypeError(new TypeError, 'path',
          '(!Array<string>|!Arguments<string>|...string)=');
      }

      path = resolve(DIR, arguments);
      break;
  }

  /// #}}} @step resolve-path

  /// #{{{ @step clean-path

  path = cleanPath(path);

  /// #}}} @step clean-path

  /// #{{{ @step return-path

  return path;

  /// #}}} @step return-path
}
/// #}}} @func resolveDummyPath

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = resolveDummyPath;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
