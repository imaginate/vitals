/**
 * ---------------------------------------------------------------------------
 * PREPROCESSOR
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./.load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @step setupClasses

loadHelper('setup-classes');

/// #}}} @step setupClasses

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} name
 * @return {!Function}
 */
var loadClass = loadHelper('load-class');
/// #}}} @func loadClass

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group CONSTRUCTORS

/// #{{{ @func Dir
/**
 * @private
 * @param {string} path
 * @param {?Dir=} parent
 * @constructor
 * @struct
 */
var Dir = loadClass('directory');
/// #}}} @func Dir

/// #}}} @group CONSTRUCTORS

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setDirError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setDirError = setError.dir;
/// #}}} @func setDirError

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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func main
/**
 * @public
 * @param {string} src
 *   The file-system path to the root directory containing the source code you
 *   want to preprocess.
 * @param {(?function(string))=} log = `console.log || null`
 *   The `function` to use when logging progress indicators. If it is `null`,
 *   no progress messages are logged.
 * @return {!Dir}
 */
function main(src, log) {

  /// #{{{ @step declare-variables

  /** @type {!Dir} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');
  if ( !isNull(log) && !isUndefined(log) && !isFunction(log) )
    throw setTypeError(new TypeError, 'log', '(?function(string))=');

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-src-path

  if (!src)
    throw setEmptyError(new Error, 'src');

  src = resolvePath(src);

  if ( !isDirectory(src) )
    throw setDirError(new Error, 'src', src);

  /// #}}} @step verify-src-path

  /// #{{{ @step setup-log-function

  if ( isUndefined(log) ) {
    log = typeof console === 'object'
            && !!console
            && 'log' in console
            && !!console.log
            && isFunction(console.log)
      ? console.log
      : null;
  }

  /// #}}} @step setup-log-function

  /// #{{{ @step log-intro

  log && log('| -------------------------------- |');
  log && log('| JS PREPROCESSSOR --------------- |');

  /// #}}} @step log-intro

  /// #{{{ @step make-root-dir

  log && log('| creating root dir node --------- |');
  dir = new Dir(src);

  /// #}}} @step make-root-dir

  /// #{{{ @step load-files

  log && log('| loading each file -------------- |');
  dir.load();

  /// #}}} @step load-files

  /// #{{{ @step preparse-files

  log && log('| preparsing each file ----------- |');
  dir.preparse();

  /// #}}} @step preparse-files

  /// #{{{ @step parse-files

  log && log('| parsing each file -------------- |');
  dir.parse();

  /// #}}} @step parse-files

  /// #{{{ @step return-root-dir

  log && log('| returning root dir node -------- |');
  log && log('| -------------------------------- |');
  return dir;

  /// #}}} @step return-root-dir
}
/// #}}} @func main

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = main;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
