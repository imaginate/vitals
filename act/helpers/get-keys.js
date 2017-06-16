/**
 * ---------------------------------------------------------------------------
 * GET-KEYS HELPER
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

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getKeys
/**
 * @public
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
function getKeys(src) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var key;

  if ( !isHashMap(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `(!Object|!Function)`)');

  keys = [];
  for (key in src) {
    if ( hasOwnProperty(src, key) )
      keys.push(key);
  }
  return keys;
}
/// #}}} @func getKeys

module.exports = getKeys;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
