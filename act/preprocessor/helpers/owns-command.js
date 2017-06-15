/**
 * ---------------------------------------------------------------------------
 * OWNS-COMMAND HELPER
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

/// #{{{ @const KEY_HASH
/**
 * @private
 * @const {!RegExp}
 */
var KEY_HASH = /^[a-zA-Z0-9_\-\.]+:[a-zA-Z0-9_\-\.\$]+$/;
/// #}}} @const KEY_HASH

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

/// #{{{ @func ownsCommand
/**
 * @public
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Cond|!Incl)} node
 * @return {boolean}
 */
function ownsCommand(src, node) {

  /** @type {string} */
  var key;

  if ( !isFileNode(src) && !isBlkNode(src) && !isCondNode(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `(!File|!Blk|!Cond)`)');

  if ( isBlkNode(node) || isCondNode(node) || isInclNode(node) )
    key = node.tag + ':' + node.id;
  else if ( !isString(node) )
    throw new TypeError('invalid `node` data type\n' +
      '    valid-types: `(string|!Blk|!Cond|!Incl)`)');
  else if (!node)
    throw new Error('invalid empty hashed `node` key `string`\n' +
      '    should-be: `node.tag + ":" + node.id`');
  else if ( !KEY_HASH.test(node) )
    throw new Error('invalid hashed `node` key `string`\n' +
      '    should-be: `node.tag + ":" + node.id`');
  else
    key = node;

  return hasOwnProperty(src.blks, key)
    || hasOwnProperty(src.conds, key)
    || hasOwnProperty(src.incls, key);
}
/// #}}} @func ownsCommand

module.exports = ownsCommand;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
