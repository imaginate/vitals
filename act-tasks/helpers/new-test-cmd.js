/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @typedef {function} TestCmdMethod
 *
 * @typedef {{
 *   __CMD:  boolean,
 *   start:  !TestCmdMethod,
 *   close:  !TestCmdMethod,
 *   slow:   ?Array,
 *   colors: ?string,
 *   deep:   ?string,
 *   report: !Array,
 *   grep:   ?Array,
 *   setup:  !Array,
 *   test:   string
 * }} TestCmd
 */

var is = require('./is');

var REPORT_DIR = 'test/setup/reporters';
var SETUP_DIR  = './test/setup';
var TESTS_DIR  = './test/methods';

var DEFAULT_REPORT = 'spec';
var DEFAULT_SLOW   = 5; // ms
var DEFAULT_SETUP  = 'methods';

/**
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start  - [default= null]
 * @param {?TestCmdMethod=} opts.close  - [default= null]
 * @param {boolean=} opts.colors    - [default= true]
 * @param {boolean=} opts.recursive - [default= true]
 * @param {string=} opts.reporter   - [default= "spec"]
 * @param {string=} opts.grep       - [default= ""]
 * @param {number=} opts.slow       - [default= 5]
 * @param {string=} opts.setup      - [default= "methods"]
 * @param {string=} opts.method     - [default= ""] Test only a specific method.
 * @param {string=} opts.submethod  - [default= ""] Test only a specific submethod.
 * @return {!TestCmd}
 */
module.exports = function newTestCmd(opts) {

  /** @type {!TestCmd} */
  var cmd;

  if (opts && opts.__CMD) return opts;

  opts = parseOpts(opts);
  cmd = { '__CMD': true };
  cmd.colors = opts.colors;
  cmd.deep = opts.deep;
  cmd = addCmdMethods(cmd, opts.start, opts.close);
  cmd = addReporter(cmd, opts.reporter);
  cmd = addSetup(cmd, opts.setup);
  cmd = addGrep(cmd, opts.grep);
  cmd = addSlow(cmd, opts.slow);
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
  opts.submethod = is.str(opts.submethod)   ? opts.submethod : null;
  opts.reporter  = is.str(opts.reporter)    ? opts.reporter  : DEFAULT_REPORT;
  opts.reporter  = opts.reporter            ? opts.reporter  : DEFAULT_REPORT;
  opts.method    = is.str(opts.method)      ? opts.method    : null;
  opts.colors    = false === opts.colors    ? null           : '--colors';
  opts.setup     = is.str(opts.setup)       ? opts.setup     : DEFAULT_SETUP;
  opts.setup     = opts.setup               ? opts.setup     : DEFAULT_SETUP;
  opts.slow      = is.num(opts.slow)        ? opts.slow      : DEFAULT_SLOW;
  opts.slow      = opts.slow >= 1           ? opts.slow      : DEFAULT_SLOW;
  opts.grep      = is.str(opts.grep)        ? opts.grep      : null;
  opts.deep      = false === opts.recursive ? null           : '--recursive';
  opts.deep      = opts.submethod           ? null           : opts.deep;
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
 * @param {string} report
 * @return {!TestCmd}
 */
function addReporter(cmd, report) {
  report = addJSExt(report);
  report = REPORT_DIR + '/' + report;
  if ( !is.file(report) ) throw new ReferenceError('invalid test reporter file');
  cmd.report = [ '--reporter', report ];
  return cmd;
}

/**
 * @private
 * @param {!TestCmd} cmd
 * @param {string} setup
 * @return {!TestCmd}
 */
function addSetup(cmd, setup) {
  setup = addJSExt(setup);
  setup = SETUP_DIR + '/' + setup;
  if ( !is.file(setup) ) throw new ReferenceError('invalid test setup file');
  cmd.setup = [ '--require', setup ];
  return cmd;
}

/**
 * @private
 * @param {!TestCmd} cmd
 * @param {?string} grep
 * @return {!TestCmd}
 */
function addGrep(cmd, grep) {
  cmd.grep = grep ? [ '--grep', grep ] : null;
  return cmd;
}

/**
 * @private
 * @param {!TestCmd} cmd
 * @param {number} slow
 * @return {!TestCmd}
 */
function addSlow(cmd, slow) {
  slow = is.whole(slow) ? slow : Math.round(slow);
  cmd.slow = [ '--slow', String(slow) ];
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

  if (submethod) {
    path += slashDir(method) + addJSExt(submethod);
    if ( !is.file(path) ) throw new ReferenceError('invalid test file');
  }
  else {
    path += method || '';
    if ( !is.dir(path) ) throw new ReferenceError('invalid test directory');
  }
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
