/**
 * ---------------------------------------------------------------------------
 * LOAD-HELPER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group INIT-HELPERS
//////////////////////////////////////////////////////////////////////////////
// INIT-HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #}}} @group INIT-HELPERS

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

/// #{{{ @const HELPER_DIR
/**
 * @private
 * @const {string}
 */
var HELPER_DIR = resolvePath(__dirname);
/// #}}} @const HELPER_DIR

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const JS_EXT
/**
 * @private
 * @const {!RegExp}
 */
var JS_EXT = /\.js$/;
/// #}}} @const JS_EXT

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isFile
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

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

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @public
 * @param {string} name
 * @return {(!Object|!Function)}
 */
function loadHelper(name) {

  /** @type {string} */
  var path;

  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');

  name = name.replace(DIR_PATH, '');
  name = name.replace(JS_EXT, '');

  if (!name)
    throw setEmptyError(new Error, 'name');

  path = resolvePath(HELPER_DIR, name + '.js');

  if ( !isFile(path) )
    throw setFileError(new Error, 'name', path);

  return require(path);
}
/// #}}} @func loadHelper

module.exports = loadHelper;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
