/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: interface
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [bdd interface](https://github.com/mochajs/mocha/blob/master/lib/interfaces/bdd.js).
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var sliceArr = require('../helpers/slice-arr');
var testCall = require('../helpers/test-call');

var Mocha = require('mocha');
var Suite = Mocha.Suite;
var Test = Mocha.Test;

Mocha.interfaces['vitals'] = Interface;

module.exports = Interface;

/**
 * Custom interface example:
 *
 *      method('each', function() {
 *
 *        should('return a valid object', function() {
 *
 *          test([ '<object>', '<iteratee>' ], function() {
 *            var obj = {};
 *            var result = vitals.each(obj, function(val, key){});
 *            assert( result === obj );
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite - The root suite.
 */
function Interface(suite) {

  /** @type {!Array<Suite>} */
  var suites;

  suites = [ suite ];

  suite.on('pre-require', function(context, file, mocha) {

    /**
     * Defines a suite of tests for a single vitals method.
     *
     * @public
     * @param {string} method - The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias - An alias to use for test titles (e.g. `is.str`).
     * @param {function} tests
     * @return {Suite}
     */
    context.method = function(method, alias, tests) {

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
      suite.file = file;
      suite.method = alias || method;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines a skipped suite of tests for a single vitals method.
     *
     * @public
     * @param {string} method - The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias - An alias to use for test titles (e.g. `is.str`).
     * @param {function} tests
     */
    context.method.skip = function(method, alias, tests) {

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

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines the only not skipped suite of tests for a single vitals method.
     *
     * @public
     * @param {string} method - The vitals method (e.g. `has` or `is.string`).
     * @param {string=} alias - An alias to use for test titles (e.g. `is.str`).
     * @param {function} tests
     * @return {Suite}
     */
    context.method.only = function(method, alias, tests) {

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

    /**
     * Defines a suite of tests within a method suite that should _do something_.
     *
     * @public
     * @param {string} msg - What this suite of tests should do.
     * @param {function} tests
     * @return {Suite}
     */
    context.should = function(msg, tests) {

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

    /**
     * Defines a skipped suite of tests within a method suite that should 
     *   _do something_.
     *
     * @public
     * @param {string} msg - What this suite of tests should do.
     * @param {function} tests
     * @return {Suite}
     */
    context.should.skip = function(msg, tests) {

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

    /**
     * Defines the only not skipped suite of tests within a method suite that 
     *   should _do something_.
     *
     * @public
     * @param {string} msg - What this suite of tests should do.
     * @param {function} tests
     * @return {Suite}
     */
    context.should.only = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = context.should(msg, tests);
      mocha.grep( suite.fullTitle() );
      return suite;
    };

    /**
     * Defines a test.
     *
     * @public
     * @param {...*=} args - The arguments passed to the vitals method.
     * @param {function} tests
     * @return {Test}
     */
    context.test = function(args, tests) {

      /** @type {Suite} */
      var suite;
      /** @type {Test} */
      var test;
      /** @type {string} */
      var msg;

      args  = sliceArr(arguments, 0, -1);
      tests = arguments[args.length];
      suite = suites[0];
      tests = suite.pending ? null : tests;
      msg   = testCall(suite.method, args, 3);
      test  = new Test(msg, tests);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Defines a skipped test.
     *
     * @public
     * @param {...*=} args - The arguments passed to the vitals method.
     * @param {function} tests
     * @return {Test}
     */
    context.test.skip = function(args, tests) {
      arguments[arguments.length - 1] = null;
      return context.test.apply(this, arguments);
    };

    /**
     * Defines the only not skipped test.
     *
     * @public
     * @param {...*=} args - The arguments passed to the vitals method.
     * @param {function} tests
     * @return {Test}
     */
    context.test.only = function(args, tests) {

      /** @type {Test} */
      var test;

      test = context.test.apply(this, arguments);
      mocha.grep( test.fullTitle() );
      return test;
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
};
