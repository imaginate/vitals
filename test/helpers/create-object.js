/**
 * ---------------------------------------------------------------------------
 * CREATE-OBJECT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group ERROR

/// #{{{ @group IS

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

/// #}}} @group IS

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

  if ( 'create' in Object && isFunction(Object.create) ) {
    return Object.create;
  }

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

/// #{{{ @func createObject
/**
 * @public
 * @param {?Object} proto
 * @return {!Object}
 */
function createObject(proto) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'proto');
  }
  if ( !isNull(proto) && !isObject(proto) ) {
    throw setTypeError(new TypeError, 'proto', '?Object');
  }

  return create(proto);
}
/// #}}} @func createObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = createObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
