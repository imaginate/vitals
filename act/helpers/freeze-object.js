/**
 * ---------------------------------------------------------------------------
 * FREEZE-OBJECT HELPER
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

/// #{{{ @func freeze
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var freeze = (function freezePrivateScope() {

  /** @type {!function} */
  var freeze;

  if ( !('freeze' in Object) || !isFunction(Object['freeze']) )
    throw new Error('incompatible platform (must support `Object.freeze`)');

  freeze = Object['freeze'];

  try {
    freeze(function(){});
    return freeze;
  }
  catch (e) {
    return function freeze(src) {
      return isFunction(src)
        ? src
        : freeze(src);
    };
  }
})();
/// #}}} @func freeze

/// #{{{ @func freezeDeep
/**
 * @private
 * @param {!Object} src
 * @return {!Object}
 */
function freezeDeep(src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in src) {
    if ( hasOwnProp(src, key) ) {
      val = src[key];
      if ( isObject(val) )
        freezeDeep(val);
    }
  }
  return freeze(src);
}
/// #}}} @func freezeDeep
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func freezeObject
/**
 * @public
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
function freezeObject(src, deep) {

  if ( !isUndefined(deep) && !isBoolean(deep) )
    throw new TypeError('invalid `deep` data type (valid types: `boolean=`)');

  if ( isNull(src) )
    return null;

  if ( !isObject(src) )
    throw new TypeError('invalid `src` data type (valid types: `?Object`)');

  return deep
    ? freezeDeep(src)
    : freeze(src);
}
/// #}}} @func freezeObject

module.exports = freezeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
