/**
 * ---------------------------------------------------------------------------
 * SETUP-PROTOTYPE HELPER
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

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

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

/// #{{{ @func setupMethods
/**
 * @private
 * @param {!Object<string, (!Method|string)>} methods
 * @param {!Object} proto
 * @return {!Object}
 */
var setupMethods = loadTaskHelper('setup-methods');
/// #}}} @func setupMethods

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func setupProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @return {!Object}
 */
function setupProperty(src, key, value) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'value');
  }

  if ( !isObject(src) )
    throw setTypeError(new TypeError, 'src', '!Object');
  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');

  if (!key)
    throw setEmptyError(new Error, 'key');

  /// #}}} @step verify-parameters

  /// #{{{ @step define-property

  defineProperty(src, key, {
    'value': value,
    'writable': false,
    'enumerable': false,
    'configurable': false
  });

  /// #}}} @step define-property

  /// #{{{ @step return-src

  return src;

  /// #}}} @step return-src
}
/// #}}} @func setupProperty

/// #{{{ @func setupPrototype
/**
 * @public
 * @param {string} classname
 * @param {!Function} constructor
 * @param {string} funcname
 *   The constructor's name.
 * @param {string} path
 *   The absolute path to the directory containing the methods for the class.
 * @return {!Function}
 */
function setupPrototype(classname, constructor, funcname, path) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, (!Method|string)>} */
  var methods;
  /** @type {!Object} */
  var proto;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(classname) )
    throw setTypeError(new TypeError, 'classname', 'string');
  if ( !isFunction(constructor) )
    throw setTypeError(new TypeError, 'constructor', '!Function');
  if ( !isString(funcname) )
    throw setTypeError(new TypeError, 'funcname', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  if (!classname)
    throw setEmptyError(new Error, 'classname');
  if (!funcname)
    throw setEmptyError(new Error, 'funcname');
  if (!path)
    throw setEmptyError(new Error, 'path');

  if ( !isDirectory(path) )
    throw setDirError(new Error, 'path', path);

  /// #}}} @step verify-parameters

  /// #{{{ @step check-prototype-setup-state

  if (constructor.prototype.__SETUP)
    return constructor;

  /// #}}} @step check-prototype-setup-state

  /// #{{{ @step make-prototype-object

  proto = createObject(null);
  constructor.prototype = proto;

  setupProperty(proto, 'constructor', constructor);
  setupProperty(proto, '__CLASSNAME', classname);
  setupProperty(proto, '__NAME', funcname);

  /// #}}} @step make-prototype-object

  /// #{{{ @step setup-prototype-methods

  methods = createObject(null);
  setupProperty(methods, '__DIR', path);
  methods = setupMethods(methods, proto);

  setupProperty(proto, '__METHODS', methods);

  /// #}}} @step setup-prototype-methods

  /// #{{{ @step complete-prototype-setup

  setupProperty(proto, '__SETUP', true);
  capObject(proto);

  /// #}}} @step complete-prototype-setup

  /// #{{{ @step return-constructor

  return constructor;

  /// #}}} @step return-constructor
}
/// #}}} @func setupPrototype

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = setupPrototype;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
