/**
 * ---------------------------------------------------------------------------
 * MERGE-OBJECT HELPER
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

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

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

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mergeObject
/**
 * @public
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
function mergeObject(src) {

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
        return cloneObject(src);
      else
        throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
  }

  result = cloneObject(src);
  len = arguments.length;
  i = 0;
  while (++i < len) {
    src = arguments[i];
    if ( isNull(src) )
      continue;
    else if ( isHashMap(src) )
      result = merge(result, src);
    else
      throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
  }
  return result;
}
/// #}}} @func mergeObject

/// #{{{ @func merge
/**
 * @private
 * @param {(!Object|!Function)} dest
 * @param {(!Object|!Function)} src
 * @return {!Object}
 */
function merge(dest, src) {

  /** @type {string} */
  var key;

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
      dest[key] = src[key];
    }
  }
  return dest;
}
/// #}}} @func merge

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = mergeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
