/**
 * ---------------------------------------------------------------------------
 * LOAD-HELPER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

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

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProperty = loadTaskHelper('define-property');
/// #}}} @func defineProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
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

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadTaskHelper('set-error');
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

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var DIR = freezeObject({
  JSPP: resolvePath(__dirname),
  TASK: resolvePath(__dirname, '../../helpers')
});
/// #}}} @const DIR

/// #}}} @group PATHS

/// #{{{ @group CACHE
//////////////////////////////////////////////////////////////////////////////
// CACHE
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const global.__JSPP_LOAD_CACHE

if ( !('__JSPP_LOAD_CACHE' in global) || !isObject(global.__JSPP_LOAD_CACHE) )
  defineProperty(global, '__JSPP_LOAD_CACHE', {
    'value': createObject(null),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });

/// #}}} @const global.__JSPP_LOAD_CACHE

/// #{{{ @const CACHE
/**
 * @private
 * @const {!Object<string, (!Object|!Function)>}
 * @dict
 */
var CACHE = global.__JSPP_LOAD_CACHE;
/// #}}} @const CACHE

/// #}}} @group CACHE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
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
  /** @type {string} */
  var key;

  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');

  name = name.replace(DIR_PATH, '');
  key = name.replace(JS_EXT, '');

  if (!key)
    throw setEmptyError(new Error, 'name');

  if ( hasOwnProperty(CACHE, key) )
    return CACHE[key];

  name = key + '.js';
  path = resolvePath(DIR.JSPP, name);

  if ( !isFile(path) ) {
    path = resolvePath(DIR.TASK, name);

    if ( !isFile(path) )
      throw setError(new Error,
        'invalid readable file path for helper `name`\n' +
        '    file-name: `' + name + '`\n' +
        '    task-path: `' + path + '`\n' +
        '    jspp-path: `' + resolvePath(DIR.JSPP, name) + '`');
  }

  defineProperty(CACHE, key, {
    'value': require(path),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });

  return CACHE[key];
}
/// #}}} @func loadHelper

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = loadHelper;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
