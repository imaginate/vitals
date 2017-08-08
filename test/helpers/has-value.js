/**
 * ---------------------------------------------------------------------------
 * HAS-VALUE HELPER
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

/// #{{{ @func isArguments
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArguments IS.args;
/// #}}} @func isArguments

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #{{{ @func isInHashMap
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
var isInHashMap = IS.inHashMap;
/// #}}} @func isInHashMap

/// #{{{ @func isInList
/**
 * @private
 * @param {(!Array|!Arguments|!Object)} src
 *   The #src must be `array-like`.
 * @param {*} val
 * @return {boolean}
 */
var isInList = IS.inList;
/// #}}} @func isInList

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasValue
/**
 * @public
 * @param {(!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
function hasValue(src, val) {

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'val');
  }

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');
  }

  return isArray(src) || isArguments(src)
    ? isInList(src, val)
    : isInHashMap(src, val);
}
/// #}}} @func hasValue

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = hasValue;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
