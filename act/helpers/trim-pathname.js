/**
 * ---------------------------------------------------------------------------
 * TRIM-PATHNAME HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const NAME
/**
 * @private
 * @const {!RegExp}
 */
var NAME = /[^\/]+$/;
/// #}}} @const NAME

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

/// #{{{ @func trimPathname
/**
 * @public
 * @param {string} path
 * @return {string}
 */
function trimPathname(path) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` data type (valid types: `string`)');
  if (!path)
    throw new Error('invalid empty `path` `string`');

  return path.replace(NAME, '');
}
/// #}}} @func trimPathname

module.exports = trimPathname;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
