/**
 * ---------------------------------------------------------------------------
 * IS-COMMAND-NODE HELPER
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

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func getTypeId
/**
 * @private
 * @param {string} classname
 * @return {!TypeId}
 */
var getTypeId = require('./get-type-id.js');
/// #}}} @func getTypeId

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = loadTaskHelper('is').object;
/// #}}} @func isObject

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = loadTaskHelper('is').string;
/// #}}} @func isString

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

/// #{{{ @const IDS
/**
 * @private
 * @enum {!TypeId}
 * @const
 * @dict
 */
var IDS = freezeObject({
  'block': getTypeId('block'),
  'conditional': getTypeId('conditional'),
  'define': getTypeId('define'),
  'include': getTypeId('include'),
  'insert': getTypeId('insert')
});
/// #}}} @const IDS

/// #}}} @group CONSTANTS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isCommandNode
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isCommandNode(val) {

  /** @type {string} */
  var name;
  /** @type {(!Object|!TypeId)} */
  var id;

  if (!arguments.length)
    throw setNoArgError(new Error, 'val');

  if ( !isObject(val) || !('type' in val) || !isObject(val.type) )
    return false;

  id = val.type;

  if ( !('classname' in id) || !isString(id.classname) )
    return false;

  name = id.classname;
  return !!name && hasOwnProperty(IDS, name) && IDS[name] === id;
}
/// #}}} @func isCommandNode

module.exports = isCommandNode;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
