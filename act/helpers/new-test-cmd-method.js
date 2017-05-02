/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newTestCmdMethod
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
 * @typedef {function} TestCmdMethod
 */

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
var LOG = require('log-ocd')();

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} header
 * @param {...*} val
 * @return {boolean}
 */
var logClose = LOG.pass;

logClose.setConfig({
  'header': true,
  'throw': false,
  'exit': false,
  'msg': false
});

logClose.setFormat({
  'linesBefore': 1,
  'linesAfter': 1
});

/**
 * @private
 * @param {string} header
 * @param {...*} val
 * @return {boolean}
 */
var logStart = LOG.debug;

logStart.setConfig({
  'header': true,
  'throw': false,
  'exit': false,
  'msg': false
});

logStart.setFormat({
  'linesBefore': 2,
  'linesAfter': 0
});

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {boolean} start
 *   If `true`, it is a start method. If `false`, it is a close method.
 * @param {string=} name
 *   The name to log.
 * @param {?function=} callback
 * @return {!TestCmdMethod}
 */
module.exports = function newTestCmdMethod(start, name, callback) {

  /** @type {function} */
  var logger;
  /** @type {string} */
  var msg;

  if ( isFunction(name) ) {
    callback = name;
    name = undefined;
  }

  if (name) {
    logger = start
      ? logStart
      : logClose;
    msg = start
      ? 'Starting'
      : 'Finished';
    msg += ' `' + name + '` tests';
  }

  /**
   * @private
   * @const {boolean}
   */
  var CALLBACK = isFunction(callback);

  /**
   * @private
   * @const {boolean}
   */
  var LOGGER = isFunction(logger) && !!msg && isString(msg);

  return function testCmdMethod() {
    LOGGER && logger(msg);
    CALLBACK && callback();
  };
};
