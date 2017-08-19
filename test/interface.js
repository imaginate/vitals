/**
 * ---------------------------------------------------------------------------
 * TEST INTERFACE
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 *
 * @file
 *   This file is a modified version of the Mocha
 *   [bdd interface](https://github.com/mochajs/mocha/blob/master/lib/interfaces/bdd.js).
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
var loadHelper = require('./helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
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
var setError = loadHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileSystem
/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
var isFileSystem = IS.fileSystemSection;
/// #}}} @func isFileSystem

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

/// #{{{ @func isList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isList = IS.list;
/// #}}} @func isList

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;
/// #}}} @func isRegExp

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

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

/// #{{{ @func Suite
/**
 * @private
 * @param {string} title
 * @param {Context} parentContext
 * @constructor
 */
var Suite = Mocha.Suite;
/// #}}} @func Suite

/// #{{{ @func Test
/**
 * @private
 * @param {String} title
 * @param {Function} fn
 * @constructor
 */
var Test = Mocha.Test;
/// #}}} @func Test

/// #}}} @group MOCHA

/// #{{{ @group OBJECT

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func sliceArray
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
 * @return {!Array}
 */
var sliceArray = loadHelper('slice-array');
/// #}}} @func sliceArray

/// #}}} @group OBJECT

/// #{{{ @group STRING

/// #{{{ @func stringifyCall
/**
 * @private
 * @param {string} method
 * @param {!Array} args
 * @return {string}
 */
var stringifyCall = loadHelper('stringify-call');
/// #}}} @func stringifyCall

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group INTERFACE
//////////////////////////////////////////////////////////////////////////////
// INTERFACE
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Interface
/**
 * @example
 *   ```
 *   method('each', function() {
 *     should('return a valid object', function() {
 *       test([ '<object>', '<iteratee>' ], function() {
 *         var obj = {};
 *         var result = vitals.each(obj, function(val, key){});
 *         assert(result === obj);
 *       });
 *     });
 *   });
 *   ```
 * @private
 * @param {!Suite} suite
 * @constructor
 */
