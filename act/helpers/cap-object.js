/**
 * ---------------------------------------------------------------------------
 * CAP-OBJECT HELPER
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
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func cap
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var cap = (function capPrivateScope() {

  /// #{{{ @const cap
  /**
   * @private
   * @const {?function}
   */
  var cap = 'preventExtensions' in Object
    ? Object.preventExtensions
    : null;
  /// #}}} @const cap

  /// #{{{ @step verify-prevent-extensions-exists

  if ( !isFunction(cap) ) {
    throw setError(new Error,
      'missing JS engine support for `Object.preventExtensions`');
  }

  /// #}}} @step verify-prevent-extensions-exists

  /// #{{{ @step verify-prevent-extensions-functionality

  try {
    cap(function(){});
  }
  catch (e) {
    throw setError(new Error,
      'incomplete JS engine support for `Object.preventExtensions`\n'
      + '    failed: `Object.preventExtensions(function(){})`');
  }

  /// #}}} @step verify-prevent-extensions-functionality

  /// #{{{ @step return-prevent-extensions

  return cap;

  /// #}}} @step return-prevent-extensions
})();
/// #}}} @func cap

/// #{{{ @func capDeep
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
function capDeep(src) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'src');
  }
  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step cap-each-source-property

  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      val = src[key];
      if ( isHashMap(val) ) {
        capDeep(val);
      }
    }
  }

  /// #}}} @step cap-each-source-property

  /// #{{{ @step cap-source

  cap(src);

  /// #}}} @step cap-source

  /// #{{{ @step return-source

  return src;

  /// #}}} @step return-source
}
/// #}}} @func capDeep

/// #{{{ @func capObject
/**
 * @public
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
function capObject(src, deep) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

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

  /// #}}} @step verify-parameters

  /// #{{{ @step cap-source

  if (deep) {
    capDeep(src);
  }
  else {
    cap(src);
  }

  /// #}}} @step cap-source

  /// #{{{ @step return-source

  return src;

  /// #}}} @step return-source
}
/// #}}} @func capObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = capObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
