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

var cp = require('child_process');


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
    setup = 'methods';

    configLog();

    logStart(title);
    runTests(options, tests, setup, function() {
      logFinish(title);
      resetLog();
    });
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

    options = getOptions('reporter=spec');
    tests = './test/methods/' + method;
    title = '`vitals.' + method + '`';
    setup = 'methods';

    configLog();

    logStart(title);
    runTests(options, tests, setup);
    logFinish(title);

    resetLog();
  },

  /**
   * @param {string=} options
   */
  sections: function sections(options) {

    /** @type {string} */
    var section;
    /** @type {!Array} */
    var setups;
    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;

    options = getOptions(options);
    tests = './test/methods';

    configLog();

    title = '`vitals all`';
    logStart(title);
    runTests(options, tests, 'section');
    logFinish(title);

    options += '--grep section:';
    setups = retrieve.filepaths('test/_setup/', { validNames: 'section-*' });
    each(setups, function(setup) {
      section = getSection(setup);
      title = '`vitals ' + section + '`';
      logStart(title);
      runTests(options + section, tests, setup);
      logFinish(title);
    });

    resetLog();
  },

  /**
   * @param {string} section
   */
  section: function section(section) {

    /** @type {string} */
    var options;
    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;
    /** @type {string} */
    var setup;

    if ( !is.file('src/sections/' + section + '.js') ) log.error(
      'Invalid `test.section` Task Call',
      'invalid `section` was provided',
      { argMap: true, section: section }
    );

    options = getOptions();
    tests = './test/methods';
    title = '`vitals ' + section + '`';
    setup = 'section';

    if (section !== 'all') {
      options += '--grep section:' + section;
      setup += '-' + section;
    }

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

    /** @type {string} */
    var section;
    /** @type {!Array} */
    var setups;
    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;

    options = getOptions(options);
    tests = './test/methods';

    configLog();

    setups = [ 'browser', 'browser.min' ];
    each(setups, function(setup) {
      title = '`src/browser/' + setup.replace('browser', 'vitals') + '`';
      logStart(title);
      runTests(options, tests, setup);
      logFinish(title);
    });

    options += '--grep section:';
    setups = retrieve.filepaths('test/_setup/', { validNames: 'browser-*' });
    each(setups, function(setup) {
      title = '`src/browser/' + setup.replace('browser', 'vitals') + '`';
      section = getSection(setup);
      logStart(title);
      runTests(options + section, tests, setup);
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
  reporter: 'dot',
  slow:     50,
  timeout:  5000
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
 * @param {function=} callback
 */
function runTests(options, tests, setup, callback) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var chunks;
  /** @type {string} */
  var cmd;

  options = options.replace(/[^ ]$/, '$& ');
  setup = setup || '';
  setup += setup && !has(setup, /\.js$/) ? '.js' : '';
  setup = setup && '--require ./test/_setup/' + setup + ' ';
  cmd = 'node ./node_modules/mocha/bin/mocha ' + options + setup + tests;
  if ( hasSync() ) {
    result = exec(cmd, { catchExit: false, eol: null });
    console.log(result);
    callback && callback();
  }
  else {
    chunks = '';
    cmd = cmd.split(' ');
    result = cp.spawn(cmd[0], slice(cmd, 1));
    result.stdout.on('data', function(chunk) {
      chunks += chunk.toString();
    });
    result.stdout.on('close', function() {
      console.log(chunks);
      callback && callback();
    });
  }
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
 * @return {string}
 */
function getName(str) {
  return str.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');
}

/**
 * @param {string} str
 * @return {string}
 */
function getVal(str) {
  return str.replace(/^[a-z]+\=(.*)?$/i, '$1');
}

/**
 * @param {string} str
 * @return {string}
 */
function hyphenate(str) {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase();
}

/**
 * @param {string} str
 * @return {string}
 */
function getSection(str) {
  return /-([a-z-_]+)\./i.exec(str)[1];
}

/**
 * @param {string} filename
 * @return {string}
 */
function stripExt(filename) {
  return filename.replace(/\.js$/, '');
}

/**
 * @return {boolean}
 */
function hasSync() {
  return 'spawnSync' in cp;
}
