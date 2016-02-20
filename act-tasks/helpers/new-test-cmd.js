/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/**
 * @typedef {function} TestCmdMethod
 *
 * @typedef {{
 *   __CMD:     boolean,
 *   start:     !TestCmdMethod,
 *   close:     !TestCmdMethod,
 *   slow:      ?Array,
 *   colors:    ?string,
 *   recursive: ?string,
 *   reporter:  !Array,
 *   grep:      ?Array,
 *   setup:     !Array,
 *   method:    string
 * }} TestCmd
 */

var is = require('./is');

var REPORTER  = 'test/setup/reporters';
var SETUP_DIR = './test/setup';
var TESTS_DIR = './test/methods';
var SLOW_TEST = 5; // ms

/**
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start  - [default= null]
 * @param {?TestCmdMethod=} opts.close  - [default= null]
 * @param {boolean=} opts.colors    - [default= true]
 * @param {boolean=} opts.recursive - [default= true]
 * @param {string=} opts.reporter   - [default= "index"]
 * @param {string=} opts.grep       - [default= ""]
 * @param {number=} opts.slow       - [default= SLOW_TEST]
 * @param {string=} opts.setup      - [default= "methods"]
 * @param {string=} opts.method     - [default= ""] Test only a specific method.
 * @return {!TestCmd}
 */
module.exports = function newTestCmd(opts) {

  /** @type {!TestCmd} */
  var cmd;

  if (opts && opts.__CMD) return opts;

  opts = opts || {};
  cmd = {
    'start':     is.func(opts.start) ? opts.start : function(){},
    'close':     is.func(opts.close) ? opts.close : function(){},
    'colors':    opts.colors === false    ? null  : '--colors',
    'recursive': opts.recursive === false ? null  : '--recursive',
    'reporter':  is.str(opts.reporter) ? opts.reporter : 'index',
    'grep':      is.str(opts.grep)     ? opts.grep     : null,
    'slow':      is.num(opts.slow)     ? opts.slow     : SLOW_TEST,
    'setup':     is.str(opts.setup)    ? opts.setup    : 'methods',
    'method':    is.str(opts.method)   ? opts.method   : null
  };
  cmd.reporter = addJSExt(cmd.reporter || 'index');
  cmd.reporter = REPORTER + '/' + cmd.reporter;
  cmd.reporter = [ '--reporter', cmd.reporter ];
  cmd.grep = cmd.grep && [ '--grep', cmd.grep ];
  cmd.slow = cmd.slow > 0 ? cmd.slow : null;
  cmd.slow = cmd.slow && [ '--slow', String(cmd.slow) ];
  cmd.setup = addJSExt(cmd.setup, 'methods');
  cmd.setup = SETUP_DIR + '/' + cmd.setup;
  cmd.setup = [ '--require', cmd.setup ];
  cmd.test = cmd.method ? TESTS_DIR + '/' + cmd.method : TESTS_DIR;
  cmd.__CMD = true;
  return cmd;
};

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
