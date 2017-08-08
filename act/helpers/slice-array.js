/**
 * ---------------------------------------------------------------------------
 * SLICE-ARRAY HELPER
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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isArrayLike
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArrayLike = IS.arrayLike;
/// #}}} @func isArrayLike

/// #{{{ @func isGE
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGE = IS.greaterOrEqual;
/// #}}} @func isGE

/// #{{{ @func isGT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;
/// #}}} @func isGT

/// #{{{ @func isLT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;
/// #}}} @func isLT

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func sliceArray
/**
 * @public
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
 * @return {!Array}
 */
function sliceArray(src, start, end) {

  /// #{{{ @step declare-variables

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');

    case 1:
      if ( !isArrayLike(src) ) {
        throw setTypeError(new TypeError, 'src',
          '(!Array|!Arguments|!Object|!Function)');
      }

      len = src.length;
      start = 0;
      end = len;
      break;

    case 2:
      if ( !isArrayLike(src) ) {
        throw setTypeError(new TypeError, 'src',
          '(!Array|!Arguments|!Object|!Function)');
      }

      len = src.length;
      end = len;

      if ( isUndefined(start) ) {
        start = 0;
      }
      else if ( !isNumber(start) ) {
        throw setTypeError(new TypeError, 'start', 'number=');
      }
      else if ( !isWholeNumber(start) ) {
        throw setWholeError(new RangeError, 'start', start);
      }
      else if ( isLT(start, 0) ) {
        start += len;
        if ( isLT(start, 0) ) {
          start = 0;
        }
      }
      break;

    default:
      if ( !isArrayLike(src) ) {
        throw setTypeError(new TypeError, 'src',
          '(!Array|!Arguments|!Object|!Function)');
      }

      len = src.length;

      if ( isUndefined(start) ) {
        start = 0;
      }
      else if ( !isNumber(start) ) {
        throw setTypeError(new TypeError, 'start', 'number=');
      }
      else if ( !isWholeNumber(start) ) {
        throw setWholeError(new RangeError, 'start', start);
      }
      else if ( isLT(start, 0) ) {
        start += len;
        if ( isLT(start, 0) ) {
          start = 0;
        }
      }

      if ( isUndefined(end) ) {
        end = len;
      }
      else if ( !isNumber(end) ) {
        throw setTypeError(new TypeError, 'end', 'number=');
      }
      else if ( !isWholeNumber(end) ) {
        throw setWholeError(new RangeError, 'end', end);
      }
      else if ( isGT(end, len) ) {
        end = len;
      }
      else if ( isLT(end, 0) ) {
        end += len;
      }
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-new-array-length

  if ( isGE(start, end) ) {
    return [];
  }

  /// #}}} @step check-new-array-length

  /// #{{{ @step make-new-array

  arr = new Array(end - start);
  ii = start;
  i = 0;
  while ( isLT(ii, end) ) {
    arr[i++] = src[ii++];
  }

  /// #}}} @step make-new-array

  /// #{{{ @step return-new-array

  return arr;

  /// #}}} @step return-new-array
}
/// #}}} @func sliceArray

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = sliceArray;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
