/**
 * ---------------------------------------------------------------------------
 * MAKE-INDENT HELPER
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
var INDENT_COUNT = require('../config.json').defaults.indentWhitespaceCount;
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

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeIndentMacro
/**
 * @private
 * @param {number} count
 * @return {string}
 */
function makeIndentMacro(count) {

  /** @type {string} */
  var indent;

  if (!arguments.length) {
    throw setNoArgError(new Error, 'count');
  }
  if ( !isNumber(count) ) {
    throw setTypeError(new TypeError, 'count', 'number');
  }
  if ( !isWholeNumber(count) || count < 0 ) {
    throw setIndexError(new RangeError, 'count', count, 0);
  }

  indent = ' ';
  while (--count) {
    indent += ' ';
  }
  return indent;
}
/// #}}} @func makeIndentMacro

/// #{{{ @func newMakeIndent
/**
 * @public
 * @param {number=} count = `2`
 * @return {!function(number): string}
 */
function newMakeIndent(count) {

  /// #{{{ @step verify-parameters

  if ( arguments.length > 0 && !isUndefined(count) ) {
    if ( !isNumber(count) ) {
      throw setTypeError(new TypeError, 'count', 'number');
    }
    if ( !isWholeNumber(count) || count < 0 ) {
      throw setIndexError(new RangeError, 'count', count, 0);
    }
  }
  else {
    count = INDENT_COUNT;
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const INDENT_STRING
  /**
   * @private
   * @const {string}
   */
  var INDENT_STRING = makeIndentMacro(count);
  /// #}}} @const INDENT_STRING

  /// #{{{ @func makeIndent
  /**
   * @public
   * @param {number} depth
   * @return {string}
   */
  function makeIndent(depth) {

    /** @type {string} */
    var indent;

    if (!arguments.length) {
      throw setNoArgError(new Error, 'depth');
    }
    if ( !isNumber(depth) ) {
      throw setTypeError(new TypeError, 'depth', 'number');
    }
    if ( !isWholeNumber(depth) ) {
      throw setWholeError(new RangeError, 'depth', depth);
    }

    if (depth < 1) {
      return '';
    }

    indent = INDENT_STRING;
    while (--depth) {
      indent += INDENT_STRING;
    }
    return indent;
  }
  /// #}}} @func makeIndent

  /// #{{{ @step append-make-indent-properties

  makeIndent.construct = newMakeIndent;
  makeIndent.create = newMakeIndent;
  makeIndent.INDENT_COUNT = count;
  makeIndent.COUNT = count;

  /// #}}} @step append-make-indent-properties

  /// #{{{ @step freeze-make-indent

  freezeObject(makeIndent);

  /// #}}} @step freeze-make-indent

  /// #{{{ @step return-make-indent

  return makeIndent;

  /// #}}} @step return-make-indent
}
/// #}}} @func newMakeIndent

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = newMakeIndent();

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
