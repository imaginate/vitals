/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: MOCHA REPORTER
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

// globally append all helpers
require('../helpers.js');

// get the Runnable constructor
var Runnable = require('../../../node_modules/mocha/lib/runnable.js');

/**
 * Replace the fullTitle method with a different separator.
 * @return {string}
 */
Runnable.prototype.fullTitle = function() {
  return this.parent.fullTitle() + ' -> ' + this.title;
};

// get the reporter base
var Base = require('../../../node_modules/mocha/lib/reporters/base.js');
var ms = require('../../../node_modules/mocha/lib/ms.js');

/**
 * Replace the Base color method.
 * @param {number} key
 * @param {string} str
 * @param {boolean=} bold
 * @return {string}
 */
Base.color = color;

/**
 * Replace the Base reporter list method.
 * @param {Array} failures
 */
Base.list = function(failures) {

  /** @type {number} */
  var len;

  console.log(); // log empty line

  len = failures.length;
  each(failures, function(test, i) {

    /** @type {!Error} */
    var error;
    /** @type {string} */
    var title;

    title = test.fullTitle();
    title = fuse('  ', ++i, ') ', title);
    log.fail(title);

    error = test.err;

    if ( !is.error(error) ) {
      error = new Error();
      error.name = test.err.name;
      error.message = test.err.message;
      error.stack = test.err.stack;
    }

    if ( is.same(i, len) ) log.error.setFormat({ 'linesAfter': 0 });

    log.error(error);
  });
};

/**
 * Replace common output used by Spec.
 * @type {function}
 */
Base.prototype.epilogue = function() {

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
  time = fuse(' (', time, ')');
  time = color(7, time, true);
  msg = fuse(' ', stats.passes || 0, ' passing');
  msg = color(2, msg, true);
  msg = fuse(' ', msg, time);
  console.log(msg);

  if (stats.pending) {
    msg = fuse('  ', stats.pending, ' pending');
    msg = color(3, msg);
    console.log(msg);
  }

  if (stats.failures) {
    msg = fuse('  ', stats.failures, ' failing');
    msg = color(1, msg, true);
    console.log(msg);
    Base.list(this.failures);
  }

  console.log();
};

/**
 * @private
 * @param {number} key
 * @param {string} str
 * @param {boolean=} bold
 * @return {string}
 */
function color(key, str, bold) {
  return Base.useColors
    ? bold
      ? fuse('\u001b[3', key, ';1m', str, '\u001b[39;0m')
      : fuse('\u001b[3', key, 'm', str, '\u001b[39m')
    : str;
}

module.exports = Base;
