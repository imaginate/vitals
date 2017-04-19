/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: BlockElements
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {{
 *   end:   function(!Array<string>, number): number,
 *   id:    string,
 *   parse: function(!Array<string>, number): string,
 *   test:  function(string): boolean
 * }} BlockElement
 */

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var BLOCK_ELEM_DIR = __dirname;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid dirnames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute dirpaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   A pattern for matching valid dirnames.
 * @param {?RegExp=} opts.invalid = `/^\.git|\.bak|node_modules|vendor|tmp|logs?$/`
 *   A pattern for matching invalid dirnames.
 * @return {!Array<string>}
 */
var getDirpaths = require('../../../../get-dirpaths.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('../../../../resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @return {!Object<string, !BlockElement>}
 */
function mkBlockElems(dirpath) {

  /** @type {!Object<string, !BlockElement>} */
  var elems;
  /** @type {!Array<string>} */
  var paths;
  /** @type {!BlockElement} */
  var elem;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  elems = {};
  paths = getDirpaths(dirpath, {
    deep:  false,
    full:  true,
    valid: /^[a-z]+$/
  });
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    path = resolvePath(paths[i], './index.js');
    elem = require(path);
    elems[elem.id] = elem;
  }
  return elems;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Object<string, !BlockElement>}
 */
module.exports = mkBlockElems(BLOCK_ELEM_DIR);
