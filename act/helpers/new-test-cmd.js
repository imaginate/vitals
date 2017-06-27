/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function} TestCmdMethod
 */

/**
 * @typedef {{
 *   __CMD:   boolean,
 *   start:   !TestCmdMethod,
 *   close:   !TestCmdMethod,
 *   report:  string,
 *   slow:    string,
 *   dir:     boolean,
 *   section: string,
 *   setup:   string,
 *   test:    string
 * }} TestCmd
 */

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var DEFAULT_REPORTER = 'specky';

/**
 * @private
 * @const {string}
 */
var DEFAULT_SETUP = 'methods';

/**
 * @private
 * @const {number}
 */
var DEFAULT_SLOW = 5; // ms

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var appendFileExtJS = require('./append-file-ext.js').construct('.js');

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var appendSlash = require('./append-slash.js');

/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;

/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;

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
function isTestCmd(val) {
  return isObject(val) && (val.__CMD === true);
}

/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var REPO_DIR = require('./get-repo-root.js')();

/**
 * @private
 * @const {string}
 */
var TEST_DIR = appendSlash( resolvePath(REPO_DIR, './test/methods') );

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @param {string} submethod
 * @return {string}
 */
function mkTestPath(method, submethod) {

  /** @type {string} */
  var path;

  path = TEST_DIR;

  if (method)
    path += appendSlash(method);

  if (submethod) {
    path += appendFileExtJS(submethod);
    if ( !isFile(path) )
      throw new ReferenceError('invalid test file path `' + path + '`');
  }
  else if ( !isDirectory(path) )
    throw new ReferenceError('invalid test directory path `' + path + '`');

  return path;
}

/**
 * @private
 * @param {!Object} opts
 * @return {!Object}
 */
function parseOpts(opts) {

  if ( !isString(opts.submethod) )
    opts.submethod = '';

  if ( !isString(opts.reporter) || !opts.reporter )
    opts.reporter = DEFAULT_REPORTER;

  if ( !isString(opts.section) )
    opts.section = '';

  if ( !isString(opts.method) )
    opts.method = '';

  if ( !isString(opts.setup) || !opts.setup )
    opts.setup = DEFAULT_SETUP;

  if ( !isNumber(opts.slow) || !isWholeNumber(opts.slow) || isLT(opts.slow, 1) )
    opts.slow = DEFAULT_SLOW;

  if ( !isFunction(opts.start) )
    opts.start = function start(){};

  if ( !isFunction(opts.close) )
    opts.close = function close(){};

  return opts;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start = `null`
 * @param {?TestCmdMethod=} opts.close = `null`
 * @param {string=} opts.reporter = `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {string=} opts.setup = `"methods"`
 * @param {string=} opts.method = `""`
 *   Test only a specific method.
 * @param {string=} opts.section = `""`
 *   Test only a specific section.
 * @param {string=} opts.submethod = `""`
 *   Test only a specific submethod.
 * @return {!TestCmd}
 */
module.exports = function newTestCmd(opts) {

  if ( isTestCmd(opts) )
    return opts;

  if ( !isObject(opts) )
    opts = {};

  opts = parseOpts(opts);
  return {
    '__CMD': true,
    'section': opts.section,
    'report': opts.reporter,
    'start': opts.start,
    'close': opts.close,
    'setup': appendFileExtJS(opts.setup),
    'test': mkTestPath(opts.method, opts.submethod),
    'slow': opts.slow.toString(),
    'dir': !opts.submethod
  };
};
