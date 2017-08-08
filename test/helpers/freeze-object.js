/**
 * ---------------------------------------------------------------------------
 * FREEZE-OBJECT HELPER
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

/// #{{{ @group HAS

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

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

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func freeze
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var freeze = (function freezePrivateScope() {

  /**
   * @private
   * @const {?function}
   */
  var freeze = 'freeze' in Object
    ? Object.freeze
    : null;

  if ( !isFunction(freeze) )
    throw setError(new Error,
      'missing JS engine support for `Object.freeze`');

  try {
    freeze(function(){});
    return freeze;
  }
  catch (e) {
    throw setError(new Error,
      'incomplete JS engine support for `Object.freeze`\n' +
      '    failed: `Object.freeze(function(){})`');
  }
})();
/// #}}} @func freeze

/// #{{{ @func freezeDeep
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
function freezeDeep(src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      val = src[key];
      if ( isHashMap(val) ) {
        freezeDeep(val);
      }
    }
  }
  return freeze(src);
}
/// #}}} @func freezeDeep

/// #{{{ @func freezeObject
/**
 * @public
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
function freezeObject(src, deep) {

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      deep = false;
      break;
    default:
      if ( isUndefined(deep) ) {
        deep = false;
      }
      else if ( !isBoolean(deep) ) {
        throw setTypeError(new TypeError, 'deep', 'boolean=');
      }
  }

  if ( isNull(src) ) {
    return null;
  }

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
  }

  return deep
    ? freezeDeep(src)
    : freeze(src);
}
/// #}}} @func freezeObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = freezeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
