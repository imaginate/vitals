/**
 * ---------------------------------------------------------------------------
 * REPORTER-BASE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const CHALK
/**
 * @private
 * @const {!Object}
 * @struct
 */
var CHALK = require('chalk');
/// #}}} @const CHALK

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {Array}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isEQ
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isEQ = IS.equalTo;
/// #}}} @func isEQ

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {Error}
 */
var isError = IS.error;
/// #}}} @func isError

/// #}}} @group IS

/// #{{{ @group MOCHA

/// #{{{ @func Mocha
/**
 * @private
 * @param {?Object=} options
 * @constructor
 */
var Mocha = require('mocha');
/// #}}} @func Mocha

/// #{{{ @func Base
/**
 * @public
 * @param {Runner} runner
 * @constructor
 */
var Base = Mocha.reporters.Base;
/// #}}} @func Base

/// #{{{ @func Runnable
/**
 * @private
 * @param {string} title
 * @param {Function} fn
 * @constructor
 */
var Runnable = Mocha.Runnable;
/// #}}} @func Runnable

/// #{{{ @func Suite
/**
 * @private
 * @param {string} title
 * @param {Context} parentContext
 * @constructor
 */
var Suite = Mocha.Suite;
/// #}}} @func Suite

/// #{{{ @func ms
/**
 * @private
 * @param {(string|number)} val
 * @param {?Object=} options
 * @return {(string|number)}
 */
var ms = require('mocha/lib/ms.js');
/// #}}} @func ms

/// #}}} @group MOCHA

/// #{{{ @group OBJECT

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group REPLACEMENTS
//////////////////////////////////////////////////////////////////////////////
// REPLACEMENTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Base.list
/**
 * @public
 * @param {!Array<!Test>} failures
 * @return {void}
 */
Base.list = function list(failures) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var title;
  /** @type {number} */
  var last;
  /** @type {!Error} */
  var err;
  /** @type {!Function} */
  var log;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isArray(failures) ) {
    throw setTypeError(new TypeError, 'failures', '!Array');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-global-refs

  log = global.VITALS_TEST.LOG;

  /// #}}} @step set-global-refs

  /// #{{{ @step log-empty-line

  console.log();

  /// #}}} @step log-empty-line

  /// #{{{ @step log-each-failed-test

  last = failures.length - 1;
  forEachProperty(failures, function (test, i) {

    title = '  ' + (i + 1) + ') ' + test.fullTitle();
    log.fail(title);

    err = test.err;

    if ( !isError(err) ) {
      err = new Error();
      err.name = test.err.name;
      err.message = test.err.message;
      err.stack = test.err.stack;
    }

    err.msg = test.err.message;
    err.unitTest = true;

    if ( isEQ(i, last) ) {
      log.error.setFormat({
        'linesAfter': 0
      });
    }

    log.error(err);
  });

  /// #}}} @step log-each-failed-test
};
/// #}}} @func Base.list

/// #{{{ @func Base.prototype.epilogue
/**
 * @private
 * @this {!Base}
 * @return {void}
 */
Base.prototype.epilogue = function epilogue() {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var indents;
  /** @type {!Object} */
  var stats;
  /** @type {string} */
  var time;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  stats = this.stats;

  /// #}}} @step set-member-refs

  /// #{{{ @step log-empty-line

  console.log();

  /// #}}} @step log-empty-line

  /// #{{{ @step make-performance-summary

  time = ms(stats.duration);
  time = ' (' + time + ')';
  time = CHALK.white.bold(time);

  /// #}}} @step make-performance-summary

  /// #{{{ @step log-passing-summary

  msg = ' ' + (stats.passes || 0) + ' passing';
  msg = CHALK.green.bold(msg);
  msg = ' ' + msg + time;
  console.log(msg);

  /// #}}} @step log-passing-summary

  /// #{{{ @step log-pending-summary

  if (stats.pending) {
    msg = '  ' + stats.pending + ' pending';
    msg = CHALK.yellow.bold(msg);
    console.log(msg);
  }

  /// #}}} @step log-pending-summary

  /// #{{{ @step log-failing-summary

  if (stats.failures) {
    msg = '  ' + stats.failures + ' failing';
    msg = CHALK.red.bold(msg);
    console.log(msg);
    Base.list(this.failures);
  }

  /// #}}} @step log-failing-summary

  /// #{{{ @step log-empty-line

  console.log();

  /// #}}} @step log-empty-line
};
/// #}}} @func Base.prototype.epilogue

/// #{{{ @func Runnable.prototype.fullTitle
/**
 * @private
 * @this {!Runnable}
 * @return {string}
 */
Runnable.prototype.fullTitle = function fullTitle() {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var title;

  /// #}}} @step declare-variables

  /// #{{{ @step make-full-title

  if (this.parent) {
    title = this.parent.fullTitle();
  }

  title = !!title
    ? title + ' -> '
    : '';
  title += this.title;

  /// #}}} @step make-full-title

  /// #{{{ @step return-full-title

  return title;

  /// #}}} @step return-full-title
};
/// #}}} @func Runnable.prototype.fullTitle

/// #{{{ @func Suite.prototype.fullTitle
/**
 * @private
 * @this {!Suite}
 * @return {string}
 */
Suite.prototype.fullTitle = function fullTitle() {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var title;

  /// #}}} @step declare-variables

  /// #{{{ @step make-full-title

  if (this.parent) {
    title = this.parent.fullTitle();
  }

  title = !!title
    ? title + ' -> '
    : '';
  title += this.title;

  /// #}}} @step make-full-title

  /// #{{{ @step return-full-title

  return title;

  /// #}}} @step return-full-title
};
/// #}}} @func Suite.prototype.fullTitle

/// #}}} @group REPLACEMENTS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Base;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
