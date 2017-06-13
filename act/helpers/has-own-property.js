/**
 * ---------------------------------------------------------------------------
 * HAS-OWN-PROPERTY HELPER
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
 * @param {*} key
 * @return {boolean}
 */
var hasOwnProp = Object.prototype.hasOwnProperty;
/// #}}} @func hasOwnProp

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasOwnProperty
/**
 * @public
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
function hasOwnProperty(src, key) {

  if ( !isHashMap(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `(!Object|!Function)`');

  if ( isString(key) ) {
    if (!key)
      throw new Error('invalid empty `string` for `key`');
  }
  else if ( !isNumber(key) )
    throw new TypeError('invalid `key` data type\n' +
      '    valid-types: `(string|number)`');

  return hasOwnProp.call(src, key);
}
/// #}}} @func hasOwnProperty

module.exports = hasOwnProperty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
