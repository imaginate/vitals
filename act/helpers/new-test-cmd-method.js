/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmdMethod
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @typedef {function} TestCmdMethod
 */

var log = require('log-ocd')();
var is = require('./is');

log.debug.setFormat({
  'linesBefore': 2,
  'linesAfter':  0
});

/**
 * @param {boolean} start - start or close
 * @param {string=} name - the name to log
 * @param {?function=} callback
 * @return {!TestCmdMethod}
 */
module.exports = function newTestCmdMethod(start, name, callback) {

  /** @type {function} */
  var logger;
  /** @type {string} */
  var msg;

  if ( is.func(name) ) {
    callback = name;
    name = undefined;
  }

  if (name) {
    logger = start ? log.debug : log.pass;
    msg = start ? 'Starting' : 'Finished';
    msg = msg + ' `' + name + '` tests';
  }

  return function testCmdMethod() {
    msg && logger(msg);
    callback && callback();
  };
};
