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
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/**
 * @typedef {function} CmdMethod
 *
 * @typedef {{
 *   __CMD:      boolean,
 *   start:     !CmdMethod,
 *   close:     !CmdMethod,
 *   colors:    ?string,
 *   recursive: ?string,
 *   reporter:   string,
 *   grep:      ?string,
 *   setup:      string,
 *   method:    ?string
 * }} Cmd
 */

var cp = require('child_process');
var is = require('node-are').is;
var log = require('log-ocd')();

log.error.setConfig({
  'throw': false,
  'exit':  true
});

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var fuse   = vitals.fuse;
var get    = vitals.get;
var remap  = vitals.remap;
var roll   = vitals.roll;

var MOCHA_CMD = './node_modules/mocha/bin/_mocha';
var SETUP_DIR = './test/setup';
var TESTS_DIR = './test/methods';
var DEFAULTS = {
  reporter: 'test/setup/mocha-reporter.js',
  setup:    'methods.js'
};

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

  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  file = fuse('src/methods/', method, '.js');

  if ( !is.file(file) ) {
    throw new Error('invalid value (must be a valid vitals method)');
  }

  name = fuse('vitals.', method);
  runCmd({
    'method': method,
    'start':  newCmdMethod(true,  name),
    'close':  newCmdMethod(false, name)
  });
}

/**
 * @public
 * @type {function}
 */
function methodsTests() {
  runCmd({
    'start': newCmdMethod(true,  'vitals'),
    'close': newCmdMethod(false, 'vitals')
  });
}

/**
 * @public
 * @param {string} section
 * @param {?function=} callback
 */
function sectionTests(section, callback) {

  /** @type {string} */
  var file;
  /** @type {string} */
  var name;

  file = fuse('src/sections/', section, '.js');

  if ( !is.file(file) ) {
    throw new Error('invalid value (must be a valid vitals section)');
  }

  name = fuse('vitals ', section);
  runCmd({
    'reporter': 'dot',
    'grep':     is.same(section, 'all') ? null : fuse('section:', section),
    'setup':    fuse('section/', section),
    'start':    newCmdMethod(true,  name),
    'close':    newCmdMethod(false, name, callback)
  });
}

/**
 * @public
 * @type {function}
 */
function sectionsTests() {
  roll(null, getSections(), function(callback, section) {
    return sectionTests.bind(null, section, callback);
  })();
}

/**
 * @public
 * @type {function}
 */
function browserTests() {
  roll(null, getSections(), newBrowserTest)();
}

/**
 * @private
 * @param {?function} callback
 * @param {string} section
 * @return {function}
 */
function newBrowserTest(callback, section) {

  /** @type {string} */
  var setup;
  /** @type {string} */
  var file;
  /** @type {string} */
  var grep;

  if ( is.same(section, 'all') ) {
    file = 'vitals.js';
    grep = null;
  }
  else {
    file = fuse('vitals-', section, '.js');
    grep = fuse('section:', section);
  }

  file = fuse('src/browser/', file);
  setup = fuse('./test/setup/browser/', section, '.js');
  callback = newMinBrowserTest(file, setup, grep, callback);
  return function browserTest() {
    runCmd({
      'reporter': 'dot',
      'grep':     grep,
      'setup':    setup,
      'start':    newCmdMethod(true,  file),
      'close':    newCmdMethod(false, file, callback)
    });
  };
}

/**
 * @private
 * @param {string} file
 * @param {string} setup
 * @param {?string} grep
 * @param {?function} callback
 * @return {function}
 */
function newMinBrowserTest(file, setup, grep, callback) {
  setup = remap(setup, /js$/, 'min.js');
  file = remap(file, /js$/, 'min.js');
  return function minBrowserTest() {
    return runCmd({
      'reporter': 'dot',
      'grep':     grep,
      'setup':    setup,
      'start':    newCmdMethod(true,  file),
      'close':    newCmdMethod(false, file, callback)
    });
  };
}

