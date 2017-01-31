/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDescription
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var get = require('../../get-match');

var TRIM = /^(?:@param \{[^}]+\} [a-zA-Z.]+ *-? *(?:\[default= [^\]]+\])?|@returns? \{[^}]+\} *-? *)/;
var INDENT = /^ +/;
var SUBDASH = /^ *-/;
var SUBLIST = /^ *--/;
var NEW_LIST = /^ *-(?!-)/;
var NEW_CODE = /^ *```/;
var END_CODE = /^ *```$/;
var LANGUAGE = /^ *```[a-zA-Z]+$/;

/**
 * @param {!Array<string>} lines
 * @param {number} indents
 * @return {string}
 */
module.exports = function getDescription(lines, indents) {

  /** @type {string} */
  var indent;
  /** @type {string} */
  var begin;
  /** @type {string} */
  var desc;

  if (!lines.length) return '';

  begin = lines[0] || '';
  begin = begin.replace(TRIM, '');
  lines = lines.slice(1);
  desc = parseLines(lines, indents);
  desc = begin + desc;

  if (!desc) return '';

  indent = getIndent(indents);
  return indent + desc;
};

/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function getIndent(indents) {

  /** @type {string} */
  var indent;

  if (indents < 1) return '';

  indent = '';
  while (indents--) indent += '  ';
  return indent;
}

/**
 * @private
 * @param {string} line
 * @return {number}
 */
function getSpaces(line) {
  line = get(line, INDENT);
  return line.length;
}

/**
 * @private
 * @param {string} line
 * @param {number} spaces
 * @return {boolean}
 */
function isIndented(line, spaces) {

  /** @type {number} */
  var lineSpaces;

  lineSpaces = getSpaces(line);
  return lineSpaces > 0 && lineSpaces > spaces;
}

// The following variables manage the parsed state.
// All methods defined below will make use of them.

/** @type {number} */
var indents;
/** @type {number} */
var spaces;

/** @type {string} */
var indent;

/** @type {boolean} */
var sublist;
/** @type {boolean} */
var list;
/** @type {boolean} */
var code;

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} _indents
 * @return {string}
 */
function parseLines(lines, _indents) {

  /** @type {string} */
  var desc;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  indents = _indents;
  indent = getIndent(indents);

  sublist = false;
  list = false;
  code = false;

  desc = '';
  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    if (!line) continue;
    desc += code
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
function parseLine(line) {

  if ( list && !isIndented(line, spaces) ) {
    list = false;
    --indents;
    indent = getIndent(indents);
    return '\n\n' + indent + line;
  }

  if ( sublist && !isIndented(line, spaces) ) {
    sublist = false;
    spaces -= 2;
    list = isIndented(line, spaces);
    indents -= list ? 1 : 2;
    indent = getIndent(indents);
    return '\n\n' + indent + line;
  }

  line = line.replace(INDENT, '');
  return ' ' + line;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseList(line) {

  if (!list) {
    indents += sublist ? -1 : 1;
    indent = getIndent(indents);
    spaces = getSpaces(line);
    sublist = false;
    list = true;
  }

  line = line.replace(INDENT, '');
  return '\n' + indent + line;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseSublist(line) {

  if (!sublist) {
    indents += list ? 1 : 2;
    indent = getIndent(indents);
    spaces = getSpaces(line);
    sublist = true;
    list = false;
  }

  line = line.replace(SUBDASH, '');
  return '\n' + indent + line;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseNewCode(line) {
  spaces = getSpaces(line);
  line = line.slice(spaces);
  if ( !LANGUAGE.test(line) ) line = '```javascript';
  code = true;
  return '\n\n' + indent + line + '\n';
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseCode(line) {
  line = line.slice(spaces);
  code = !END_CODE.test(line);
  return indent + line + '\n';
}
