/**
 * ---------------------------------------------------------------------------
 * TO-CAMEL-CASE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DASH_BEGIN
/**
 * @private
 * @const {!RegExp}
 */
var DASH_BEGIN = /^-+/;
/// #}}} @const DASH_BEGIN

/// #{{{ @const DASH_END
/**
 * @private
 * @const {!RegExp}
 */
var DASH_END = /-+$/;
/// #}}} @const DASH_END

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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func capitalizeCharacter
/**
 * @private
 * @param {string} match
 * @param {string} ch
 * @return {string}
 */
function capitalizeCharacter(match, ch) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'match');
    case 1:
      throw setNoArgError(new Error, 'ch');
  }

  if ( !isString(match) ) {
    throw setTypeError(new TypeError, 'match', 'string');
  }
  if ( !isString(ch) ) {
    throw setTypeError(new TypeError, 'ch', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return ch && ch.toUpperCase();

  /// #}}} @step return-result
}
/// #}}} @func capitalizeCharacter

/// #{{{ @func toCamelCase
/**
 * @public
 * @param {string} val
 * @return {string}
 */
function toCamelCase(val) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }
  if ( !isString(val) ) {
    throw setTypeError(new TypeError, 'val', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-empty-value

  if (!val) {
    return '';
  }

  /// #}}} @step check-empty-value

  /// #{{{ @step normalize-dashes

  val = val.replace(DASH_BEGIN, '');
  val = val.replace(DASH_END, '');
  val = val.replace(/--+/g, '-');

  /// #}}} @step normalize-dashes

  /// #{{{ @step check-empty-value

  if (!val) {
    return '';
  }

  /// #}}} @step check-empty-value

  /// #{{{ @step convert-value-to-camel-case

  val = val.replace(/-([a-z])/g, capitalizeCharacter);

  /// #}}} @step convert-value-to-camel-case

  /// #{{{ @step return-result

  return val;

  /// #}}} @step return-result
}
/// #}}} @func toCamelCase

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = toCamelCase;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
