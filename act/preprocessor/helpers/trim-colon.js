/**
 * ---------------------------------------------------------------------------
 * TRIM-COLON HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @const COLON_END
/**
 * @private
 * @const {!RegExp}
 */
var COLON_END = /:$/;
/// #}}} @const COLON_END

/// #{{{ @const COLON_START
/**
 * @private
 * @const {!RegExp}
 */
var COLON_START = /^:/;
/// #}}} @const COLON_START

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
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

/// #{{{ @func trimColon
/**
 * @public
 * @param {string} src
 * @return {string}
 */
function trimColon(src) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `string`');

  src = src.replace(COLON_START, '');
  return src.replace(COLON_END, '');
}
/// #}}} @func trimColon

module.exports = trimColon;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
