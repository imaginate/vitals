/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ act test` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

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

var newBrowserTest = require('./helpers/new-browser-test');
var newCmdMethod = require('./helpers/new-test-cmd-method');
var getSections = require('./helpers/get-test-sections');
var runTestCmd = require('./helpers/run-test-cmd');
var buildTest = require('./helpers/build-test');
var is = require('./helpers/is');

var METHOD = /^([a-z]+)[a-zA-Z.]*$/;

/**
 * @public
 * @param {string} method
 */
function testMethod(method) {

  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  if (!method) throw new Error('missing a method value');

  file = 'src/methods/' + method + '.js';

  if ( !is.file(file) ) throw new RangeError( errMsg('method') );

  name = 'vitals.' + method;
  runTestCmd({
    'method': method,
    'setup':  'methods.js',
    'start':  newCmdMethod(true,  name),
    'close':  newCmdMethod(false, name)
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

  if (!submethod) throw new Error('missing a submethod value');

  method = METHOD.test(submethod) && submethod.replace(METHOD, '$1');

  file = 'test/methods/' + method + '/' + submethod + '.js';

  if ( !is.file(file) ) throw new RangeError( errMsg('submethod') );

  name = 'vitals.' + submethod;
  runTestCmd({
    'submethod': submethod,
    'method':    method,
    'setup':     'methods.js',
    'start':     newCmdMethod(true,  name),
    'close':     newCmdMethod(false, name)
  });
}

/**
 * @public
 * @type {function}
 */
function testMethods() {
  runTestCmd({
    'setup': 'methods.js',
    'start': newCmdMethod(true,  'vitals'),
    'close': newCmdMethod(false, 'vitals')
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

  file = 'src/sections/' + section + '.js';

  if ( !is.file(file) ) throw new RangeError( errMsg('section') );

  name = 'vitals ' + section;
  runTestCmd({
    'reporter': 'dot',
    'grep':     section === 'all' ? null : 'section:' + section,
    'setup':    'sections/' + section,
    'start':    newCmdMethod(true,  name),
    'close':    newCmdMethod(false, name, callback)
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
 * @param {string} part - "section" or "method"
 * @return {string}
 */
function errMsg(part) {
  return 'invalid value (must be a valid vitals ' + part + ')';
}
