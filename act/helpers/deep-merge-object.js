/**
 * ---------------------------------------------------------------------------
 * DEEP-MERGE-OBJECT HELPER
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

/// #{{{ @group OBJECT

/// #{{{ @func deepCloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var deepCloneObject = require('./deep-clone-object.js');
/// #}}} @func deepCloneObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func deepMergeObject
/**
 * @public
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
function deepMergeObject(src) {

  /** @type {!Object} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      if ( isNull(src) )
        return {};
      else if ( isHashMap(src) )
        return deepCloneObject(src);
      else
        throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
  }

  result = deepCloneObject(src);
  len = arguments.length;
  i = 0;
  while (++i < len) {
    src = arguments[i];
    if ( isNull(src) )
      continue;
    else if ( isHashMap(src) )
      result = mergeObject(result, src);
    else
      throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
  }
  return result;
}
/// #}}} @func deepMergeObject

/// #{{{ @func mergeObject
/**
 * @private
 * @param {(!Object|!Function)} dest
 * @param {(!Object|!Function)} src
 * @return {!Object}
 */
function mergeObject(dest, src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'dest');
    case 1:
      throw setNoArgError(new Error, 'src');
  }

  if ( !isHashMap(dest) )
    throw setTypeError(new TypeError, 'dest', '(!Object|!Function)');
  if ( !isHashMap(src) )
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');

  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      val = src[key];
      dest[key] = isHashMap(val)
        ? hasOwnProperty(dest, key) && isHashMap(dest[key])
          ? mergeObject(dest[key], val)
          : deepCloneObject(val)
        : val;
    }
  }
  return dest;
}
/// #}}} @func mergeObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = deepMergeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
