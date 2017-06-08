/**
 * ---------------------------------------------------------------------------
 * DEFINE-PROPERTY HELPER
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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func defineProp
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProp = (function definePropPrivateScope() {

  /// #{{{ @const defineProp
  /**
   * @private
   * @const {?Function}
   */
  var defineProp = 'defineProperty' in Object
    ? Object['defineProperty']
    : null;
  /// #}}} @const defineProp

  /// #{{{ @const DEFINE_PROP_TEST
  /**
   * @private
   * @const {boolean}
   */
  var DEFINE_PROP_TEST = (function DEFINE_PROP_TEST_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    if ( !defineProp || !isFunction(defineProp) )
      return false;

    obj = {};
    descriptor = {
      'value': obj,
      'enumerable': false
    };

    try {
      defineProp(obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key')
          return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj['key'] === obj;
  })();
  /// #}}} @const DEFINE_PROP_TEST

  if (!DEFINE_PROP_TEST)
    throw new Error('incompatible platform (must support `Object.defineProperty`)');

  return defineProp;
})();
/// #}}} @func defineProp
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func defineProperty
/**
 * @public
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
function defineProperty(src, key, descriptor) {

  if ( !isObject(src) )
    throw new TypeError('invalid `src` data type (valid types: `!Object`)');
  if ( !isString(key) )
    throw new TypeError('invalid `key` data type (valid types: `string`)');
  if (!key)
    throw new Error('invalid empty `key` `string`');
  if ( !isObject(descriptor) )
    throw new TypeError('invalid `descriptor` data type (valid types: `!Object`)');

  return defineProp(src, key, descriptor);
}
/// #}}} @func defineProperty

module.exports = defineProperty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
