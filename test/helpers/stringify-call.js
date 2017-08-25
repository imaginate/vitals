/**
 * ---------------------------------------------------------------------------
 * STRINGIFY-CALL HELPER
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

/// #{{{ @const LINE_LIMIT
/**
 * @private
 * @const {number}
 */
var LINE_LIMIT = 50;
/// #}}} @const LINE_LIMIT

/// #{{{ @const LOG_OCD_INST
/**
 * @private
 * @const {!Function}
 */
var LOG_OCD_INST = require('log-ocd')();
/// #}}} @const LOG_OCD_INST

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

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isLT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;
/// #}}} @func isLT

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #}}} @group OBJECT

/// #{{{ @group STRING

/// #{{{ @func valueToString
/**
 * @private
 * @param {*} val
 * @return {string}
 */
var valueToString = LOG_OCD_INST.toString;
/// #}}} @func valueToString

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group CONFIGURE
//////////////////////////////////////////////////////////////////////////////
// CONFIGURE
//////////////////////////////////////////////////////////////////////////////

LOG_OCD_INST.toString.setConfig({
  'style': false
});

LOG_OCD_INST.toString.setFormat({
  'lineLimit': LINE_LIMIT
});

/// #}}} @group CONFIGURE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func stringifyCall
/**
 * @public
 * @param {string} method
 * @param {!Array} args
 * @return {string}
 */
function stringifyCall(method, args) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'method');
    case 1:
      throw setNoArgError(new Error, 'args');
  }

  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(args) ) {
    throw setTypeError(new TypeError, 'args', '!Array');
  }

  if (!method) {
    throw setEmptyError(new Error, 'method');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-argument-count

  if ( isLT(args.length, 1) ) {
    return method + '();';
  }

  /// #}}} @step check-argument-count

  /// #{{{ @step make-result

  result = '';
  last = args.length - 1;
  forEachProperty(args, function stringifyArgument(arg, i) {
    result += valueToString(arg);
    if ( isLT(i, last) ) {
      result += ', ';
    }
  });
  result = method + '(' + result + ');';

  /// #}}} @step make-result

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func stringifyCall

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = stringifyCall;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
