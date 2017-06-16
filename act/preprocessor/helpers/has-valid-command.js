/**
 * ---------------------------------------------------------------------------
 * HAS-VALID-COMMAND HELPER
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

/// #{{{ @const CMD_NO_PATH
/**
 * @private
 * @const {!RegExp}
 */
var CMD_NO_PATH = /^[ \t]*\/\/\/[ \t]+#(?:(?:(?:if|ifnot|def)?(?:\{\{\{|\}\}\}))|include|insert)[ \t]+@[a-zA-Z0-9_\.\-]+[ \t]+[a-zA-Z0-9_\.\-\$]+[ \t]*$/;
/// #}}} @const CMD_NO_PATH

/// #{{{ @const CMD_YES_PATH
/**
 * @private
 * @const {!RegExp}
 */
var CMD_YES_PATH = /^[ \t]*\/\/\/[ \t]+#(?:(?:(?:if|ifnot|def)?(?:\{\{\{|\}\}\}))|include|insert)[ \t]+@[a-zA-Z0-9_\.\-]+[ \t]+[a-zA-Z0-9_\.\-\$]+[ \t]+[^ \t\|]+[ \t]*$/;
/// #}}} @const CMD_YES_PATH

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

/// #{{{ @func hasValidCommand
/**
 * @public
 * @param {string} text
 * @param {boolean=} path = `false`
 *   Whether the *command* requires a *path* component.
 * @return {boolean}
 */
function hasValidCommand(text, path) {

  if ( !isString(text) )
    throw new TypeError('invalid `text` data type\n' +
      '    valid-types: `string`');

  if (!text)
    return false;

  return !!path
    ? CMD_YES_PATH.test(text)
    : CMD_NO_PATH.test(text);
}
/// #}}} @func hasValidCommand

module.exports = hasValidCommand;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