function Interface(suite) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Suite>} */
  var suites;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Interface) ) {
    throw setNewError(new SyntaxError, 'Interface');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'suite');
  }
  if ( !isObject(suite) ) {
    throw setTypeError(new TypeError, 'suite', '!Suite');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-suites-array

  suites = [ suite ];

  /// #}}} @step setup-suites-array

  /// #{{{ @event pre-require

  suite.on('pre-require', function setupVitalsInterface(context, file, mocha) {

    /// #{{{ @func method
    /**
     * @description
     *   Defines a suite of tests for a single vitals method.
     * @public
     * @param {string} method
     *   The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias
     *   An alias to use for test titles (e.g. `is.str`).
     * @param {!function} tests
     * @return {!Suite}
     */
    context.method = function methodSuite(method, alias, tests) {

      /** @type {!Suite} */
      var suite;
      /** @type {string} */
      var title;

      title = 'vitals.' + method;

      if (arguments.length < 3) {
        tests = alias;
        alias = undefined;
      }

      suite = Suite.create(suites[0], title);
      suite.file = file;
      suite.main = true;
      suite.method = alias || method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };
    /// #}}} @func method

    /// #{{{ @func method.skip
    /**
     * @description
     *   Defines a skipped suite of tests for a single vitals method.
     * @public
     * @param {string} method
     *   The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias
     *   An alias to use for test titles (e.g. `is.str`).
     * @param {!function} tests
     * @return {!Suite}
     */
    context.method.skip = function skipMethodSuite(method, alias, tests) {

      /** @type {Suite} */
      var suite;
      /** @type {string} */
      var title;

      title = 'vitals.' + method;

      if (arguments.length < 3) {
        tests = alias;
        alias = undefined;
      }

      suite = Suite.create(suites[0], title);
      suite.pending = true;
      suite.method = alias || method;
      suite.main = true;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };
    /// #}}} @func method.skip

    /// #{{{ @func method.only
    /**
     * @description
     *   Defines the only not skipped suite of tests for a single vitals
     *   method.
     * @public
     * @param {string} method
     *   The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias
     *   An alias to use for test titles (e.g. `is.str`).
     * @param {!function} tests
     * @return {!Suite}
     */
    context.method.only = function onlyMethodSuite(method, alias, tests) {

      /** @type {Suite} */
      var suite;

      if (arguments.length < 3) {
        tests = alias;
        alias = undefined;
      }

      suite = context.method(method, alias, tests);
      mocha.grep( suite.fullTitle() );
      return suite;
    };
    /// #}}} @func method.only

    /// #{{{ @func should
    /**
     * @description
     *   Defines a suite of tests within a method suite that should do a
     *   specific action.
     * @public
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should = function shouldSuite(msg, tests) {

      /** @type {Suite} */
      var suite;

      msg = 'should ' + msg.replace(/^(?: *should)? +/, '');

      suite = Suite.create(suites[0], msg);
      suite.file = file;
      suite.should = true;
      suite.method = suite.parent.method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };
    /// #}}} @func should

    /// #{{{ @func should.skip
    /**
     * @description
     *   Defines a skipped suite of tests within a method suite that should do
     *   a specific action.
     * @public
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should.skip = function skipShouldSuite(msg, tests) {

      /** @type {Suite} */
      var suite;

      msg = 'should ' + msg.replace(/^(?: *should)? +/, '');

      suite = Suite.create(suites[0], msg);
      suite.pending = true;
      suite.should = true;
      suite.method = suite.parent.method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };
    /// #}}} @func should.skip

    /// #{{{ @func should.only
    /**
     * @description
     *   Defines the only not skipped suite of tests within a method suite
     *   that should do a specific action.
     * @public
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should.only = function onlyShouldSuite(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = context.should(msg, tests);
      mocha.grep( suite.fullTitle() );
      return suite;
    };
    /// #}}} @func should.only

    /// #{{{ @func test
    /**
     * @description
     *   Defines a test.
     * @public
     * @param {(...*)=} arg
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test = function unitTest(arg, tests) {

      /** @type {!Suite} */
      var suite;
      /** @type {!Array} */
      var args;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      args = sliceArray(arguments, 0, -1);
      tests = arguments[args.length];
      suite = suites[0];

      if (suite.pending) {
        tests = null;
      }

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, tests);
      test.file = file;

      suite.addTest(test);

      return test;
    };
    /// #}}} @func test

    /// #{{{ @func test.skip
    /**
     * @description
     *   Defines a skipped test.
     * @public
     * @param {(...*)=} arg
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test.skip = function skipUnitTest(arg, tests) {

      /** @type {!Suite} */
      var suite;
      /** @type {!Array} */
      var args;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      args = sliceArray(arguments, 0, -1);
      tests = null;
      suite = suites[0];

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, tests);
      test.file = file;

      suite.addTest(test);

      return test;
    };
    /// #}}} @func test.skip

    /// #{{{ @func test.only
    /**
     * @description
     *   Defines the only not skipped test.
     * @public
     * @param {(...*)=} arg
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test.only = function onlyUnitTest(arg, tests) {

      /** @type {!Suite} */
      var suite;
      /** @type {!Array} */
      var args;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      args = sliceArray(arguments, 0, -1);
      tests = arguments[args.length];
      suite = suites[0];

      if (suite.pending) {
        tests = null;
      }

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, tests);
      test.file = file;

      suite.addTest(test);

      mocha.grep( test.fullTitle() );

      return test;
    };
    /// #}}} @func test.only

    /**
     * Defines a suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = Suite.create(suites[0], msg);
      suite.file = file;
      suite.method = suite.parent.method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines a skipped suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite.skip = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = Suite.create(suites[0], msg);
      suite.pending = true;
      suite.method = suite.parent.method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines the only not skipped suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite.only = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = context.suite(msg, tests);
      mocha.grep( suite.fullTitle() );
      return suite;
    };

    /**
     * Execute before running tests.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.before = function(name, fn) {
      suites[0].beforeAll(name, fn);
    };

    /**
     * Execute after running tests.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.after = function(name, fn) {
      suites[0].afterAll(name, fn);
    };

    /**
     * Execute before each test case.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.beforeEach = function(name, fn) {
      suites[0].beforeEach(name, fn);
    };

    /**
     * Execute after each test case.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.afterEach = function(name, fn) {
      suites[0].afterEach(name, fn);
    };

  });

  /// #}}} @event pre-require
}
/// #}}} @func Interface

/// #}}} @group INTERFACE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

Mocha.interfaces['vitals'] = Interface;

module.exports = Interface;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
