/**
 * ---------------------------------------------------------------------------
 * IS-STATE-KEY HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const ID
/**
 * @private
 * @const {!RegExp}
 */
var ID = /^[a-zA-Z0-9_\.\-\?\*]*:[a-zA-Z0-9_\.\-\$\?\*]+$/;
/// #}}} @const ID

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const TAG
/**
 * @private
 * @const {!RegExp}
 */
var TAG = /^[a-zA-Z0-9_\.\-\?\*]+(?::[a-zA-Z0-9_\.\-\$\?\*]*)?$/;
/// #}}} @const TAG

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

/// #{{{ @func isStateKey
/**
 * @public
 * @param {string} key
 * @return {boolean}
 */
function isStateKey(key) {

  if ( !isString(key) )
    throw new TypeError('invalid `key` data type\n' +
      '    valid-types: `string`');

  return !!key && ( TAG.test(key) || ID.test(key) );
}
/// #}}} @func isStateKey

module.exports = isStateKey;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol