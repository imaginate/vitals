/**
 * ---------------------------------------------------------------------------
 * TO-CAMEL-CASE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DASH_BEGIN
/**
 * @private
 * @const {!RegExp}
 */
var DASH_BEGIN = /^-+/;
/// #}}} @const DASH_BEGIN

/// #{{{ @const DASH_END
/**
 * @private
 * @const {!RegExp}
 */
var DASH_END = /-+$/;
/// #}}} @const DASH_END

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

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

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

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func toCamelCase
/**
 * @public
 * @param {string} val
 * @return {string}
 */
function toCamelCase(val) {

  if ( !isString(val) )
    throw setTypeError(new TypeError, 'val', 'string');

  val = val.replace(DASH_BEGIN, '');
  val = val.replace(DASH_END, '');
  val = val.replace(/--+/g, '-');
  return val && val.replace(/-([a-z])/g, function replacement(match, ch) {
    return ch.toUpperCase();
  });
}
/// #}}} @func toCamelCase

module.exports = toCamelCase;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
