/**
 * ---------------------------------------------------------------------------
 * CREATE-OBJECT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func create
/**
 * @description
 *   Polyfills `Object.create` if it does not exist.
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var create = (function createPrivateScope() {

  if ( 'create' in Object && isFunction(Object['create']) )
    return Object['create'];

  /// #{{{ @func _Object
  /**
   * @private
   * @constructor
   */
  function _Object(){}
  /// #}}} @func _Object

  /// #{{{ @func create
  /**
   * @param {?Object} proto
   * @return {!Object}
   */
  function create(proto) {

    /** @type {!Object} */
    var obj;

    _Object['prototype'] = proto;
    obj = new _Object();
    _Object['prototype'] = null;
    return obj;
  }
  /// #}}} @func create

  return create;
})();
/// #}}} @func create
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func createObject
/**
 * @description
 *   Cross-platform `Object.create` implementation.
 * @public
 * @param {?Object} proto
 * @return {!Object}
 */
function createObject(proto) {

  if ( !isNull(proto) && !isObject(proto) )
    throw new TypeError('invalid `proto` data type (must be `?Object`)');

  return create(proto);
}
/// #}}} @func createObject

module.exports = createObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol