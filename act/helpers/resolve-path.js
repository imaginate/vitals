/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: resolvePath
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
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

/**
 * @private
 * @const {!Object<string, function>}
 */
var PATH = require('path');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @note Older node.js versions such as v0.10 required a `path' parameter.
 *   Where newer node.js versions such as v7.9 did not require a parameter.
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
 * @private
 * @param {...string} path
 * @return {string}
 */
var _resolvePath = PATH.resolve;

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = require('./clean-path.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {(!Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
var sliceArray = require('./slice-array.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStrings = IS.strings;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
module.exports = function resolvePath(path) {

  /** @type {string} */
  var cwd;

  cwd = process.cwd();

  if ( isGT(arguments.length, 1) )
    path = sliceArray(arguments);

  if ( isUndefined(path) )
    path = cwd;
  else if ( isString(path) )
    path = _resolvePath(cwd, path);
  else if ( !isStrings(path) )
    throw new TypeError('invalid `path` type (must be an array of strings or a string)');
  else {
    if ( !isArray(path) )
      path = sliceArray(path);
    path.unshift(cwd);
    path = _resolvePath.apply(null, path);
  }
  return cleanPath(path);
};
