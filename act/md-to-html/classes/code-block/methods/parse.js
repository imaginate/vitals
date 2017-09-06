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

/// #{{{ @const CLOSE_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var CLOSE_PATTERN = /^ *``` *$/;
/// #}}} @const CLOSE_PATTERN

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const LANG_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var LANG_PATTERN = /^ *`+ *([a-zA-Z0-9_\-]+) *$/;
/// #}}} @const LANG_PATTERN

/// #{{{ @const OPEN_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var OPEN_PATTERN = /^ *``` *[a-zA-Z0-9_\-]* *$/;
/// #}}} @const OPEN_PATTERN

/// #{{{ @const TICK_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var TICK_PATTERN = /^ *```(?!`)/;
/// #}}} @const TICK_PATTERN

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

/// #{{{ @func setPreCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setPreCloseError(err, BLOCK, DEPTH) {

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
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {number}
   */
  var INDENTS = BLOCK.makeIndent.INDENT_COUNT * DEPTH;

  /**
   * @private
   * @const {string}
   */
  var PATT = INDENTS > 0
    ? '/^ {' + INDENTS + '}\\`\\`\\` *$/'
    : '/^\\`\\`\\` *$/';

  /**
   * @private
   * @const {number}
   */
  var INDEX = BLOCK.END - 1;

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid closing line for a `pre` code-block in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-closing-line-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 9;
  i = INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
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
/// #}}} @func setPreCloseError

