/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getParams
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var PARAM = /^@param \{[^}]+\} ([a-zA-Z.]+).*$/;
var TYPE  = /^@param \{([^}]+)\}.*$/;
var DEF   = /^@param .*?\[default= ([^\]]+)\].*$/;

var getDescription = require('./get-description');

/** @type {number} */
var index;

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;
  /** @type {string} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  index = 0;
  lines = pruneLines(lines);
  params = buildParams(lines);
  result = '';
  len = params.length;
  i = -1;
  while (++i < len) result += getParam(params[i]);
  return result;
};

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
function getParam(lines) {

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

  param = lines[0].replace(PARAM, '$1');
  type  = lines[0].replace(TYPE,  '$1');
  prop  = param.includes('.');
  def   = getDefault(lines, prop ? 3 : 2);
  desc  = getDescrip(lines, prop ? 3 : 2);
  intro = prop ? '    - ' : '  ' + (++index) + '. ';
  return intro + '**' + param + '**  <i>` ' + type + ' `</i>\n' + def + desc;
}

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
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  lines = lines.slice(0, -1);
  len = lines.length;
  i = -1;
  while ( ++i < len && (start === undefined || end === undefined) ) {
    if ( /^@public/.test(lines[i]) ) start = i + 1;
    if ( /^@return/.test(lines[i]) ) end = i;
  }
  return lines.slice(start, end);
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
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  params = [];
  start = 0;
  len = lines.length;
  i = 0;
  while (++i < len) {
    if ( !/^@param/.test(lines[i]) ) continue;
    param = lines.slice(start, i);
    params.push(param);
    start = i;
  }
  param = lines.slice(start);
  params.push(param);
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

  if ( !DEF.test(lines[0]) ) return '';

  indent = getIndent(indents);
  def = lines[0].replace(DEF, '$1');
  return '\n' + indent + 'default value: ` ' + def + ' `\n';
}

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} indents
 * @return {string}
 */
function getDescrip(lines, indents) {

  /** @type {string} */
  var desc;

  desc = getDescription(lines, indents);
  return desc && '\n' + desc + '\n';
}

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
