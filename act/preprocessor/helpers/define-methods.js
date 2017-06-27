/**
 * ---------------------------------------------------------------------------
 * DEFINE-METHODS HELPER
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

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadTaskHelper('cap-object');
/// #}}} @func capObject

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

/// #{{{ @func getFilePaths
/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If the #opts is a `boolean`, the #opts.deep option is set to its value.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid files.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute file paths instead of relative file paths.
 * @param {?boolean=} opts.extend = `false`
 *   When supplying a valid or invalid pattern to check paths against, the
 *   #opts.extend option allows you to supplement instead of overwrite the
 *   default valid or invalid test. If the default value is `null`, this
 *   option does not have any side effects.
 * @param {?RegExp=} opts.valid = `null`
 *   A pattern for matching valid file or directory paths. If #opts.valid is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.valid pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.valid pattern.
 * @param {?RegExp=} opts.invalid = `null`
 *   A pattern for matching invalid file or directory paths. If #opts.invalid
 *   is `null`, no check is performed. If it is a `RegExp`, the source
 *   property is checked for a forward slash, `"/"`. If it has a forward
 *   slash, the path tree is tested against the #opts.invalid pattern.
 *   Otherwise (i.e. if it does not have a forward slash), the path name is
 *   tested against the #opts.invalid pattern.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when #opts.deep is `true`. A pattern for matching valid
 *   directory paths. If #opts.validDirs is `null`, no check is performed. If
 *   it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.validDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.validDirs pattern.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   Only used when #opts.deep is `true`. A pattern for matching invalid
 *   directory paths. If #opts.invalidDirs is `null`, no check is performed.
 *   If it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.invalidDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.invalidDirs pattern.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid file paths. If #opts.validFiles is `null`,
 *   no check is performed. If it is a `RegExp`, the source property is
 *   checked for a forward slash, `"/"`. If it has a forward slash, the path
 *   tree is tested against the #opts.validFiles pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.validFiles pattern.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid file paths. If #opts.invalidFiles is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.invalidFiles pattern. Otherwise
 *   (i.e. if it does not have a forward slash), the path name is tested
 *   against the #opts.invalidFiles pattern.
 * @return {!Array<string>}
 */
var getFilePaths = loadTaskHelper('get-filepaths');
/// #}}} @func getFilePaths

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadTaskHelper('get-pathname');
/// #}}} @func getPathName

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

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

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #{{{ @func toCamelCase
/**
 * @private
 * @param {string} val
 * @return {string}
 */
var toCamelCase = loadTaskHelper('to-camel-case');
/// #}}} @func toCamelCase

/// #{{{ @func trimJsExt
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimJsExt = loadTaskHelper('trim-file-ext').construct('.js');
/// #}}} @func trimJsExt

/// #}}} @group HELPERS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Method
/**
 * @private
 * @param {!Object} proto
 * @param {string} name
 * @param {string} path
 * @constructor
 * @struct
 */
function Method(proto, name, path) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Method) )
    throw setNewError(new SyntaxError, 'Method');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isObject(proto) )
    throw setTypeError(new TypeError, 'proto', '!Object');
  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  if (!name)
    throw setEmptyError(new Error, 'name');
  if (!path)
    throw setEmptyError(new Error, 'path');

  if ( !isFile(path) )
    throw setFileError(new Error, 'path', path);

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-values

  name = toCamelCase(name);

  if ( hasOwnProperty(proto, name) )
    throw setError(new ReferenceError,
      'duplicate method assignment for ' +
      '`' + proto.constructor.name + '.prototype.' + name + '`');

  defineProperty(proto, name, {
    'value': null,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });

  /// #}}} @step setup-values

  /// #{{{ @step set-members

  /// #{{{ @member NAME
  /**
   * @const {string}
   */
  defineProperty(this, 'NAME', {
    'value': name,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member NAME

  /// #{{{ @member PATH
  /**
   * @const {string}
   */
  defineProperty(this, 'PATH', {
    'value': resolvePath(path),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member PATH

  /// #{{{ @member PROTO
  /**
   * @const {!Object}
   */
  defineProperty(this, 'PROTO', {
    'value': proto,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member PROTO

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Method

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Method.prototype = createObject(null);

defineProperty(Method.prototype, 'constructor', {
  'value': Method,
  'writable': false,
  'enumerable': false,
  'configurable': false
});

/// #{{{ @func Method.prototype.load
/**
 * @private
 * @return {!Method}
 */
Method.prototype.load = function load() {

  if ( !isNull(this.PROTO[this.NAME]) )
    return this;

  defineProperty(this.PROTO, this.NAME, {
    'value': require(this.PATH),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });

  return this;
};
/// #}}} @func Method.prototype.load

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func defineMethods
/**
 * @public
 * @param {!Object} proto
 * @param {string} name
 * @param {string} path
 * @return {!Object}
 */
function defineMethods(proto, name, path) {

  /** @type {!Object<string, !Method>} */
  var methods;
  /** @type {!Method} */
  var method;
  /** @type {!Array<string>} */
  var paths;

  if ( !isObject(proto) )
    throw setTypeError(new TypeError, 'proto', '!Object');
  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  if (!name)
    throw setEmptyError(new Error, 'name');
  if (!path)
    throw setEmptyError(new Error, 'path');

  if ( !isDirectory(path) )
    throw setDirError(new Error, 'path', path);

  defineProperty(proto, '__NAME', {
    'value': name,
    'writable': false,
    'enumerable': false,
    'configurable': false
  });
  defineProperty(proto, '__DIR', {
    'value': path,
    'writable': false,
    'enumerable': false,
    'configurable': false
  });

  methods = {};

  paths = getFilePaths(path, {
    'deep': false,
    'full': true,
    'extend': false,
    'validFiles': /\.js$/,
    'invalidFiles': /^\./
  });
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    name = getPathName(path);
    name = trimJsExt(name);
    method = new Method(proto, name, path);
    defineProperty(methods, name, {
      'value': method,
      'writable': false,
      'enumerable': true,
      'configurable': false
    });
  }

  defineProperty(proto, '__METHODS', {
    'value': freezeObject(methods),
    'writable': false,
    'enumerable': false,
    'configurable': false
  });

  return proto;
}
/// #}}} @func defineMethods

module.exports = defineMethods;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
