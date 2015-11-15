/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ node make test` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('test', 'method', {

  /**
   * @param {string=} options
   */
  methods: function methods(options) {

    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;
    /** @type {string} */
    var setup;

    options = getOptions(options);
    title = '`vitals`';
    tests = './test/methods';
    setup = 'node';

    configLog();

    logStart(title);
    runTests(options, tests, setup);
    logFinish(title);

    resetLog();
  },

  /**
   * @param {string} method
   */
  method: function method(method) {

    /** @type {string} */
    var options;
    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;
    /** @type {string} */
    var setup;

    if ( !is.file('src/methods/' + method + '.js') ) log.error(
      'Invalid `test.method` Task Call',
      'invalid `method` was provided',
      { argMap: true, method: method }
    );

    options = getOptions();
    tests = './test/methods/' + method;
    title = '`vitals.' + method + '`';
    setup = 'node';

    configLog();

    logStart(title);
    runTests(options, tests, setup);
    logFinish(title);

    resetLog();
  },

  /**
   * @param {string=} options
   */
  browser: function browser(options) {

    /** @type {!Array} */
    var setups;
    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;
    /** @type {string} */
    var src;

    options = ( options ? options + '+' : '' ) + 'reporter=dot';
    options = getOptions(options);
    options += '--grep node ';
    options += '--invert ';
    tests = './test/methods';
    src = 'src/browser/';

    configLog();

    setups = retrieve.filepaths('test/_setup/', { validNames: 'browser*' });
    each(setups, function(setup) {
      title = '`' + src + setup.replace('browser', 'vitals') + '`';
      logStart(title);
      runTests(options, tests, setup);
      logFinish(title);
    });

    resetLog();
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @type {!Object}
 * @const
 */
var MOCHA_DEFAULTS = {
  reporter: 'spec',
  slow:     50,
  timeout:  5000
};

/**
 * @type {!Object}
 * @const
 */
var TERMINAL_SYMBOLS = {
  pass: process.platform === 'win32' ? '\u221A' : '\u2714',
  fail: process.platform === 'win32' ? 'X'      : '\u2716'
};

/**
 * @param {string=} options
 * @return {string}
 */
function getOptions(options) {

  /** @type {!Object} */
  var defaults;
  /** @type {string} */
  var result;

  options = is.str(options) ? options.split('+') : [];

  defaults = clone(MOCHA_DEFAULTS);
  result = '--colors ';

  each(options, function(/** string */ option) {
    if ( has(option, '=') ) {
      defaults[ getName(option) ] = getVal(option);
    }
    else {
      result += option && '--' + hyphenate(option) + ' ';
    }
  });

  each(defaults, function(/** * */ val, /** string */ option) {
    result += '--' + hyphenate(option) + ' ' + val + ' ';
  });

  return result + '--globals * --recursive ';
}

/**
 * @param {string} options
 * @param {string} tests
 * @param {string=} setup
 */
function runTests(options, tests, setup) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var cmd;

  options = options.replace(/[^ ]$/, '$& ');
  setup = setup || '';
  setup = setup.replace(/\.js$/, '');
  setup = setup && '--require ./test/_setup/' + setup + '.js ';
  cmd = 'node ./node_modules/mocha/bin/mocha ' + options + setup + tests;
  result = exec(cmd, { catchExit: false, eol: null });
  //result = parseResults(result);
  console.log(result);
}

/**
 * @param {string} results
 * @return {string}
 */
function parseResults(results) {

  if ( !has(results, /^\s*\{\s*"stats":\s*\{/) ) return results;

  // ...
  return results;
}

/**
 * @param {string} title
 */
function logStart(title) {
  log.debug('Starting ' + title + ' Tests');
}

/**
 * @param {string} title
 */
function logFinish(title) {
  log.pass('Finished ' + title + ' Tests');
}

/** @type {function} */
function configLog() {
  log.setConfig('pass.spaceAfter', 2);
  log.setConfig('debug.spaceAfter', 0);
}

/** @type {function} */
function resetLog() {
  log.resetConfig();
}

/**
 * @param {string} str
 */
function getName(str) {
  return str && str.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');
}

/**
 * @param {string} str
 */
function getVal(str) {
  return str && str.replace(/^[a-z]+\=(.*)?$/i, '$1');
}

/**
 * @param {string} str
 * @return {string}
 */
function hyphenate(str) {
  return str && str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
