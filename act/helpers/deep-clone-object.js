/**
 * ---------------------------------------------------------------------------
 * DEEP-CLONE-OBJECT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @group HAS

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func deepCloneObject
/**
 * @public
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
function deepCloneObject(src) {

  if (!arguments.length)
    throw setNoArgError(new Error, 'src');

  if ( isNull(src) )
    return {};

  if ( !isHashMap(src) )
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');

  return cloneObject(src);
}
/// #}}} @func deepCloneObject

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Object}
 */
function cloneObject(src) {

  /** @type {!Object} */
  var clone;
  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  if ( !isHashMap(src) )
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');

  clone = {};
  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      val = src[key];
      clone[key] = isHashMap(val)
        ? cloneObject(val)
        : val;
    }
  }
  return clone;
}
/// #}}} @func cloneObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = deepCloneObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
