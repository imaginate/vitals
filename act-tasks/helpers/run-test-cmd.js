/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: runTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('./is');
var cp = require('child_process');
var log = require('log-ocd')();
var newTestCmd = require('./new-test-cmd');

log.error.setConfig({
  'throw': false,
  'exit':  true
});

var MOCHA = './node_modules/mocha/bin/mocha';

/**
 * @param {(?Object|TestCmd)} vals
 * @param {?TestCmdMethod=} vals.start  - [default= null]
 * @param {?TestCmdMethod=} vals.close  - [default= null]
 * @param {boolean=} vals.colors    - [default= true]
 * @param {boolean=} vals.recursive - [default= true]
 * @param {string=} vals.reporter   - [default= DEFAULTS.reporter]
 * @param {string=} vals.grep       - [default= ""]
 * @param {string=} vals.setup      - [default= DEFAULTS.setup]
 * @param {string=} vals.method     - [default= ""] Test only a specific method.
 */
module.exports = function runTestCmd(vals) {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;
  /** @type {!TestCmd} */
  var cmd;

  cmd = newTestCmd(vals);

  args = [ MOCHA ];
  args = addArg(args, cmd.colors);
  args = addArg(args, cmd.slow);
  args = addArg(args, cmd.reporter);
  args = addArg(args, cmd.recursive);
  args = addArg(args, cmd.grep);
  args = addArg(args, cmd.setup);
  args = addArg(args, cmd.test);

  opts = { 'stdio': 'inherit' };

  cmd.start();

  try {
    child = cp.spawn('node', args, opts);
    child.on('close', cmd.close);
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = 'Internal `test` ' + err.name;
    log.error(err);
  }
};

/**
 * @private
 * @param {!Array<string>} args
 * @param {(?string|Array)} arg
 * @return {!Array<string>}
 */
function addArg(args, arg) {

  if ( is.arr(arg) ) return args.concat(arg);

  if (arg) args.push(arg);
  return args;
}