/**
 * @private
 * @return {!Array<string>}
 */
function getSections() {

  /** @type {!Array<string>} */
  var sections;

  sections = get.filepaths('test/setup/sections');
  return remap(sections, function(section) {
    return cut(section, /js$/);
  });
}

/**
 * @private
 * @param {(?Object|Cmd)} vals
 * @param {?CmdMethod=} vals.start  - [default= null]
 * @param {?CmdMethod=} vals.close  - [default= null]
 * @param {boolean=} vals.colors    - [default= true]
 * @param {boolean=} vals.recursive - [default= true]
 * @param {string=} vals.reporter   - [default= DEFAULTS.reporter]
 * @param {string=} vals.grep       - [default= ""]
 * @param {string=} vals.setup      - [default= DEFAULTS.setup]
 * @param {string=} vals.method     - [default= ""] Test only a specific method.
 */
function runCmd(vals) {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;
  /** @type {!Cmd} */
  var cmd;

  cmd = newCmd(vals);
  args = fuse([], MOCHA_CMD, cmd.colors, cmd.reporter, cmd.recursive);
  args = fuse(args, cmd.grep, cmd.setup, cmd.test);
  opts = { 'stdio': 'inherit' };

  cmd.start();

  try {
    child = cp.spawn('node', args, opts);
    child.on('close', cmd.close);
  }
  catch (error) {
    error.name = fuse('Internal `test` ', error.name || 'Error');
    log.error(error);
  }
}

/**
 * @private
 * @param {(?Object|Cmd)} opts
 * @param {?CmdMethod=} opts.start  - [default= null]
 * @param {?CmdMethod=} opts.close  - [default= null]
 * @param {boolean=} opts.colors    - [default= true]
 * @param {boolean=} opts.recursive - [default= true]
 * @param {string=} opts.reporter   - [default= DEFAULTS.reporter]
 * @param {string=} opts.grep       - [default= ""]
 * @param {string=} opts.setup      - [default= DEFAULTS.setup]
 * @param {string=} opts.method     - [default= ""] Test only a specific method.
 * @return {!Cmd}
 */
function newCmd(opts) {

  if (opts && opts.__CMD) return opts;

  opts = opts || {};
  opts = {
    'start':     is.func(opts.start) ? opts.start : function(){},
    'close':     is.func(opts.close) ? opts.close : function(){},
    'colors':    is.same(opts.colors, false)    ? null  : '--colors',
    'recursive': is.same(opts.recursive, false) ? null  : '--recursive',
    'reporter':  is._str(opts.reporter) ? opts.reporter : DEFAULTS.reporter,
    'grep':      is._str(opts.grep)     ? opts.grep     : null,
    'setup':     is._str(opts.setup)    ? opts.setup    : DEFAULTS.setup,
    'method':    is._str(opts.method)   ? opts.method   : null
  };
  opts.reporter = [ '--reporter', opts.reporter ];
  opts.grep = opts.grep && [ '--grep', opts.grep ];
  opts.setup = cut(opts.setup, /\.js$/);
  opts.setup = fuse(SETUP_DIR, '/', opts.setup, '.js');
  opts.setup = [ '--require', opts.setup ];
  opts.test = opts.method ? fuse(TESTS_DIR, '/', opts.method) : TESTS_DIR;
  opts.__CMD = true;
  return opts;
}

/**
 * @private
 * @param {boolean} start - start or close
 * @param {string=} name - the name to log
 * @param {?function=} callback
 * @return {!CmdMethod}
 */
function newCmdMethod(start, name, callback) {

  /** @type {function} */
  var logger;
  /** @type {string} */
  var msg;

  if ( is.func(name) ) {
    callback = name;
    name = undefined;
  }

  if (name) {
    logger = start ? log.debug : log.pass;
    msg = start ? 'Starting' : 'Finished';
    msg = fuse(msg, ' `', name, '` tests');
  }

  return function cmdMethod() {
    msg && logger(msg);
    callback && callback();
  };
}
