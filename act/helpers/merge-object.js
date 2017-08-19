/**
 * ---------------------------------------------------------------------------
 * MERGE-OBJECT HELPER
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

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

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

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #{{{ @func testEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @return {boolean}
 */
var testEachProperty = require('./test-each-property.js');
/// #}}} @func testEachProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func merge
/**
 * @private
 * @param {(!Object|!Function)} fromHashMap
 * @param {!Object} toHashMap
 * @return {!Object}
 */
function merge(fromHashMap, toHashMap) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'fromHashMap');
    case 1:
      throw setNoArgError(new Error, 'toHashMap');
  }

  if ( !isHashMap(fromHashMap) ) {
    throw setTypeError(new TypeError, 'fromHashMap', '(!Object|!Function)');
  }
  if ( !isPlainObject(toHashMap) ) {
    throw setTypeError(new TypeError, 'toHashMap', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step merge-each-property

  forEachProperty(fromHashMap, function mergeEachProperty(val, key) {
    toHashMap[key] = val;
  });

  /// #}}} @step merge-each-property

  /// #{{{ @step return-merged-object

  return toHashMap;

  /// #}}} @step return-merged-object
}
/// #}}} @func merge

/// #{{{ @func mergeObject
/**
 * @public
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
function mergeObject(src) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      if ( isNull(src) ) {
        return {};
      }
      else if ( isHashMap(src) ) {
        return cloneObject(src);
      }
      else {
        throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
      }
    default:
      if ( !testEachProperty(arguments, isNullOrHashMap) ) {
        throw setTypeError(new TypeError, 'src', '(?Object|?Function)');
      }
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-merged-object

  result = {};
  forEachProperty(arguments, function mergeEachHashMap(src) {
    if (src) {
      result = merge(src, result);
    }
  });

  /// #}}} @step make-merged-object

  /// #{{{ @step return-merged-object

  return result;

  /// #}}} @step return-merged-object
}
/// #}}} @func mergeObject

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = mergeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
