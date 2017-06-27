/**
 * ---------------------------------------------------------------------------
 * GET-PATH-COMPONENT HELPER
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

/// #{{{ @const CMD
/**
 * @private
 * @const {!RegExp}
 */
var CMD = /^[ \t]*\/\/\/[ \t]+#[a-z{}]+[ \t]+@[a-zA-Z0-9_\.\-]+[ \t]+[a-zA-Z0-9_\.\-\$]+[ \t]+([^ \t\|]+)[ \t]*$/;
/// #}}} @const CMD

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

/// #{{{ @func hasPathComponent
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var hasPathComponent = require('./has-path-component.js');
/// #}}} @func hasPathComponent

/// #{{{ @func isLineNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLineNode = require('./is-line-node.js');
/// #}}} @func isLineNode

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

/// #{{{ @func getPathComponent
/**
 * @public
 * @param {(string|!Line)} text
 * @return {string}
 */
function getPathComponent(text) {

  if ( isLineNode(text) )
    text = text.text;
  else if ( !isString(text) )
    throw new TypeError('invalid `text` data type\n' +
      '    valid-types: `(string|!Line)`');

  return hasPathComponent(text)
    ? text.replace(CMD, '$1')
    : '';
}
/// #}}} @func getPathComponent

module.exports = getPathComponent;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
