/**
 * ---------------------------------------------------------------------------
 * IS-EMPTY-LINE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

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
var INDENT_COUNT = 2;
/// #}}} @const INDENT_COUNT

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadTaskHelper('is');
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
var setError = loadTaskHelper('set-error');
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

/// #{{{ @func isBlankLine
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
var isBlankLine = require('./is-blank-line.js');
/// #}}} @func isBlankLine

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
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group SPECIAL

/// #{{{ @func newIsIndented
/**
 * @private
 * @param {number=} count = `2`
 * @return {!function(string, number=): boolean}
 */
var newIsIndented = require('./is-indented.js').create;
/// #}}} @func newIsIndented

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func newIsEmptyLine
/**
 * @public
 * @param {number=} count = `2`
 * @return {!function(string, number=): boolean}
 */
function newIsEmptyLine(count) {

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
  var isIndented = newIsIndented(COUNT);
  /// #}}} @func isIndented

  /// #{{{ @func isEmptyLine
  /**
   * @public
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  function isEmptyLine(line, depth) {

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

    /// #{{{ @step return-result

    return !line || ( isBlankLine(line) && !isIndented(line, depth) );

    /// #}}} @step return-result
  }
  /// #}}} @func isEmptyLine

  /// #{{{ @step append-is-empty-line-properties

  isEmptyLine.isIndented = isIndented;
  isEmptyLine.construct = newIsEmptyLine;
  isEmptyLine.create = newIsEmptyLine;
  isEmptyLine.INDENT_COUNT = COUNT;
  isEmptyLine.COUNT = COUNT;

  /// #}}} @step append-is-empty-line-properties

  /// #{{{ @step freeze-is-empty-line

  freezeObject(isEmptyLine);

  /// #}}} @step freeze-is-empty-line

  /// #{{{ @step return-is-empty-line

  return isEmptyLine;

  /// #}}} @step return-is-empty-line
}
/// #}}} @func newIsEmptyLine

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = newIsEmptyLine();

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
