/**
 * ---------------------------------------------------------------------------
 * SPECKY REPORTER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 *
 * @file
 *   This file is a modified version of the Mocha
 *   [spec reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js).
 * @copyright 2011 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const ALIAS
/**
 * @private
 * @const {!RegExp}
 */
var ALIAS = /^[^)]+\) \(alias:([a-zA-Z.]+)\)$/;
/// #}}} @const ALIAS

/// #{{{ @const CHALK
/**
 * @private
 * @const {!Object}
 */
var CHALK = require('chalk');
/// #}}} @const CHALK

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const METHOD
/**
 * @private
 * @const {!RegExp}
 */
var METHOD = /^vitals\.([a-zA-Z.]+) \([^)]+\)$/;
/// #}}} @const METHOD

/// #{{{ @const OK
/**
 * @private
 * @const {string}
 */
var OK = CHALK.green(loadHelper('reporter-base').symbols.ok);
/// #}}} @const OK

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
var setError = loadHelper('set-error');
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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isLT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;
/// #}}} @func isLT

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeIndent
/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function makeIndent(indents) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var indent;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'indents');
  }
  if ( !isNumber(indents) ) {
    throw setTypeError(new TypeError, 'indents', 'number');
  }
  if ( !isWholeNumber(indents) ) {
    throw setWholeError(new RangeError, 'indents', indents);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-indent-count

  if ( isLT(indents, 1) ) {
    return '';
  }

  /// #}}} @step check-indent-count

  /// #{{{ @step make-indentation

  indent = '';
  while (indents--) {
    indent += '  ';
  }

  /// #}}} @step make-indentation

  /// #{{{ @step return-indentation

  return indent;

  /// #}}} @step return-indentation
}
/// #}}} @func makeIndent

/// #}}} @group MAKE

/// #{{{ @group MOCHA

/// #{{{ @func Base
/**
 * @public
 * @param {Runner} runner
 * @constructor
 */
var Base = loadHelper('reporter-base');
/// #}}} @func Base

/// #}}} @group MOCHA

/// #{{{ @group OBJECT

/// #{{{ @func inherits
/**
 * @private
 * @param {!Function} toConstructor
 * @param {!Function} fromConstructor
 * @return {!Function}
 */
var inherits = require('util').inherits;
/// #}}} @func inherits

/// #}}} @group OBJECT

/// #{{{ @group STRING

/// #{{{ @func breakString
/**
 * @private
 * @param {string} src
 * @param {number=} indent = `0`
 * @return {string}
 */
var breakString = loadHelper('break-string');
/// #}}} @func breakString

/// #{{{ @func getMethod
/**
 * @private
 * @param {string} title
 * @return {string}
 */
function getMethod(title) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'title');
  }
  if ( !isString(title) ) {
    throw setTypeError(new TypeError, 'title', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-method

  return ALIAS.test(title)
    ? title.replace(ALIAS, '$1')
    : title.replace(METHOD, '$1');

  /// #}}} @step return-method
}
/// #}}} @func getMethod

/// #{{{ @func indentString
/**
 * @private
 * @param {string} src
 * @param {number=} count = `0`
 * @return {string}
 */
var indentString = loadHelper('indent-string');
/// #}}} @func indentString

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group REPORTER
//////////////////////////////////////////////////////////////////////////////
// REPORTER
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Specky
/**
 * @public
 * @param {Runner} runner
 * @constructor
 */
function Specky(runner) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var indents;
  /** @type {string} */
  var method;
  /** @type {number} */
  var fails;
  /** @type {!Specky} */
  var self;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Specky) ) {
    throw setNewError(new SyntaxError, 'Specky');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'runner');
  }
  if ( !isObject(runner) ) {
    throw setTypeError(new TypeError, 'runner', '!Runner');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step run-base-constructor

  Base.call(this, runner);

  /// #}}} @step run-base-constructor

  /// #{{{ @step set-this-reference

  self = this;

  /// #}}} @step set-this-reference

  /// #{{{ @step set-initial-indent-count

  indents = -1;

  /// #}}} @step set-initial-indent-count

  /// #{{{ @step set-initial-failure-count

  fails = 0;

  /// #}}} @step set-initial-failure-count

  /// #{{{ @event start

  runner.on('start', function logUnitTestStart() {
    console.log();
  });

  /// #}}} @event start

  /// #{{{ @event suite

  runner.on('suite', function logSuiteTestStart(suite) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var msg;

    /// #}}} @step declare-variables

    /// #{{{ @step increase-indent-count

    ++indents;

    /// #}}} @step increase-indent-count

    /// #{{{ @step check-no-indent

    if (!indents) {
      return;
    }

    /// #}}} @step check-no-indent

    /// #{{{ @step log-suite-title

    msg = suite.title;

    if (suite.main) {
      method = getMethod(msg);
    }
    else {
      msg = breakString(msg, indents);
    }

    msg = CHALK.white(msg);
    msg = makeIndent(indents) + msg;

    console.log(msg);

    /// #}}} @step log-suite-title
  });

  /// #}}} @event suite

  /// #{{{ @event suite-end

  runner.on('suite end', function logTestSuiteEnd() {

    /// #{{{ @step decrease-indent-count

    --indents;

    /// #}}} @step decrease-indent-count

    /// #{{{ @step log-empty-line

    if (!indents) {
      console.log();
    }

    /// #}}} @step log-empty-line
  });

  /// #}}} @event suite-end

  /// #{{{ @event pending

  runner.on('pending', function logPendingTest(test) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var msg;

    /// #}}} @step declare-variables

    /// #{{{ @step log-test-title

    msg = '- ' + test.title;
    msg = indentString(msg, indents + 2);
    msg = CHALK.yellow(msg);
    msg = makeIndent(indents + 1) + msg;

    console.log(msg);

    /// #}}} @step log-test-title
  });

  /// #}}} @event pending

  /// #{{{ @event pass

  runner.on('pass', function logPassingTest(test) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var title;
    /** @type {string} */
    var msg;

    /// #}}} @step declare-variables

    /// #{{{ @step log-test-result

    title = indentString(test.title, indents + 2);
    title = CHALK.white(title);

    if (test.speed !== 'fast') {
      msg = ' (' + test.duration + 'ms)';
      msg = test.speed === 'slow'
        ? CHALK.red(msg)
        : CHALK.yellow(msg);
    }

    msg = OK + ' ' + title + (msg || '');
    msg = makeIndent(indents + 1) + msg;

    console.log(msg);

    /// #}}} @step log-test-result
  });

  /// #}}} @event pass

  /// #{{{ @event fail

  runner.on('fail', function logFailingTest(test) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var msg;

    /// #}}} @step declare-variables

    /// #{{{ @step increase-failure-count

    ++fails;

    /// #}}} @step increase-failure-count

    /// #{{{ @step log-test-result

    msg = fails + ' ' + test.title;
    msg = indentString(msg, indents + 2);
    msg = CHALK.red(msg);
    msg = makeIndent(indents + 1) + msg;

    console.log(msg);

    /// #}}} @step log-test-result
  });

  /// #}}} @event fail

  /// #{{{ @event end

  runner.on('end', function logUnitTestEnd() {
    self.epilogue();
  });

  /// #}}} @event end
}
/// #}}} @func Specky

inherits(Specky, Base);

/// #}}} @group REPORTER

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Specky;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
