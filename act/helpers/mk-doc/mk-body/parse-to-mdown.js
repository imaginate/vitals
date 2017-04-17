/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseToMdown
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!RegExp}
 */
var END_CODE = /^ *```$/;

/**
 * @private
 * @const {!RegExp}
 */
var INDENT = /^ +/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var LANGUAGE = /^ *```[a-zA-Z]+$/;

/**
 * @private
 * @const {!RegExp}
 */
var NEW_CODE = /^ *```/;

/**
 * @private
 * @const {!RegExp}
 */
var NEW_LIST = /^ *-(?!-)/;

/**
 * @private
 * @const {!RegExp}
 */
var SUBDASH = /^ *-/;

/**
 * @private
 * @const {!RegExp}
 */
var SUBLIST = /^ *--/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {string} line
 * @return {number}
 */
function getSpaces(line) {
  line = getMatch(line, INDENT);
  return line.length;
}

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {string} line
 * @param {number} spaces
 * @return {boolean}
 */
function isIndented(line, spaces) {

  /** @type {number} */
  var count;

  count = getSpaces(line);
  return isGT(count, 0) && isGT(count, spaces);
}

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {number} depth
 * @return {string}
 */
var mkIndent = require('../mk-indent.js');

////////////////////////////////////////////////////////////////////////////////
// EXTERNALS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {number}
 */
var $depth;

/**
 * @private
 * @type {number}
 */
var $spaces;

/**
 * @private
 * @type {string}
 */
var $indent;

/**
 * @private
 * @type {boolean}
 */
var $sublist;

/**
 * @private
 * @type {boolean}
 */
var $list;

/**
 * @private
 * @type {boolean}
 */
var $code;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseCode(line) {
  line = line.slice($spaces);
  code = !END_CODE.test(line);
  return $indent + line + '\n';
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseLine(line) {

  if ( $list && !isIndented(line, $spaces) ) {
    $list = false;
    $depth -= 1;
    $indent = mkIndent($depth);
    return '\n\n' + $indent + line;
  }

  if ( $sublist && !isIndented(line, $spaces) ) {
    $sublist = false;
    $spaces -= 2;
    $list = isIndented(line, $spaces);
    $depth -= $list ? 1 : 2;
    $indent = mkIndent($depth);
    return '\n\n' + $indent + line;
  }

  line = line.replace(INDENT, '');
  return ' ' + line;
}

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
function parseLines(lines) {

  /** @type {string} */
  var desc;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  desc = '';

  len = lines.length;
  i = -1;
  while ( isLT(++i, len) ) {
    line = lines[i];
    if (!line)
      continue;
    desc += $code
      ? parseCode(line)
      : NEW_CODE.test(line)
        ? parseNewCode(line)
        : NEW_LIST.test(line)
          ? parseList(line)
          : SUBLIST.test(line)
            ? parseSublist(line)
            : parseLine(line);
  }
  return desc;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseList(line) {

  if (!$list) {
    $depth += $sublist ? -1 : 1;
    $indent = mkIndent($depth);
    $spaces = getSpaces(line);
    $sublist = false;
    $list = true;
  }

  line = line.replace(INDENT, '');
  return '\n' + $indent + line;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseNewCode(line) {
  $spaces = getSpaces(line);
  line = line.slice($spaces);
  if ( !LANGUAGE.test(line) )
    line = '```javascript';
  $code = true;
  return '\n\n' + $indent + line + '\n';
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseSublist(line) {

  if (!$sublist) {
    $depth += $list ? 1 : 2;
    $indent = mkIndent($depth);
    $spaces = getSpaces(line);
    $sublist = true;
    $list = false;
  }

  line = line.replace(SUBDASH, '');
  return '\n' + $indent + line;
}

/**
 * @private
 * @param {number} depth
 */
function setupExterns(depth) {

  $depth = depth;
  $spaces = 0;
  $indent = mkIndent(depth);

  $sublist = false;
  $list = false;
  $code = false;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
module.exports = function parseToMdown(lines, depth) {

  /** @type {string} */
  var indent;

  if ( isLT(lines.length, 1) )
    return '';

  setupExterns(depth);
  indent = mkIndent(depth);
  return indent + parseLines(lines);
};
