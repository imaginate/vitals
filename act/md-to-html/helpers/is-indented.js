/**
 * ---------------------------------------------------------------------------
 * IS-INDENTED HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const INDENT_COUNT
/**
 * @private
 * @const {number}
 */
var INDENT_COUNT = require('../config.json').defaults.indentWhitespaceCount;
/// #}}} @const INDENT_COUNT

/// #{{{ @const INDENT_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var INDENT_PATTERN = /^( +).*$/;
/// #}}} @const INDENT_PATTERN

/// #{{{ @const INDENT_PATTERN_START
/**
 * @private
 * @const {!RegExp}
 */
var INDENT_PATTERN_START = /^ /;
/// #}}} @const INDENT_PATTERN_START

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
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
var setError = loadHelper('set-error');
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
 * @param {*} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func newIsIndented
/**
 * @public
 * @param {number=} count = `2`
 * @return {!function(string, number=): boolean}
 */
function newIsIndented(count) {

  /// #{{{ @step verify-parameters

  if ( arguments.length > 0 && !isUndefined(count) ) {
    if ( !isNumber(count) ) {
      throw setTypeError(new TypeError, 'count', 'number');
    }
    if ( !isWholeNumber(count) || count < 1 ) {
      throw setIndexError(new RangeError, 'count', count, 1);
    }
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const COUNT
  /**
   * @private
   * @const {number}
   */
  var COUNT = isNumber(count) && count > 0
    ? count
    : INDENT_COUNT;
  /// #}}} @const COUNT

  /// #{{{ @func isIndented
  /**
   * @public
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  function isIndented(line, depth) {

    /// #{{{ @step declare-variables

    /** @type {number} */
    var level;
    /** @type {number} */
    var len;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'line');
      case 1:
        depth = 0;
        break;
      default:
        if ( isUndefined(depth) ) {
          depth = 0;
        }
        else if ( !isNumber(depth) ) {
          throw setTypeError(new TypeError, 'depth', 'number=');
        }
        else if ( !isWholeNumber(depth) ) {
          throw setWholeError(new RangeError, 'depth', depth);
        }
        else if (depth < 0) {
          depth = 0;
        }
    }

    if ( !isString(line) ) {
      throw setTypeError(new TypeError, 'line', 'string');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step get-indent-level

    len = INDENT_PATTERN_START.test(line)
      ? line.replace(INDENT_PATTERN, '$1').length
      : 0;
    level = len < COUNT
      ? 0
      : (len - (len % COUNT)) / COUNT;

    /// #}}} @step get-indent-level

    /// #{{{ @step return-result

    return level > depth;

    /// #}}} @step return-result
  }
  /// #}}} @func isIndented

  /// #{{{ @step append-is-indented-properties

  isIndented.construct = newIsIndented;
  isIndented.create = newIsIndented;
  isIndented.INDENT_COUNT = COUNT;
  isIndented.COUNT = COUNT;

  /// #}}} @step append-is-indented-properties

  /// #{{{ @step freeze-is-indented

  freezeObject(isIndented);

  /// #}}} @step freeze-is-indented

  /// #{{{ @step return-is-indented

  return isIndented;

  /// #}}} @step return-is-indented
}
/// #}}} @func newIsIndented

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = newIsIndented();

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
