/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `act test` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'run vitals unit tests';
exports['value'] = 'vitals-submethod';
exports['default'] = '-submethod';
exports['methods'] = {
  'method': {
    'desc': 'unit tests for one method',
    'value': 'vitals-method',
    'method': testMethod
  },
  'submethod': {
    'desc': 'unit tests for one submethod',
    'value': 'vitals-submethod',
    'method': testSubmethod
  },
  'methods': {
    'desc': 'unit tests for all methods',
    'method': testMethods
  },
  'section': {
    'desc': 'unit tests for one section',
    'value': 'vitals-section',
    'method': testSection
  },
  'sections': {
    'desc': 'unit tests for all sections',
    'method': testSections
  },
  'browser': {
    'desc': 'unit tests for all browser versions',
    'method': testBrowser
  }
};
exports['done'] = false; // turn off automatic done logging

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./helpers/is.js');

/**
 * @private
 * @const {!RegExp}
 */
var METHOD = /^([a-z]+)[a-zA-Z._]*$/;

/**
 * @private
 * @const {string}
 */
var REPO_DIR = require('./helpers/get-repo-root.js')();

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFile = IS.file;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./helpers/resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} sections
 * @param {function} newTest
 * @return {function}
 */
var buildTest = require('./helpers/build-test.js');

/**
 * @private
 * @param {string=} invalid
 *   The invalid sections.
 * @return {!Array<string>}
 */
var getSections = require('./helpers/get-test-sections.js');

/**
 * @private
 * @param {string} section
 * @param {?function} callback
 * @return {function}
 */
var newBrowserTest = require('./helpers/new-browser-test.js');

/**
 * @private
 * @param {string} section
 * @param {?function=} callback
 * @return {function}
 */
function newSectionTest(section, callback) {
  return function sectionTest() {
    testSection(section, callback);
  };
}

/**
 * @private
 * @param {boolean} start
 *   If `true`, it is a start method. If `false`, it is a close method.
 * @param {string=} name
 *   The name to log.
 * @param {?function=} callback
 * @return {!TestCmdMethod}
 */
var newTestCmdMethod = require('./helpers/new-test-cmd-method.js');

/**
 * @private
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start = `null`
 * @param {?TestCmdMethod=} opts.close = `null`
 * @param {string=} opts.reporter = `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {string=} opts.setup = `"methods"`
 * @param {string=} opts.method = `""`
 *   Test only a specific method.
 * @param {string=} opts.section = `""`
 *   Test only a specific section.
 * @param {string=} opts.submethod = `""`
 *   Test only a specific submethod.
 */
var runTestCmd = require('./helpers/run-test-cmd.js');

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} method
 */
function testMethod(method) {

  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  if (!method)
    throw new Error('invalid missing method');

  file = method + '.js';
  file = resolvePath(REPO_DIR, 'src/methods', file);

  if ( !isFile(file) )
    throw new RangeError('invalid method (must be a valid vitals method)');

  name = 'vitals.' + method;
  runTestCmd({
    'method': method,
    'setup': 'methods.js',
    'start': newTestCmdMethod(true, name),
    'close': newTestCmdMethod(false, name)
  });
}

/**
 * @public
 * @param {string} submethod
 */
function testSubmethod(submethod) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  if (!submethod)
    throw new Error('invalid missing submethod');

  method = METHOD.test(submethod)
    ? submethod.replace(METHOD, '$1')
    : submethod;

  file = submethod + '.js';
  file = resolvePath(REPO_DIR, 'test/methods', method, file);

  if ( !isFile(file) )
    throw new RangeError('invalid submethod (must be a valid vitals submethod)');

  name = 'vitals.' + submethod;
  runTestCmd({
    'submethod': submethod,
    'method': method,
    'setup': 'methods.js',
    'start': newTestCmdMethod(true, name),
    'close': newTestCmdMethod(false, name)
  });
}

/**
 * @public
 * @type {function}
 */
function testMethods() {
  runTestCmd({
    'setup': 'methods.js',
    'start': newTestCmdMethod(true, 'vitals'),
    'close': newTestCmdMethod(false, 'vitals')
  });
}

/**
 * @public
 * @param {string} section
 * @param {?function=} callback
 */
function testSection(section, callback) {

  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  file = section + '.js';
  file = resolvePath(REPO_DIR, 'src/sections', file);

  if ( !isFile(file) )
    throw new RangeError('invalid section (must be a valid vitals section)');

  name = 'vitals ' + section;
  runTestCmd({
    'reporter': 'dotty',
    'section': (section === 'all') ? '' : section,
    'setup': 'sections/' + section,
    'start': newTestCmdMethod(true, name),
    'close': newTestCmdMethod(false, name, callback)
  });
}

/**
 * @public
 * @type {function}
 */
function testSections() {

  /** @type {!Array<string>} */
  var sections;
  /** @type {function} */
  var test;

  sections = getSections();
  test = buildTest(sections, newSectionTest);
  test();
}

/**
 * @public
 * @type {function}
 */
function testBrowser() {

  /** @type {!Array<string>} */
  var sections;
  /** @type {function} */
  var test;

  sections = getSections('fs');
  test = buildTest(sections, newBrowserTest);
  test();
}
