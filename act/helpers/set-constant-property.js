/**
 * ---------------------------------------------------------------------------
 * SET-CONSTANT-PROPERTY HELPER
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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = require('./freeze-object.js');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group DESCRIPTORS
//////////////////////////////////////////////////////////////////////////////
// DESCRIPTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLT
/**
 * @private
 * @const {!Object<string, boolean>}
 * @dict
 */
var DFLT = freezeObject({
  'writable': false,
  'enumerable': false,
  'configurable': false
});
/// #}}} @const DFLT

/// #{{{ @const VISIBLE
/**
 * @private
 * @const {!Object<string, boolean>}
 * @dict
 */
var VISIBLE = freezeObject({
  'writable': false,
  'enumerable': true,
  'configurable': false
});
/// #}}} @const VISIBLE

/// #}}} @group DESCRIPTORS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func _defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var _defineProperty = (function _definePropertyPrivateScope() {

  /// #{{{ @const defineProp
  /**
   * @private
   * @const {?Function}
   */
  var defineProp = 'defineProperty' in Object
    ? Object['defineProperty']
    : null;
  /// #}}} @const defineProp

  if ( !isFunction(defineProp) ) {
    throw setError(new Error,
      'missing JS engine support for `Object.defineProperty`');
  }

  /// #{{{ @const HAS_SUPPORT
  /**
   * @private
   * @const {boolean}
   */
  var HAS_SUPPORT = (function HAS_SUPPORT_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    descriptor = {
      'value': obj,
      'enumerable': false
    };

    try {
      defineProp(obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key') {
          return false;
        }
      }
    }
    catch (e) {
      return false;
    }

    return obj['key'] === obj;
  })();
  /// #}}} @const HAS_SUPPORT

  if (!HAS_SUPPORT) {
    throw setError(new Error,
      'incomplete JS engine support for `Object.defineProperty`');
  }

  return defineProp;
})();
/// #}}} @func _defineProperty

/// #{{{ @func setConstantProperty
/**
 * @public
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
function setConstantProperty(src, key, val, visible) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var descriptor;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'val');
    case 3:
      visible = true;
      break;
    default:
      if ( isUndefined(visible) ) {
        visible = true;
      }
      else if ( !isBoolean(visible) ) {
        throw setTypeError(new TypeError, 'visible', 'boolean=');
      }
  }

  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }
  if ( !isObject(src) ) {
    throw setTypeError(new TypeError, 'src', '!Object');
  }

  if (!key) {
    throw setEmptyError(new Error, 'key');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-descriptor

  descriptor = visible
    ? cloneObject(VISIBLE)
    : cloneObject(DFLT);
  descriptor['value'] = val;

  /// #}}} @step setup-descriptor

  /// #{{{ @step define-property

  _defineProperty(src, key, descriptor);

  /// #}}} @step define-property

  /// #{{{ @step return-src

  return src;

  /// #}}} @step return-src
}
/// #}}} @func setConstantProperty

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = setConstantProperty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
