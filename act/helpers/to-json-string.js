/**
 * ---------------------------------------------------------------------------
 * TO-JSON-STRING HELPER
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

/// #{{{ @const JSON3
/**
 * @private
 * @const {!Object}
 * @struct
 */
var JSON3 = require('json3');
/// #}}} @const JSON3

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

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

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

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func stringify
/**
 * @private
 * @param {!Object} src
 * @param {(undefined|!function(string, *): *)=} filter
 * @param {(undefined|number|string)=} space
 * @return {string}
 */
var stringify = JSON3.stringify;
/// #}}} @func stringify

/// #{{{ @func toJsonString
/**
 * @public
 * @param {!Object} src
 * @param {(?function(string, *): *)=} filter = `null`
 * @param {(?number|?string)=} space = `null`
 * @return {string}
 */
function toJsonString(src, filter, space) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      filter = undefined;
      space = undefined;
      break;
    case 2:
      if ( isUndefined(filter) || isNull(filter) ) {
        filter = undefined;
        space = undefined;
      }
      else if ( isNumber(filter) || isString(filter) ) {
        space = filter;
        filter = undefined;
      }
      else if ( !isFunction(filter) ) {
        throw setTypeError(new TypeError, 'filter',
          '(?function(string, *): *)=');
      }
      break;
    default:
      if ( isUndefined(filter) || isNull(filter) ) {
        filter = undefined;
      }
      else if ( !isFunction(filter) ) {
        throw setTypeError(new TypeError, 'filter',
          '(?function(string, *): *)=');
      }

      if ( isUndefined(space) || isNull(space) ) {
        space = undefined;
      }
      else if ( !isNumber(space) && !isString(space) ) {
        throw setTypeError(new TypeError, 'space', '(?number|?string)=');
      }
  }

  if ( !isPlainObject(src) ) {
    throw setTypeError(new TypeError, 'src', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return isUndefined(space)
    ? isUndefined(filter)
      ? stringify(src)
      : stringify(src, filter)
    : stringify(src, filter, space);

  /// #}}} @step return-result
}
/// #}}} @func toJsonString

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = toJsonString;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
