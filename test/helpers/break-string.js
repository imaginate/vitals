/**
 * ---------------------------------------------------------------------------
 * BREAK-STRING HELPER
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

/// #{{{ @const MAX_LENGTH
/**
 * @private
 * @const {number}
 */
var MAX_LENGTH = 75;
/// #}}} @const MAX_LENGTH

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

/// #{{{ @func setIndexError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
var setIndexError = setError.index;
/// #}}} @func setIndexError

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

/// #{{{ @func isEQ
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isEQ = IS.equalTo;
/// #}}} @func isEQ

/// #{{{ @func isLE
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLE = IS.lessThanOrEqual;
/// #}}} @func isLE

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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
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

/// #{{{ @group STRING

/// #{{{ @func indentString
/**
 * @private
 * @param {string} src
 * @param {number=} count = `0`
 * @return {string}
 */
var indentString = require('./indent-string.js');
/// #}}} @func indentString

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func breakString
/**
 * @public
 * @param {string} src
 * @param {number=} indent = `0`
 * @return {string}
 */
function breakString(src, indent) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {number} */
  var max;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      indent = 0;
      break;
    default:
      if ( isUndefined(indent) ) {
        indent = 0;
      }
      else if ( !isNumber(indent) ) {
        throw setTypeError(new TypeError, 'indent', 'number=');
      }
      else if ( !isWholeNumber(indent) ) {
        throw setWholeError(new RangeError, 'indent', indent);
      }
      else if ( isLT(indent, 0) ) {
        indent = 0;
      }
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-no-break

  if ( isLE(src.length, MAX_LENGTH) ) {
    return src;
  }

  /// #}}} @step check-no-break

  /// #{{{ @step break-source-string

  i = getLastSpaceIndex(src, MAX_LENGTH);
  result = src.slice(0, i);
  src = src.slice(i);
  max = MAX_LENGTH - 3 - (indent * 2);
  while (src) {
    i = getLastSpaceIndex(src, max);
    line = src.slice(0, i);
    result += '\n' + line;
    src = src.slice(i);
  }

  /// #}}} @step break-source-string

  /// #{{{ @step indent-source-string

  src = indentString(src, indent);

  /// #}}} @step indent-source-string

  /// #{{{ @step return-source-string

  return src;

  /// #}}} @step return-source-string
}
/// #}}} @func breakString

/// #{{{ @func getLastSpaceIndex
/**
 * @private
 * @param {string} src
 * @param {number} max
 * @return {number}
 */
function getLastSpaceIndex(src, max) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'max');
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isNumber(max) ) {
    throw setTypeError(new TypeError, 'max', 'number');
  }

  if ( !isWholeNumber(max) || isLT(max, 10) ) {
    throw setIndexError(new RangeError, 'max', max, 10);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step save-source-length

  len = src.length;

  /// #}}} @step save-source-length

  /// #{{{ @step check-source-length

  if ( isLT(len, max) ) {
    return len;
  }

  /// #}}} @step check-source-length

  /// #{{{ @step get-last-space-index

  i = src.slice(0, max).lastIndexOf(' ');

  if ( isEQ(i, -1) ) {
    i = src.indexOf(' ');
  }

  /// #}}} @step get-last-space-index

  /// #{{{ @step return-index-or-length

  return isEQ(i, -1)
    ? len
    : ++i;

  /// #}}} @step return-index-or-length
}
/// #}}} @func getLastSpaceIndex

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = breakString;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
