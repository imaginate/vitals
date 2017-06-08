/**
 * ---------------------------------------------------------------------------
 * CAP-OBJECT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 */
var IS = require('./is.js');
/// #}}} @const IS
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasOwnProp
/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasOwnProp = require('./has-own-property.js');
/// #}}} @func hasOwnProp

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

  /**
   * @private
   * @const {?function}
   */
  var cap = 'preventExtensions' in Object
    ? Object['preventExtensions']
    : null;

  if ( !isFunction(cap) )
    throw new Error('incompatible platform (must support `Object.preventExtensions`)');

  try {
    cap(function(){});
    return cap;
  }
  catch (e) {
    return function cap(src) {
      return isFunction(src)
        ? src
        : cap(src);
    };
  }
})();
/// #}}} @func cap

/// #{{{ @func capDeep
/**
 * @private
 * @param {!Object} src
 * @return {!Object}
 */
function capDeep(src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in src) {
    if ( hasOwnProp(src, key) ) {
      val = src[key];
      if ( isObject(val) )
        capDeep(val);
    }
  }
  return cap(src);
}
/// #}}} @func capDeep
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func capObject
/**
 * @public
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
function capObject(src, deep) {

  if ( !isUndefined(deep) && !isBoolean(deep) )
    throw new TypeError('invalid `deep` data type (valid types: `boolean=`)');

  if ( isNull(src) )
    return null;

  if ( !isObject(src) )
    throw new TypeError('invalid `src` data type (valid types: `?Object`)');

  return deep
    ? capDeep(src)
    : cap(src);
}
/// #}}} @func capObject

module.exports = capObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
