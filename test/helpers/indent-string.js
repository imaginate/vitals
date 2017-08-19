/**
 * ---------------------------------------------------------------------------
 * INDENT-STRING HELPER
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

/// #{{{ @const LF
/**
 * @private
 * @const {!RegExp}
 */
var LF = /\n/;
/// #}}} @const LF

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

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func indentString
/**
 * @public
 * @param {string} src
 * @param {number=} count = `0`
 * @return {string}
 */
function indentString(src, count) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var indent;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      count = 0;
      break;
    default:
      if ( isUndefined(count) ) {
        count = 0;
      }
      else if ( !isNumber(count) ) {
        throw setTypeError(new TypeError, 'count', 'number=');
      }
      else if ( !isWholeNumber(count) ) {
        throw setWholeError(new RangeError, 'count', count);
      }
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-no-indent

  if ( isLT(count, 1) || !src || !LF.test(src) ) {
    return src;
  }

  /// #}}} @step check-no-indent

  /// #{{{ @step make-indentation

  indent = '';
  while (count--) {
    indent += '  ';
  }

  /// #}}} @step make-indentation

  /// #{{{ @step indent-source-string

  indent = '\n' + indent;
  src = src.replace(/\n/g, indent);

  /// #}}} @step indent-source-string

  /// #{{{ @step return-source-string

  return src;

  /// #}}} @step return-source-string
}
/// #}}} @func indentString

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = indentString;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
