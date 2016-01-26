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
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var cp = require('child_process');
var is = require('node-are').is;
var log = require('log-ocd')();
var fuse = require('node-vitals')('fuse');

log.error.setConfig({
  'throw': false,
  'exit':  true
});

var MOCHA = './node_modules/mocha/bin/_mocha';
var CUSTOM_REPORT = 'test/setup/mocha-reporter.js';

exports['desc'] = 'run vitals unit tests';
exports['value'] = 'vitals-method';
exports['default'] = '-method';
exports['methods'] = {
  'method': {
    'desc': 'unit tests for one method',
    'value': 'vitals-method',
    'method': methodTests
  },
  'methods': {
    'desc': 'unit tests for all methods',
    'method': methodsTests
  },
  'section': {
    'desc': 'unit tests for one section',
    'value': 'vitals-section',
    'method': sectionTests
  },
  'sections': {
    'desc': 'unit tests for all sections',
    'method': sectionsTests
  },
  'browser': {
    'desc': 'unit tests for all browser versions',
    'method': browserTests
  }
};
exports['done'] = false; // turn auto complete logs off

/**
 * @public
 * @param {string} method
 */
function methodTests(method) {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;
  /** @type {string} */
  var file;
  /** @type {string} */
  var msg;

  file = fuse('src/methods/', method, '.js');

  if ( !is.file(file) ) {
    throw Error('invalid value (must be a valid vitals method)');
  }

  msg = fuse('Starting `vitals.', method, '` tests');
  log.debug(msg);

  args = [
    MOCHA,
    '--colors',
    '--reporter',
    CUSTOM_REPORT,
    '--recursive',
    '--require',
    './test/setup/methods.js',
    fuse('./test/methods/', method)
  ];
  opts = { 'stdio': 'inherit' };

  try {
    child = cp.spawn('node', args, opts);
  }
  catch (error) {
    error.name = fuse('Internal ', error.name || 'Error');
    log.error(error);
  }

  child.on('close', function() {
    msg = fuse('Finished `vitals.', method, '` tests');
    log.pass(msg);
  });
}

/**
 * @public
 * @type {function}
 */
function methodsTests() {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;

  log.debug('Starting `vitals` tests');

  args = [
    MOCHA,
    '--colors',
    '--reporter',
    CUSTOM_REPORT,
    '--recursive',
    '--require',
    './test/setup/methods.js',
    './test/methods'
  ];
  opts = { 'stdio': 'inherit' };

  try {
    child = cp.spawn('node', args, opts);
  }
  catch (error) {
    error.name = fuse('Internal ', error.name || 'Error');
    log.error(error);
  }

  child.on('close', function() {
    log.pass('Finished `vitals` tests');
  });
}

/**
 * @public
 * @param {string} section
 * @param {?function=} callback
 */
function sectionTests(section, callback) {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {?Object} */
  var opts;
  /** @type {string} */
  var file;
  /** @type {string} */
  var msg;

  file = fuse('src/sections/', section, '.js');

  if ( !is.file(file) ) {
    throw Error('invalid value (must be a valid vitals section)');
  }

  msg = fuse('Starting `vitals ', section, '` tests');
  log.debug(msg);

  args = [ MOCHA, '--colors', '--reporter', CUSTOM_REPORT, '--recursive' ];
  opts = is.same(section, 'all') ? null : [ '--grep', fuse('section:', section) ];
  file = fuse('./test/setup/section-', section, '.js');
  args = fuse(args, opts, [ '--require', file, './test/methods' ]);
  opts = { 'stdio': 'inherit' };

  try {
    child = cp.spawn('node', args, opts);
  }
  catch (error) {
    error.name = fuse('Internal ', error.name || 'Error');
    log.error(error);
  }

  child.on('close', function() {
    msg = fuse('Finished `vitals ', section, '` tests');
    log.pass(msg);
    callback && callback();
  });
}

/**
 * @public
 * @type {function}
 */
function sectionsTests() {

  /** @type {!Array} */
  var sections;
  /** @type {function} */
  var init;

  sections = get.filepaths('test/setup', { validNames: 'section-*' });
  sections = remap(sections, function(section) {
    return remap(section, /section-([a-z]+)\.js$/, '$1');
  });
  init = roll(null, sections, function(callback, section) {

  });
}
