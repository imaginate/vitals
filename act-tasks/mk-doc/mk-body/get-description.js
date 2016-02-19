/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDescription
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var vitals = require('node-vitals')('base');
var cut    = vitals.cut;
var fill   = vitals.fill;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var roll   = vitals.roll;
var slice  = vitals.slice;

var TRIM = /^(?:@param \{[^}]+\} [a-zA-Z.]+ *-? *(?:\[default= [^\]]+\])?|@returns? \{[^}]+\} *-? *)/;
var DASH = /^-(?=-)/;
var INDENT = /^ +/;
var SUBLIST = /^ *--/;
var NEW_LIST = /^ *-/;
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

  begin = cut(lines[0] || '', TRIM);
  lines = slice(lines, 1);
  desc = parseLines(lines, indents);
  desc = fuse(begin, desc);

  if (!desc) return '';

  indent = getIndent(indents);
  return fuse(indent, desc);
};

/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function getIndent(indents) {
  return fill(indents, '  ');
}

/**
 * @private
 * @param {string} line
 * @return {number}
 */
function getSpaces(line) {
  line = get(line, INDENT)[0] || '';
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

  indents = _indents;
  indent = getIndent(indents);

  sublist = false;
  list = false;
  code = false;

  return roll.up('', lines, function(line) {
    return line
      ? code
        ? parseCode(line)
        : has(line, NEW_CODE)
          ? parseNewCode(line)
          : has(line, NEW_LIST)
            ? parseList(line)
            : has(line, SUBLIST)
              ? parseSublist(line)
              : parseLine(line)
      : '';
  });
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
    return fuse('\n\n', indent, line);
  }

  if ( sublist && !isIndented(line, spaces) ) {
    sublist = false;
    spaces -= 2;
    list = isIndented(line, spaces);
    indents -= list ? 1 : 2;
    indent = getIndent(indents);
    return fuse('\n\n', indent, line);
  }

  line = cut(line, INDENT);
  return fuse(' ', line);
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

  line = cut(line, INDENT);
  return fuse('\n', indent, line);
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

  line = cut(line, INDENT);
  line = cut(line, DASH);
  return fuse('\n', indent, line);
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseNewCode(line) {
  spaces = getSpaces(line);
  line = slice(line, spaces);
  if ( !has(line, LANGUAGE) ) line = '```javascript';
  code = true;
  return fuse('\n\n', indent, line, '\n');
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function parseCode(line) {
  line = slice(line, spaces);
  code = !has(line, END_CODE);
  return fuse(indent, line, '\n');
}
