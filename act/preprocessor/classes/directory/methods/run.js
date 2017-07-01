/**
 * ---------------------------------------------------------------------------
 * RUN METHOD
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

/// #{{{ @func Flags
/**
 * @private
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @constructor
 * @struct
 */
var Flags = loadClass('flags');
/// #}}} @func Flags

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

/// #{{{ @func setExtError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {(string|!Array<string>)} exts
 * @return {!RangeError}
 */
var setExtError = setError.ext;
/// #}}} @func setExtError

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

/// #{{{ @func setLocError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {!Dir} parent
 * @param {boolean} contain
 * @return {!RangeError}
 */
var setLocError = setError.loc;
/// #}}} @func setLocError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setPathNodeError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setPathNodeError = setError.pathNode;
/// #}}} @func setPathNodeError

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

/// #{{{ @group GET

/// #{{{ @func getPathNode
/**
 * @private
 * @param {(!Dir|!File)} src
 * @param {string} path
 * @return {(?Dir|?File)}
 */
var getPathNode = loadHelper('get-path-node');
/// #}}} @func getPathNode

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasDirectory
/**
 * @private
 * @param {string} src
 *   The file path to check in.
 * @param {string} path
 *   The directory path to check for.
 * @return {boolean}
 */
var hasDirectory = loadHelper('has-directory');
/// #}}} @func hasDirectory

/// #{{{ @func hasJsExt
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasJsExt = loadHelper('has-file-ext').construct('.js');
/// #}}} @func hasJsExt

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFlagsNode = loadHelper('is-flags-node');
/// #}}} @func isFlagsNode

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

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

/// #{{{ @func isStateObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStateObject = loadHelper('is-state-object');
/// #}}} @func isStateObject

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

/// #{{{ @func trimDirectory
/**
 * @private
 * @param {string} src
 *   The file path to trim from.
 * @param {string} path
 *   The directory path to trim.
 * @return {string}
 */
var trimDirectory = loadHelper('trim-directory');
/// #}}} @func trimDirectory

/// #{{{ @func trimPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathName = loadHelper('trim-pathname');
/// #}}} @func trimPathName

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Dir.prototype.run
/**
 * @public
 * @this {!Dir}
 * @param {string} src
 *   The file path to the source `File` instance you want to call
 *   `File.prototype.run` from. The file path may be relative or absolute. If
 *   it is a relative path, it is relative to the `Dir` instance (i.e. since
 *   only the root `Dir` instance is called from the exposed API, it is
 *   essentially relative to the root `Dir` instance).
 * @param {string} dest
 *   The file path to the destination you want to save the preprocessed result
 *   of `File.prototype.run`. The file path may be relative or absolute. If
 *   it is a relative path, it is relative to the `cwd`. The directory path up
 *   to the file name of the resolved #dest path must already exist. If a file
 *   exists at the resolved *dest* path, it is overwritten.
 * @param {(!Object<string, (boolean|!Object<string, boolean>)>|!Flags)} state
 *   The enabled, `true`, or disabled, `false`, state for every conditional
 *   command defined within the *src* `File` instance's *content* `array`.
 *   Each parent *state* `object` key must be a `Cond` instance's *tag*, *ID*
 *   (note that a leading colon, `":id"` or `"*:id"`, is required for parent
 *   *ID* key names), or *key* (e.g. `"tag:id"`). Parent *tag* keys may use a
 *   `boolean` or an `object` with *ID* key names and `boolean` values for
 *   their value. Parent *ID* or *key* keys must use a `boolean` value. The
 *   asterisk, `"*"`, denotes any number of wildcard characters within a *tag*
 *   or *ID* (within a *key* it only applies to the *tag* or *ID* where it is
 *   defined - it does NOT cross-over the separating colon). The question
 *   mark, `"?"`, denotes a single wildcard character within a *tag*, *ID*, or
 *   *key*. Every `Cond` instance within the *src* `File` instance must be
 *   defined in the *state* or an error will be thrown.
 * @param {(!function(string): string)=} alter
 *   The *alter* `function` is optional. If it is defined, it allows you to
 *   provide custom alterations to the preprocessed result of
 *   `File.prototype.run` before it is saved to the *dest*.
 * @return {string}
 */
function run(src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {!Flags} */
  var flags;
  /** @type {(?Dir|?File)} */
  var node;
  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'dest');
    case 2:
      throw setNoArgError(new Error, 'state');
    case 3:
      break;
    default:
      if ( !isUndefined(alter) && !isFunction(alter) )
        throw setTypeError(new TypeError, 'alter',
          '(!function(string): string)=');
  }

  if ( !isFlagsNode(state) && !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '(!Object<string, (boolean|!Object<string, boolean>)>|!Flags)');
  if ( !isString(dest) )
    throw setTypeError(new TypeError, 'dest', 'string');
  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');

  if (!dest)
    throw setEmptyError(new Error, 'dest');
  if (!src)
    throw setEmptyError(new Error, 'src');

  if ( !hasJsExt(dest) )
    throw setExtError(new RangeError, 'dest', dest, '.js');
  if ( !hasJsExt(src) )
    throw setExtError(new RangeError, 'src', src, '.js');

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-src-path

  src = resolvePath(this.path, src);

  if ( !isFile(src) )
    throw setFileError(new Error, 'src', src);
  if ( !hasDirectory(src, this.path) )
    throw setLocError(new RangeError, 'src', src, this, true);

  /// #}}} @step verify-src-path

  /// #{{{ @step get-src-node

  src = trimDirectory(src, this.path);
  node = getPathNode(this, src);

  /// #}}} @step get-src-node

  /// #{{{ @step verify-src-node

  if ( !isFileNode(node) )
    throw setPathNodeError(new Error, 'src', src);

  /// #}}} @step verify-src-node

  /// #{{{ @step verify-dest-path

  dest = resolvePath(dest);
  path = trimPathName(dest);

  if ( !isDirectory(path) )
    throw setDirError(new Error, 'dest', path);
  if ( hasDirectory(dest, this.path) )
    throw setLocError(new RangeError, 'dest', dest, this, false);

  /// #}}} @step verify-dest-path

  /// #{{{ @step make-flags

  flags = isFlagsNode(state)
    ? state
    : new Flags(state);

  /// #}}} @step make-flags

  /// #{{{ @step get-results

  result = isFunction(alter)
    ? node.run(dest, flags, alter)
    : node.run(dest, flags);

  /// #}}} @step get-results

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
}
/// #}}} @func Dir.prototype.run

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = run;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
