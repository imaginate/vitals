/**
 * ---------------------------------------------------------------------------
 * DOTTY REPORTER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 *
 * @file
 *   This file is a modified version of the Mocha
 *   [dot reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/dot.js).
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

/// #{{{ @const CHALK
/**
 * @private
 * @const {!Object}
 */
var CHALK = require('chalk');
/// #}}} @const CHALK

/// #{{{ @const DOT
/**
 * @private
 * @const {string}
 */
var DOT = loadHelper('reporter-base').symbols.dot;
/// #}}} @const DOT

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const SPEED
/**
 * @private
 * @const {!Object<string, !function>}
 */
var SPEED = {
  'slow':   CHALK.red.bold,
  'medium': CHALK.yellow.bold,
  'fast':   CHALK.white
};
/// #}}} @const SPEED

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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #}}} @group IS

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

/// #}}} @group HELPERS

/// #{{{ @group REPORTER
//////////////////////////////////////////////////////////////////////////////
// REPORTER
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Dotty
/**
 * @public
 * @param {Runner} runner
 * @constructor
 */
function Dotty(runner) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var width;
  /** @type {number} */
  var dots;
  /** @type {!Dotty} */
  var self;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Dotty) ) {
    throw setNewError(new SyntaxError, 'Dotty');
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

  /// #{{{ @step get-window-width

  width = Base.window.width * 0.75;
  width = width | 0;
  width = width > 50
    ? 50
    : width;

  /// #}}} @step get-window-width

  /// #{{{ @step set-initial-dot-count

  dots = -1;

  /// #}}} @step set-initial-dot-count

  /// #{{{ @func writeDot
  /**
   * @private
   * @param {(string|!function)} color
   * @return {void}
   */
  function writeDot(color) {

    /// #{{{ @step verify-parameters

    if (!arguments.length) {
      throw setNoArgError(new Error, 'color');
    }

    if ( isString(color) ) {
      color = CHALK[color];
    }

    if ( !isFunction(color) ) {
      throw setTypeError(new TypeError, 'color', '(string|!function)');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step print-end-of-line

    if ( !(++dots % width) ) {
      process.stdout.write('\n  ');
    }

    /// #}}} @step print-end-of-line

    /// #{{{ @step print-dot

    process.stdout.write( color(DOT) );

    /// #}}} @step print-dot
  }
  /// #}}} @func writeDot

  /// #{{{ @event pending

  runner.on('pending', function writePendingDot() {
    writeDot('yellow');
  });

  /// #}}} @event pending

  /// #{{{ @event pass

  runner.on('pass', function writePassingDot(test) {
    writeDot( SPEED[test.speed] );
  });

  /// #}}} @event pass

  /// #{{{ @event fail

  runner.on('fail', function writeFailingDot() {
    writeDot('red');
  });

  /// #}}} @event fail

  /// #{{{ @event end

  runner.on('end', function logUnitTestEnd() {
    console.log();
    self.epilogue();
  });

  /// #}}} @event end
}
/// #}}} @func Dotty

inherits(Dotty, Base);

/// #}}} @group REPORTER

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Dotty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
