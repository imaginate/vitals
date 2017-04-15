/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @typedef {function} TestCmdMethod
 *
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

var is = require('./is');

var TESTS_DIR  = 'test/methods';

var DEFAULT_REPORT = 'specky';
var DEFAULT_SLOW   = 5; // ms
var DEFAULT_SETUP  = 'methods';

/**
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start  - [default= null]
 * @param {?TestCmdMethod=} opts.close  - [default= null]
 * @param {string=} opts.reporter  - [default= "specky"]
 * @param {number=} opts.slow      - [default= 5]
 * @param {string=} opts.setup     - [default= "methods"]
 * @param {string=} opts.method    - [default= ""] Test only a specific method.
 * @param {string=} opts.section   - [default= ""] Test only a specific section.
 * @param {string=} opts.submethod - [default= ""] Test only a specific submethod.
 * @return {!TestCmd}
 */
module.exports = function newTestCmd(opts) {

  /** @type {!TestCmd} */
  var cmd;

  if (opts && opts.__CMD) return opts;

  opts = parseOpts(opts);
  cmd = { '__CMD': true };
  cmd.section = opts.section;
  cmd.report = opts.reporter;
  cmd.setup = addJSExt(opts.setup);
  cmd.slow = String(opts.slow);
  cmd.dir = !opts.submethod;
  cmd = addCmdMethods(cmd, opts.start, opts.close);
  cmd = addTest(cmd, opts.method, opts.submethod);
  return cmd;
};

/**
 * @private
 * @param {Object} opts
 * @return {!Object}
 */
function parseOpts(opts) {
  opts = opts || {};
  opts.submethod = is.str(opts.submethod)  ? opts.submethod : '';
  opts.reporter  = is.str(opts.reporter)   ? opts.reporter  : DEFAULT_REPORT;
  opts.reporter  = opts.reporter           ? opts.reporter  : DEFAULT_REPORT;
  opts.section   = is.str(opts.section)    ? opts.section   : '';
  opts.method    = is.str(opts.method)     ? opts.method    : '';
  opts.setup     = is.str(opts.setup)      ? opts.setup     : DEFAULT_SETUP;
  opts.setup     = opts.setup              ? opts.setup     : DEFAULT_SETUP;
  opts.slow      = is.num(opts.slow)       ? opts.slow      : DEFAULT_SLOW;
  opts.slow      = opts.slow >= 1          ? opts.slow      : DEFAULT_SLOW;
  return opts;
}

/**
 * @private
 * @param {!TestCmd} cmd
 * @param {?TestCmdMethod=} start
 * @param {?TestCmdMethod=} close
 * @return {!TestCmd}
 */
function addCmdMethods(cmd, start, close) {
  cmd.start = is.func(start) ? start : function start(){};
  cmd.close = is.func(close) ? close : function close(){};
  return cmd;
}

/**
 * @private
 * @param {!TestCmd} cmd
 * @param {?string} method
 * @param {?string} submethod
 * @return {!TestCmd}
 */
function addTest(cmd, method, submethod) {

  /** @type {string} */
  var path;

  path = slashDir(TESTS_DIR);
  path += method ? slashDir(method) : '';

  if (submethod) {
    path += addJSExt(submethod);
    if ( !is.file(path) ) throw new ReferenceError('invalid test file');
  }
  else if ( !is.dir(path) ) throw new ReferenceError('invalid test directory');

  cmd.test = path;
  return cmd;
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function addJSExt(filepath) {
  return /\.js$/.test(filepath)
    ? filepath
    : filepath + '.js';
}

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
function slashDir(dirpath) {
  return dirpath.replace(/[^\/]$/, '$&/');
}
