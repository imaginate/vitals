/**
 * ---------------------------------------------------------------------------
 * HAS-END-SLASH HELPER
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

/// #{{{ @const SLASH
/**
 * @private
 * @const {!RegExp}
 */
var SLASH = /\/$/;
/// #}}} @const SLASH

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func hasEndSlash
/**
 * @public
 * @param {string} src
 * @return {boolean}
 */
function hasEndSlash(src) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `string`');

  return !!src && SLASH.test(src);
}
/// #}}} @func hasEndSlash

module.exports = hasEndSlash;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
