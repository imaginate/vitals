/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseElement
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 * @const {!Object<string, function>}
 */
var IS = require('../../../../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var OPEN = /^ *```([a-zA-Z0-9]*)$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getSpace = require('../../get-space.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGE = IS.greaterOrEqual;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {string} line
 * @param {string} indent
 * @return {boolean}
 */
function isValidClose(line, indent) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp('^' + indent + '```$');
  return pattern.test(line);
}

/**
 * @private
 * @param {number} depth
 * @return {string}
 */
var mkIndent = require('../../mk-indent.js').construct(8);

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
module.exports = function parseElement(lines, depth) {

  /** @type {!RegExp} */
  var pattern;
  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var line;
  /** @type {number} */
  var last;
  /** @type {number} */
  var i;

  last = lines.length - 1;
  indent = getSpace(lines[0]);

  if ( !isGE(last, 1) )
    throw new Error('invalid `code block` for `' + lines[0] + '` (missing a closing)');
  if ( !OPEN.test(lines[0]) )
    throw new Error('invalid `code block` opening in `' + lines[0] + '`');
  if ( !isValidClose(lines[last], indent) )
    throw new Error('invalid `code block` closing in `' + lines[last] + '`');

  result = '\n\n';

  pattern = new RegExp('^' + indent);
  indent = mkIndent(depth);

  line = lines[0].replace(OPEN, '$1');
  line = line || 'javascript';
  result += indent + '```' + line + '\n';

  i = 0;
  while ( isLT(++i, last) ) {
    line = lines[i];

    if ( !pattern.test(line) )
      throw new Error('invalid `line` indention for `' + line + '`');

    line = line.replace(pattern, '');
    result += indent + line + '\n';
  }
  result += indent + '```\n';
  return result;
};
