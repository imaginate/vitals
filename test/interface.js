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

/// #{{{ @const SHOULD
/**
 * @private
 * @const {!RegExp}
 */
var SHOULD = /^(?:[ \t]*should)?[ \t]+/i;
/// #}}} @const SHOULD

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

/// #{{{ @func setFileError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setFileError = setError.file;
/// #}}} @func setFileError

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

/// #{{{ @func setTestIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} testId
 * @param {string} testsId
 * @param {string} method
 * @return {!RangeError}
 */
var setTestIdError = setError.testId;
/// #}}} @func setTestIdError

/// #{{{ @func setTestNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {*} testId
 * @param {string} testsId
 * @param {string} method
 * @return {!Error}
 */
var setTestNoArgError = setError.testNoArg;
/// #}}} @func setTestNoArgError

/// #{{{ @func setTestTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @param {*} testId
 * @param {string} testsId
 * @param {string} method
 * @return {!TypeError}
 */
var setTestTypeError = setError.testType;
/// #}}} @func setTestTypeError

/// #{{{ @func setTestsIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} testsId
 * @param {string} method
 * @return {!RangeError}
 */
var setTestsIdError = setError.testsId;
/// #}}} @func setTestsIdError

/// #{{{ @func setTestsNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {*} testsId
 * @param {string} method
 * @return {!Error}
 */
var setTestsNoArgError = setError.testsNoArg;
/// #}}} @func setTestsNoArgError

/// #{{{ @func setTestsTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @param {*} testsId
 * @param {string} method
 * @return {!TypeError}
 */
var setTestsTypeError = setError.testsType;
/// #}}} @func setTestsTypeError

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

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

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

/// #{{{ @func isTestId
/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var isTestId = IS.testId;
/// #}}} @func isTestId

/// #{{{ @func isTestsId
/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var isTestsId = IS.testsId;
/// #}}} @func isTestsId

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

/// #{{{ @func Context
/**
 * @private
 * @constructor
 */
