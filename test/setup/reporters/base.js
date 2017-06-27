/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS MOCHA REPORTER: base
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var chalk = require('chalk');

var Mocha = require('mocha');
var Runnable = Mocha.Runnable;
var Suite = Mocha.Suite;
var Base = Mocha.reporters.Base;
var ms = require('mocha/lib/ms.js');

module.exports = Base;

/**
 * Replace `Runnable.prototype.fullTitle`.
 *
 * @private
 * @return {string}
 */
Runnable.prototype.fullTitle = function fullTitle() {
  return this.parent.fullTitle() + ' -> ' + this.title;
};

/**
 * Replace `Suite.prototype.fullTitle`.
 *
 * @private
 * @return {string}
 */
Suite.prototype.fullTitle = function fullTitle() {

  /** @type {string} */
  var title;

  title = this.parent ? this.parent.fullTitle() || '' : '';
  title += title && ' -> ';
  title += this.title;
  return title;
};

/**
 * Replace `Base.list`.
 *
 * @private
 * @param {Array} failures
 */
Base.list = function list(failures) {

  /** @type {!Error} */
  var error;
  /** @type {string} */
  var title;
  /** @type {!Object} */
  var test;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  console.log(); // log empty line

  i = -1;
  len = failures.length;
  last = len - 1;
  while (++i < len) {

    test = failures[i];

    title = '  ' + (i + 1) + ') ' + test.fullTitle();
    log.fail(title);

    error = test.err;

    if ( !is.error(error) ) {
      error = new Error();
      error.name = test.err.name;
      error.message = test.err.message;
      error.stack = test.err.stack;
    }

    if (i === last) log.error.setFormat({ 'linesAfter': 0 });

    log.error(error);
  }
};

/**
 * Replace `Base.prototype.epilogue`.
 *
 * @private
 * @type {function}
 */
Base.prototype.epilogue = function epilogue() {

  /** @type {number} */
  var indents;
  /** @type {!Object} */
  var stats;
  /** @type {string} */
  var time;
  /** @type {string} */
  var msg;

  stats = this.stats;

  console.log();

  time = ms(stats.duration);
  time = ' (' + time + ')';
  time = chalk.white.bold(time);
  msg = ' ' + (stats.passes || 0) + ' passing';
  msg = chalk.green.bold(msg);
  msg = ' ' + msg + time;
  console.log(msg);

  if (stats.pending) {
    msg = '  ' + stats.pending + ' pending';
    msg = chalk.yellow.bold(msg);
    console.log(msg);
  }

  if (stats.failures) {
    msg = '  ' + stats.failures + ' failing';
    msg = chalk.red.bold(msg);
    console.log(msg);
    Base.list(this.failures);
  }

  console.log();
};
