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

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} id
 * @return {!Function}
 */
var loadClass = require('../../../helpers/load-class.js');
/// #}}} @func loadClass

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

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const OL_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var OL_PATTERN = /^ *([0-9]+)\) +.*? *$/;
/// #}}} @const OL_PATTERN

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

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setOlRankError
/**
 * @private
 * @param {!RangeError} err
 * @param {!Block} BLOCK
 * @param {number} index
 * @param {number} rank
 * @return {!RangeError}
 */
function setOlRankError(err, BLOCK, index, rank) {

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
    case 2:
      throw setNoArgError(new Error, 'index');
    case 3:
      throw setNoArgError(new Error, 'rank');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(rank) ) {
    throw setTypeError(new TypeError, 'rank', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  index += BLOCK.INDEX;

  msg = 'invalid `count` for `bullet` in documentation `ordered-list`\n'
    + '    line-number-within-snippet: `' + (index + 1) + '`\n'
    + '    valid-bullet-value: `"' + rank + ')"`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = index + 9;
  i = index - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === index
      ? '--> '
      : '    ';
    line = lines[i++] || ' ';
    line = line.replace(/`/g, '\\`');
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setOlRankError

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

/// #{{{ @group SPECIAL

/// #{{{ @func newBlock
/**
 * @private
 * @param {(!Html|!Block)} parent
 * @param {number} index
 * @param {number} depth
 * @param {string=} id = `""`
 * @return {!Block}
 */
var newBlock = loadClass('blk').create;
/// #}}} @func newBlock

/// #{{{ @func skipBlankLines
/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} len
 * @param {number} i
 * @return {number}
 */
var skipBlankLines = loadHelper('skip-blank-lines');
/// #}}} @func skipBlankLines

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func OrderedList.prototype.parse
/**
 * @public
 * @this {!OrderedList}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {!Array<!Block>} ELEMS
 * @param {!Array<string>} LINES
 * @param {number} LEN
 * @param {number} DEPTH
 * @return {string}
 */
function parseOrderedList(ROOT, BLOCK, ELEMS, LINES, LEN, DEPTH) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {number} */
  var rank;
  /** @type {string} */
  var line;
  /** @type {!Block} */
  var blk;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

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

  /// #{{{ @step parse-each-line

  result = '<ol>';
  rank = 0;
  i = 0;
  while (i < LEN) {
    line = LINES[i];
    if ( String(++rank) !== line.replace(OL_PATTERN, '$1') ) {
      throw setOlRankError(new RangeError, BLOCK, i, rank);
    }
    blk = new Block(BLOCK, i, DEPTH, 'li');
    result += blk.RESULT;
    ELEMS.push(blk);
    i = blk.END;
    i = skipBlankLines(LINES, LEN, i);
  }
  result += '</ol>';

  /// #}}} @step parse-each-line

  /// #{{{ @step return-parsed-result

  return result;

  /// #}}} @step return-parsed-result
}
/// #}}} @func OrderedList.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseOrderedList;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
