/**
 * ---------------------------------------------------------------------------
 * IS-CONDITIONAL-NODE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getTypeId
/**
 * @private
 * @param {string} classname
 * @return {!TypeId}
 */
var getTypeId = require('./get-type-id.js');
/// #}}} @func getTypeId

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = loadTaskHelper('is').object;
/// #}}} @func isObject

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = require('./set-error-base.js').noArg;
/// #}}} @func setNoArgError

/// #}}} @group HELPERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const ID
/**
 * @private
 * @const {!TypeId}
 */
var ID = getTypeId('conditional');
/// #}}} @const ID

/// #}}} @group CONSTANTS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isConditionalNode
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isConditionalNode(val) {

  if (!arguments.length)
    throw setNoArgError(new Error, 'val');

  return isObject(val) && 'type' in val && val.type === ID;
}
/// #}}} @func isConditionalNode

module.exports = isConditionalNode;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
