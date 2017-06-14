/**
 * ---------------------------------------------------------------------------
 * IS-DIRECTORY-NODE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const DIR_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var DIR_TYPE_ID = require('./type-ids.js').directory;
/// #}}} @const DIR_TYPE_ID

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isDirectoryNode
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isDirectoryNode(val) {
  return isObject(val) && 'type' in val && val.type === DIR_TYPE_ID;
}
/// #}}} @func isDirectoryNode

module.exports = isDirectoryNode;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
