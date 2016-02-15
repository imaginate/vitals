/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getReturns
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
var has    = vitals.has;
var remap  = vitals.remap;
var roll   = vitals.roll;
var slice  = vitals.slice;
var until  = vitals.until;

var TYPE  = /^@returns? \{([^}]+)\}.*$/;
var TRIM  = /^@returns? \{[^}]+\} *-? */;

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getReturns(lines) {

  /** @type {string} */
  var type;
  /** @type {string} */
  var desc;

  lines = pruneLines(lines);
  type  = remap(lines[0], TYPE, '$1');
  desc  = getDescrip(lines);
  return fuse('<i>', type, '</i>\n', desc);
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;

  until(false, lines, function(line, i) {
    if ( has(line, /^@return/) ) start = i;
    return start === undefined;
  });
  return slice(lines, start, -1);
}

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
function getDescrip(lines, indents) {

  /** @type {boolean} */
  var sublist;
  /** @type {number} */
  var indents;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var desc;
  /** @type {boolean} */
  var code;
  /** @type {boolean} */
  var list;

  desc = cut(lines[0], TRIM);
  lines = slice(lines, 1);
  indents = 0;
  return roll.up(desc, lines, function(line) {

    if (code) {
      code = !has(line, /^```$/);
      return fuse(indent, line, '\n');
    }

    if ( has(line, /^```/) ) {
      line = line.length > 3 ? line : '```javascript';
      code = true;
      indent = getIndent(4);
      return fuse('\n', indent, line, '\n');
    }

    if ( has(line, /^- /) ) {
      if (!list) {
        list = true;
        indent = getIndent(sublist ? --indents : ++indents);
        sublist = false;
      }
      return fuse('\n', indent, line);
    }

    if ( has(line, /^-- /) ) {
      if (list) {
        list = false;
        indent = getIndent(++indents);
        sublist = true;
      }
      line = slice(line, 1);
      return fuse('\n', indent, line);
    }

    return fuse(' ', line);
  });
}

/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function getIndent(indents) {
  return fill(indents, '  ');
}
