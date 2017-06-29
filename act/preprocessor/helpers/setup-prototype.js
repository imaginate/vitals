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

/// #{{{ @group ERROR

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

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

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

/// #}}} @group IS

/// #{{{ @group OBJECT

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

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #{{{ @group SETUP

/// #{{{ @func setupMethods
/**
 * @private
 * @param {!Object<string, (!Method|string)>} methods
 * @param {!Object} proto
 * @return {!Object}
 */
var setupMethods = require('./setup-methods.js');
/// #}}} @func setupMethods

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = require('./setup-off-property.js');
/// #}}} @func setupOffProperty

/// #{{{ @func setupOnProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setupOnProperty = require('./setup-on-property.js');
/// #}}} @func setupOnProperty

/// #}}} @group SETUP

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

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

  setupOffProperty(proto, 'constructor', constructor);
  setupOffProperty(proto, '__CLASSNAME', classname);
  setupOffProperty(proto, '__NAME', funcname);

  /// #}}} @step make-prototype-object

  /// #{{{ @step setup-prototype-methods

  methods = createObject(null);
  setupOffProperty(methods, '__DIR', path);
  methods = setupMethods(methods, proto);

  setupOffProperty(proto, '__METHODS', methods);

  /// #}}} @step setup-prototype-methods

  /// #{{{ @step complete-prototype-setup

  setupOffProperty(proto, '__SETUP', true);
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
