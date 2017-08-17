/**
 * ---------------------------------------------------------------------------
 * GET-SUPER-METHOD HELPER
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

/// #{{{ @const NOT_SUPER
/**
 * @private
 * @const {!RegExp}
 */
var NOT_SUPER = /\..*$/;
/// #}}} @const NOT_SUPER

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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group STRING

/// #{{{ @func trimVitals
/**
 * @private
 * @param {string} method
 * @return {string}
 */
var trimVitals = require('./trim-vitals.js');
/// #}}} @func trimVitals

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getSuperMethod
/**
 * @public
 * @param {string} method
 * @return {string}
 */
function getSuperMethod(method) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'method');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  method = method && trimVitals(method);
  return method && method.replace(NOT_SUPER, '');

  /// #}}} @step return-result
}
/// #}}} @func getSuperMethod

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getSuperMethod;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