/// #{{{ @func setPreIndentError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} INDEX
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setPreIndentError(err, BLOCK, INDEX, DEPTH) {

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
      throw setNoArgError(new Error, 'INDEX');
    case 3:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(INDEX) ) {
    throw setTypeError(new TypeError, 'INDEX', 'number');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {number}
   */
  var INDENTS = BLOCK.makeIndent.INDENT_COUNT * DEPTH;

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^ {' + INDENTS + '}/';

  /**
   * @private
   * @const {number}
   */
  INDEX += BLOCK.INDEX;

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid line indentation for a `pre` code-block in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-line-indent-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 9;
  i = INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
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
/// #}}} @func setPreIndentError

/// #{{{ @func setPreNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setPreNoCloseError(err, BLOCK, DEPTH) {

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
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {number}
   */
  var INDENTS = BLOCK.makeIndent.INDENT_COUNT * DEPTH;

  /**
   * @private
   * @const {string}
   */
  var PATT = INDENTS > 0
    ? '/^ {' + INDENTS + '}\\`\\`\\` *$/'
    : '/^\\`\\`\\` *$/';

  /**
   * @private
   * @const {number}
   */
  var INDEX = BLOCK.INDEX;

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'missing a closing line for a `pre` code-block in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-closing-line-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + BLOCK.LEN + 3;
  i = INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i >= INDEX
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
/// #}}} @func setPreNoCloseError

/// #{{{ @func setPreOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setPreOpenError(err, BLOCK, DEPTH) {

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
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {number}
   */
  var INDENTS = BLOCK.makeIndent.INDENT_COUNT * DEPTH;

  /**
   * @private
   * @const {string}
   */
  var PATT = INDENTS > 0
    ? '/^ {' + INDENTS + '}\\`\\`\\` *[a-zA-Z0-9_\\-]* *$/'
    : '/^\\`\\`\\` *[a-zA-Z0-9_\\-]* *$/';

  /**
   * @private
   * @const {number}
   */
  var INDEX = BLOCK.INDEX;

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid opening line for a `pre` code-block in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-opening-line-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 9;
  i = INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
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
/// #}}} @func setPreOpenError

/// #{{{ @func setPreTickError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} INDEX
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setPreTickError(err, BLOCK, INDEX, DEPTH) {

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
      throw setNoArgError(new Error, 'INDEX');
    case 3:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(INDEX) ) {
    throw setTypeError(new TypeError, 'INDEX', 'number');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var TYPE = INDEX > 0
    ? 'closing'
    : 'opening';

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^ *\\`\\`\\`(?!\\`)/';

  /**
   * @private
   * @const {number}
   */
  INDEX += BLOCK.INDEX;

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid ' + TYPE + ' line `tick` count for a `pre` code-block in '
    + 'documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-' + TYPE + '-line-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 9;
  i = INDEX - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
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
/// #}}} @func setPreTickError

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

/// #{{{ @func getIndent
/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getIndent = loadHelper('get-indent');
/// #}}} @func getIndent

/// #{{{ @func makeMarkdownIndent
/**
 * @private
 * @param {number} depth
 * @return {string}
 */
var makeMarkdownIndent = loadHelper('make-indent').create(8);
/// #}}} @func makeMarkdownIndent

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func CodeBlock.prototype.parse
/**
 * @public
 * @this {!CodeBlock}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {!Array<!Block>} ELEMS
 * @param {!Array<string>} LINES
 * @param {number} LEN
 * @param {number} DEPTH
 * @return {string}
 */
function parseCodeBlock(ROOT, BLOCK, ELEMS, LINES, LEN, DEPTH) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
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

  /// #{{{ @step verify-lines-length

  if (LEN < 2) {
    throw setPreNoCloseError(new SyntaxError, BLOCK, DEPTH);
  }

  /// #}}} @step verify-lines-length

  /// #{{{ @step set-constants

  /// #{{{ @const LAST
  /**
   * @private
   * @const {number}
   */
  var LAST = BLOCK.LAST;
  /// #}}} @const LAST

  /// #{{{ @const OPEN
  /**
   * @private
   * @const {string}
   */
  var OPEN = LINES[0];
  /// #}}} @const OPEN

  /// #{{{ @const LANG
  /**
   * @private
   * @const {string}
   */
  var LANG = LANG_PATTERN.test(OPEN)
    ? OPEN.replace(LANG_PATTERN, '$1')
    : 'javascript';
  /// #}}} @const LANG

  /// #{{{ @const CLOSE
  /**
   * @private
   * @const {string}
   */
  var CLOSE = LINES[LAST];
  /// #}}} @const CLOSE

  /// #{{{ @const MD_INDENT
  /**
   * @private
   * @const {string}
   */
  var MD_INDENT = makeMarkdownIndent(DEPTH);
  /// #}}} @const MD_INDENT

  /// #{{{ @const VALID_INDENT
  /**
   * @private
   * @const {string}
   */
  var VALID_INDENT = BLOCK.makeIndent(DEPTH);
  /// #}}} @const VALID_INDENT

  /// #{{{ @const INDENT_PATTERN
  /**
   * @private
   * @const {?RegExp}
   */
  var INDENT_PATTERN = !!VALID_INDENT
    ? new RegExp('^' + VALID_INDENT)
    : null;
  /// #}}} @const INDENT_PATTERN

  /// #}}} @step set-constants

  /// #{{{ @step verify-opening

  if ( !!INDENT_PATTERN && !INDENT_PATTERN.test(OPEN) ) {
    throw setPreIndentError(new SyntaxError, BLOCK, 0, DEPTH);
  }
  if ( !TICK_PATTERN.test(OPEN) ) {
    throw setPreTickError(new SyntaxError, BLOCK, 0, DEPTH);
  }
  if ( getIndent(OPEN) !== VALID_INDENT || !OPEN_PATTERN.test(OPEN) ) {
    throw setPreOpenError(new SyntaxError, BLOCK, DEPTH);
  }

  /// #}}} @step verify-opening

  /// #{{{ @step verify-closing

  if ( !!INDENT_PATTERN && !INDENT_PATTERN.test(CLOSE) ) {
    throw setPreIndentError(new SyntaxError, BLOCK, LAST, DEPTH);
  }
  if ( !TICK_PATTERN.test(CLOSE) ) {
    throw setPreTickError(new SyntaxError, BLOCK, LAST, DEPTH);
  }
  if ( getIndent(CLOSE) !== VALID_INDENT || !CLOSE_PATTERN.test(CLOSE) ) {
    throw setPreCloseError(new SyntaxError, BLOCK, DEPTH);
  }

  /// #}}} @step verify-closing

  /// #{{{ @step parse-each-line

  result = '\n\n' + MD_INDENT + '```' + LANG + '\n';
  i = 0;
  while (++i < LAST) {
    line = LINES[i];
    if ( !!INDENT_PATTERN && !INDENT_PATTERN.test(line) ) {
      throw setPreIndentError(new SyntaxError, BLOCK, i);
    }
    line = line.replace(INDENT_PATTERN, '');
    result += MD_INDENT + line + '\n';
  }
  result += MD_INDENT + '```\n';

  /// #}}} @step parse-each-line

  /// #{{{ @step return-parsed-result

  return result;

  /// #}}} @step return-parsed-result
}
/// #}}} @func CodeBlock.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseCodeBlock;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
