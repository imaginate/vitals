/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getParams
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
var each   = vitals.each;
var fill   = vitals.fill;
var fuse   = vitals.fuse;
var has    = vitals.has;
var remap  = vitals.remap;
var roll   = vitals.roll;
var slice  = vitals.slice;
var until  = vitals.until;

var PARAM = /^@param \{[^}]+\} ([a-zA-Z.]+).*$/;
var TYPE  = /^@param \{([^}]+)\}.*$/;
var DEF   = /^@param .*?\[default= ([^\]]+)\].*$/;
var TRIM  = /^@param \{[^}]+\} [a-zA-Z.]+ *-? *(?:\[default= [^\]]+\])?/;

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;
  /** @type {number} */
  var index;
  /** @type {string} */
  var param;
  /** @type {string} */
  var intro;
  /** @type {boolean} */
  var prop;
  /** @type {string} */
  var type;
  /** @type {string} */
  var desc;
  /** @type {string} */
  var def;

  index = 0;
  lines = pruneLines(lines);
  params = buildParams(lines);
  return roll.up('', params, function(lines) {
    param = remap(lines[0], PARAM, '$1');
    type  = remap(lines[0], TYPE,  '$1');
    prop  = has(param, '.');
    def   = getDefault(lines, prop ? 2 : 1);
    desc  = getDescrip(lines, prop ? 2 : 1);
    intro = prop ? '  - ' : fuse('', ++index, ') ');
    return fuse(intro, '**', param, '** <i>', type, '</i>\n', def, desc);
  });
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;
  /** @type {number} */
  var end;

  lines = slice(lines, -1);
  until(false, lines, function(line, i) {
    if ( has(line, /^@public/) ) start = ++i;
    if ( has(line, /^@return/) ) end = i;
    return start === undefined || end === undefined;
  });
  return slice(lines, start, end);
}

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<!Array<string>>}
 */
function buildParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;
  /** @type {!Array<string>} */
  var param;
  /** @type {number} */
  var start;

  params = [];
  start = 0;
  each(lines, function(line, i) {
    if ( !i || !has(line, /^@param/) ) return;
    param = slice(lines, start, i);
    params = fuse.val(params, param);
    start = i;
  });
  return params;
}

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} indents
 * @return {string}
 */
function getDefault(lines, indents) {

  /** @type {string} */
  var indent;
  /** @type {string} */
  var def;

  if ( !has(lines[0], DEF) ) return '';

  indent = getIndent(indents);
  def = remap(lines[0], DEF, '$1');
  return fuse(indent, 'default: ` ', def, ' `\n');
}

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} indents
 * @return {string}
 */
function getDescrip(lines, indents) {

  /** @type {boolean} */
  var sublist;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var desc;
  /** @type {boolean} */
  var code;
  /** @type {boolean} */
  var list;

  desc  = cut(lines[0], TRIM);
  lines = slice(lines, 1);
  desc  = roll.up(desc, lines, function(line) {

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

  return desc && fuse(desc, '\n');
}

/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function getIndent(indents) {
  return fill(indents, '  ');
}
