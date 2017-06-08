/**
 * ---------------------------------------------------------------------------
 * SEAL-OBJECT HELPER
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

/// #{{{ @func seal
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var seal = (function sealPrivateScope() {

  /** @type {!function} */
  var seal;

  if ( !('seal' in Object) || !isFunction(Object['seal']) )
    throw new Error('incompatible platform (must support `Object.seal`)');

  seal = Object['seal'];

  try {
    seal(function(){});
    return seal;
  }
  catch (e) {
    return function seal(src) {
      return isFunction(src)
        ? src
        : seal(src);
    };
  }
})();
/// #}}} @func seal

/// #{{{ @func sealDeep
/**
 * @private
 * @param {!Object} src
 * @return {!Object}
 */
function sealDeep(src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in src) {
    if ( hasOwnProp(src, key) ) {
      val = src[key];
      if ( isObject(val) )
        sealDeep(val);
    }
  }
  return seal(src);
}
/// #}}} @func sealDeep
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func sealObject
/**
 * @public
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
function sealObject(src, deep) {

  if ( !isUndefined(deep) && !isBoolean(deep) )
    throw new TypeError('invalid `deep` data type (valid types: `boolean=`)');

  if ( isNull(src) )
    return null;

  if ( !isObject(src) )
    throw new TypeError('invalid `src` data type (valid types: `?Object`)');

  return deep
    ? sealDeep(src)
    : seal(src);
}
/// #}}} @func sealObject

module.exports = sealObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