var Context = Mocha.Context;
/// #}}} @func Context

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

  /// #{{{ @step verify-new-keyword

  // Temporary disablement due to failure in Mocha.
  // Need to verify why Mocha is calling a constructor without `new`.
  // May remove if valid reason is found.

  //if ( !isInstanceOf(this, Interface) ) {
    //throw setNewError(new SyntaxError, 'Interface');
  //}

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'suite');
  }
  if ( !isInstanceOf(suite, Suite) ) {
    throw setTypeError(new TypeError, 'suite', '!Suite');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const SUITES
  /**
   * @private
   * @const {!Array<!Suite>}
   */
  var SUITES = [ suite ];
  /// #}}} @const SUITES

  /// #}}} @step set-constants

  /// #{{{ @event pre-require

  suite.on('pre-require', function setupVitalsInterface(context, file, mocha) {

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'context');
      case 1:
        throw setNoArgError(new Error, 'file');
      case 2:
        throw setNoArgError(new Error, 'mocha');
    }

    // Temporary disablement due to failure in Mocha.
    // Need to verify why Mocha is not passing an instance of `Context`.
    // May remove if valid reason is found.

    //if ( !isInstanceOf(context, Context) ) {
      //throw setTypeError(new TypeError, 'context', '!Context');
    //}
    if ( !isString(file) ) {
      throw setTypeError(new TypeError, 'file', 'string');
    }
    if ( !isInstanceOf(mocha, Mocha) ) {
      throw setTypeError(new TypeError, 'mocha', '!Mocha');
    }

    if (!file) {
      throw setEmptyError(new Error, 'file');
    }

    if ( !isFile(file) ) {
      throw setFileError(new Error, 'file', file);
    }

    /// #}}} @step verify-parameters

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

      suite = Suite.create(SUITES[0], title);
      suite.file = file;
      suite.main = true;
      suite.METHOD = method;
      suite.method = alias || method;

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

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

      suite = Suite.create(SUITES[0], title);
      suite.pending = true;
      suite.METHOD = method;
      suite.method = alias || method;
      suite.main = true;

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

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
     * @param {string} id
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should = function shouldSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step normalize-should-for-message

      msg = 'should ' + msg.replace(SHOULD, '');

      /// #}}} @step normalize-should-for-message

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.should = true;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func should

    /// #{{{ @func should.skip
    /**
     * @description
     *   Defines a skipped suite of tests within a method suite that should do
     *   a specific action.
     * @public
     * @param {string} id
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should.skip = function skipShouldSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step normalize-should-for-message

      msg = 'should ' + msg.replace(SHOULD, '');

      /// #}}} @step normalize-should-for-message

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.should = true;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.pending = true;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func should.skip

    /// #{{{ @func should.only
    /**
     * @description
     *   Defines the only not skipped suite of tests within a method suite
     *   that should do a specific action.
     * @public
     * @param {string} id
     * @param {string} msg
     *   What this suite of tests should do.
     * @param {!function} tests
     * @return {!Suite}
     */
    context.should.only = function onlyShouldSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step normalize-should-for-message

      msg = 'should ' + msg.replace(SHOULD, '');

      /// #}}} @step normalize-should-for-message

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.should = true;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step run-mocha-grep

      mocha.grep( suite.fullTitle() );

      /// #}}} @step run-mocha-grep

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func should.only

    /// #{{{ @func test
    /**
     * @description
     *   Defines a test.
     * @public
     * @param {string} id
     * @param {!Array} args
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test = function unitTest(id, args, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {string} */
      var group;
      /** @type {!Suite} */
      var suite;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      group = suite.TESTS_ID;
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestNoArgError(new Error, 'id', id, group, method);
        case 1:
          throw setTestNoArgError(new Error, 'args', id, group, method);
        case 2:
          throw setTestNoArgError(new Error, 'tests', id, group, method);
      }

      if ( !isString(id) ) {
        throw setTestTypeError(new TypeError, 'id', 'string', id, group,
          method);
      }
      if ( !isArray(args) ) {
        throw setTestTypeError(new TypeError, 'args', '!Array', id, group,
          method);
      }
      if ( !isFunction(tests) ) {
        throw setTestTypeError(new TypeError, 'tests', '!function', id, group,
          method);
      }

      if ( !isTestId(id) ) {
        throw setTestIdError(new RangeError, id, group, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step handle-pending-suite

      if (suite.pending) {
        tests = null;
      }

      /// #}}} @step handle-pending-suite

      /// #{{{ @step make-test-instance

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, tests);
      test.file = file;
      test.METHOD = method;
      test.TEST_ID = id;
      test.TESTS_ID = group;

      /// #}}} @step make-test-instance

      /// #{{{ @step add-test-to-suite

      suite.addTest(test);

      /// #}}} @step add-test-to-suite

      /// #{{{ @step return-test-instance

      return test;

      /// #}}} @step return-test-instance
    };
    /// #}}} @func test

    /// #{{{ @func test.skip
    /**
     * @description
     *   Defines a skipped test.
     * @public
     * @param {string} id
     * @param {!Array} args
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test.skip = function skipUnitTest(id, args, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {string} */
      var group;
      /** @type {!Suite} */
      var suite;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      group = suite.TESTS_ID;
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestNoArgError(new Error, 'id', id, group, method);
        case 1:
          throw setTestNoArgError(new Error, 'args', id, group, method);
        case 2:
          throw setTestNoArgError(new Error, 'tests', id, group, method);
      }

      if ( !isString(id) ) {
        throw setTestTypeError(new TypeError, 'id', 'string', id, group,
          method);
      }
      if ( !isArray(args) ) {
        throw setTestTypeError(new TypeError, 'args', '!Array', id, group,
          method);
      }
      if ( !isFunction(tests) ) {
        throw setTestTypeError(new TypeError, 'tests', '!function', id, group,
          method);
      }

      if ( !isTestId(id) ) {
        throw setTestIdError(new RangeError, id, group, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step make-test-instance

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, null);
      test.file = file;
      test.METHOD = method;
      test.TEST_ID = id;
      test.TESTS_ID = group;

      /// #}}} @step make-test-instance

      /// #{{{ @step add-test-to-suite

      suite.addTest(test);

      /// #}}} @step add-test-to-suite

      /// #{{{ @step return-test-instance

      return test;

      /// #}}} @step return-test-instance
    };
    /// #}}} @func test.skip

    /// #{{{ @func test.only
    /**
     * @description
     *   Defines the only not skipped test.
     * @public
     * @param {string} id
     * @param {!Array} args
     *   The arguments passed (in order) to the vitals method.
     * @param {!function} tests
     * @return {!Test}
     */
    context.test.only = function onlyUnitTest(id, args, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {string} */
      var group;
      /** @type {!Suite} */
      var suite;
      /** @type {!Test} */
      var test;
      /** @type {string} */
      var msg;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      group = suite.TESTS_ID;
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestNoArgError(new Error, 'id', id, group, method);
        case 1:
          throw setTestNoArgError(new Error, 'args', id, group, method);
        case 2:
          throw setTestNoArgError(new Error, 'tests', id, group, method);
      }

      if ( !isString(id) ) {
        throw setTestTypeError(new TypeError, 'id', 'string', id, group,
          method);
      }
      if ( !isArray(args) ) {
        throw setTestTypeError(new TypeError, 'args', '!Array', id, group,
          method);
      }
      if ( !isFunction(tests) ) {
        throw setTestTypeError(new TypeError, 'tests', '!function', id, group,
          method);
      }

      if ( !isTestId(id) ) {
        throw setTestIdError(new RangeError, id, group, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step handle-pending-suite

      if (suite.pending) {
        tests = null;
      }

      /// #}}} @step handle-pending-suite

      /// #{{{ @step make-test-instance

      msg = stringifyCall(suite.method, args);
      test = new Test(msg, tests);
      test.file = file;
      test.METHOD = method;
      test.TEST_ID = id;
      test.TESTS_ID = group;

      /// #}}} @step make-test-instance

      /// #{{{ @step add-test-to-suite

      suite.addTest(test);

      /// #}}} @step add-test-to-suite

      /// #{{{ @step run-mocha-grep

      mocha.grep( test.fullTitle() );

      /// #}}} @step run-mocha-grep

      /// #{{{ @step return-test-instance

      return test;

      /// #}}} @step return-test-instance
    };
    /// #}}} @func test.only

    /// #{{{ @func suite
    /**
     * @description
     *   Defines a suite of tests.
     * @public
     * @param {string} id
     * @param {string} msg
     * @param {!function} tests
     * @return {!Suite}
     */
    context.suite = function genericSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func suite

    /// #{{{ @func suite.skip
    /**
     * @description
     *   Defines a skipped suite of tests.
     * @public
     * @param {string} id
     * @param {string} msg
     * @param {!function} tests
     * @return {!Suite}
     */
    context.suite.skip = function skipGenericSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.pending = true;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func suite.skip

    /// #{{{ @func suite.only
    /**
     * @description
     *   Defines the only not skipped suite of tests.
     * @public
     * @param {string} id
     * @param {string} msg
     * @param {!function} tests
     * @return {!Suite}
     */
    context.suite.only = function onlyGenericSuite(id, msg, tests) {

      /// #{{{ @step declare-variables

      /** @type {string} */
      var method;
      /** @type {!Suite} */
      var suite;

      /// #}}} @step declare-variables

      /// #{{{ @step get-current-suite-details

      suite = SUITES[0];
      method = suite.METHOD;

      /// #}}} @step get-current-suite-details

      /// #{{{ @step verify-parameters

      switch (arguments.length) {
        case 0:
          throw setTestsNoArgError(new Error, 'id', id, method);
        case 1:
          throw setTestsNoArgError(new Error, 'msg', id, method);
        case 2:
          throw setTestsNoArgError(new Error, 'tests', id, method);
      }

      if ( !isString(id) ) {
        throw setTestsTypeError(new TypeError, 'id', 'string', id, method);
      }
      if ( !isString(msg) ) {
        throw setTestsTypeError(new TypeError, 'msg', 'string', id, method);
      }
      if ( !isFunction(tests) ) {
        throw setTestsTypeError(new TypeError, 'tests', '!function', id,
          method);
      }

      if ( !isTestsId(id) ) {
        throw setTestsIdError(new RangeError, id, method);
      }

      /// #}}} @step verify-parameters

      /// #{{{ @step make-suite-instance

      suite = Suite.create(suite, msg);
      suite.file = file;
      suite.METHOD = method;
      suite.method = suite.parent.method;
      suite.TESTS_ID = id;

      /// #}}} @step make-suite-instance

      /// #{{{ @step run-suite-tests

      SUITES.unshift(suite);
      tests.call(suite);
      SUITES.shift();

      /// #}}} @step run-suite-tests

      /// #{{{ @step run-mocha-grep

      mocha.grep( suite.fullTitle() );

      /// #}}} @step run-mocha-grep

      /// #{{{ @step return-suite-instance

      return suite;

      /// #}}} @step return-suite-instance
    };
    /// #}}} @func suite.only

    /// #{{{ @func before
    /**
     * @description
     *   Execute before running any unit test within the same context.
     * @public
     * @param {string} name
     * @param {!function} fn
     * @return {void}
     */
    context.before = function beforeUnitTests(name, fn) {
      SUITES[0].beforeAll(name, fn);
    };
    /// #}}} @func before

    /// #{{{ @func after
    /**
     * @description
     *   Execute after running all unit tests within the same context.
     * @public
     * @param {string} name
     * @param {!function} fn
     * @return {void}
     */
    context.after = function afterUnitTests(name, fn) {
      SUITES[0].afterAll(name, fn);
    };
    /// #}}} @func after

    /// #{{{ @func beforeEach
    /**
     * @description
     *   Execute before running each unit test within the same context.
     * @public
     * @param {string} name
     * @param {!function} fn
     * @return {void}
     */
    context.beforeEach = function beforeEachUnitTest(name, fn) {
      SUITES[0].beforeEach(name, fn);
    };
    /// #}}} @func beforeEach

    /// #{{{ @func afterEach
    /**
     * @description
     *   Execute after running each unit test within the same context.
     * @public
     * @param {string} name
     * @param {!function} fn
     * @return {void}
     */
    context.afterEach = function afterEachUnitTest(name, fn) {
      SUITES[0].afterEach(name, fn);
    };
    /// #}}} @func afterEach

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
