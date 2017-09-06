/**
 * ---------------------------------------------------------------------------
 * PARSE METHOD
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
var loadHelper = require('../../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const HR_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var HR_PATTERN = /^ *---+ *$/;
/// #}}} @const HR_PATTERN

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

/// #{{{ @func setHrError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @return {!SyntaxError}
 */
function setHrError(err, BLOCK) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid `horizontal line-break` in documentation\n'
    + '    line-number-within-snippet: `' + (BLOCK.INDEX + 1) + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = BLOCK.INDEX + 9;
  i = BLOCK.INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === BLOCK.INDEX
      ? '--> '
      : '    ';
    line = lines[i++] || ' ';
    line = line.replace(/`/g, '\\`');
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setHrError

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

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isHtml
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHtml = IS.html;
/// #}}} @func isHtml

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Horizontal.prototype.parse
/**
 * @public
 * @this {!Horizontal}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {!Array<!Block>} ELEMS
 * @param {!Array<string>} LINES
 * @param {number} LEN
 * @param {number} DEPTH
 * @return {string}
 */
function parseHorizontal(ROOT, BLOCK, ELEMS, LINES, LEN, DEPTH) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ROOT');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'ELEMS');
    case 3:
      throw setNoArgError(new Error, 'LINES');
    case 4:
      throw setNoArgError(new Error, 'LEN');
    case 5:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isHtml(ROOT) || ROOT !== this.BLOCK.ROOT ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isBlock(BLOCK) || BLOCK !== this.BLOCK ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isArray(ELEMS) || ELEMS !== BLOCK.ELEMS ) {
    throw setTypeError(new TypeError, 'ELEMS', '!Array<!Block>');
  }
  if ( !isArray(LINES) || LINES !== BLOCK.LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }
  if ( !isNumber(LEN) || LEN !== BLOCK.LEN ) {
    throw setTypeError(new TypeError, 'LEN', 'number');
  }
  if ( !isNumber(DEPTH) || DEPTH !== BLOCK.DEPTH ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const LINE
  /**
   * @private
   * @const {string}
   */
  var LINE = LINES[0];
  /// #}}} @const LINE

  /// #}}} @step set-constants

  /// #{{{ @step verify-line

  if ( !HR_PATTERN.test(LINE) ) {
    throw setHrError(new SyntaxError, BLOCK);
  }

  /// #}}} @step verify-line

  /// #{{{ @step return-parsed-result

  return '<hr>';

  /// #}}} @step return-parsed-result
}
/// #}}} @func Horizontal.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseHorizontal;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
