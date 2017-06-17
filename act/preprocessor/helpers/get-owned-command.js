/**
 * ---------------------------------------------------------------------------
 * GET-OWNED-COMMAND HELPER
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

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func hasValidKey
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var hasValidKey = require('./has-valid-key.js');
/// #}}} @func hasValidKey

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = require('./is-block-node.js');
/// #}}} @func isBlkNode

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = require('./is-conditional-node.js');
/// #}}} @func isCondNode

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = require('./is-file-node.js');
/// #}}} @func isFileNode

/// #{{{ @func isInclNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isInclNode = require('./is-include-node.js');
/// #}}} @func isInclNode

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

/// #{{{ @func getOwnedCommand
/**
 * @public
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Cond|!Incl)} node
 * @return {(?Blk|?Cond|?Incl)}
 */
function getOwnedCommand(src, node) {

  /** @type {string} */
  var key;

  if ( !isFileNode(src) && !isBlkNode(src) && !isCondNode(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `(!File|!Blk|!Cond)`');

  if ( isString(node) )
    key = node;
  else if ( isBlkNode(node) || isCondNode(node) || isInclNode(node) )
    key = node.key;
  else
    throw new TypeError('invalid `node` data type\n' +
      '    valid-types: `(string|!Blk|!Cond|!Incl)`');

  if ( !hasValidKey(key) )
    throw new Error('invalid `node` key `string`\n' +
      '    valid-key: `node.tag + ":" + node.id`\n' +
      '    actual-key: `"' + key + '"`');

  return hasOwnProperty(src.blks, key)
    ? src.blks[key]
    : hasOwnProperty(src.conds, key)
      ? src.conds[key]
      : hasOwnProperty(src.incls, key)
        ? src.incls[key]
        : null;
}
/// #}}} @func getOwnedCommand

module.exports = getOwnedCommand;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
