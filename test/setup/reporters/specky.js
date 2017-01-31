/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS MOCHA REPORTER: specky
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [spec reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js).
 * @copyright 2017 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var indentStr = require('../../helpers/indent-str');
var breakStr = require('../../helpers/break-str');
var inherits = require('util').inherits;
var chalk = require('chalk');
var Base = require('./base.js');

var OK = chalk.green(Base.symbols.ok);

var METHOD = /^vitals\.([a-zA-Z.]+) \([^)]+\)$/;
var ALIAS = /^[^)]+\) \(alias:([a-zA-Z.]+)\)$/;

module.exports = Specky;

/**
 * Initialize a new `Specky` test reporter.
 * @param {Runner} runner
 */
function Specky(runner) {

  /** @type {number} */
  var indents;
  /** @type {string} */
  var method;
  /** @type {number} */
  var fails;
  /** @type {!Object} */
  var self;

  Base.call(this, runner);

  self = this;
  indents = -1;
  fails = 0;

  runner.on('start', function() {
    console.log();
  });

  runner.on('suite', function(suite) {

    /** @type {string} */
    var msg;

    ++indents;

    if (!indents) return;

    msg = suite.title;

    if (suite.main) method = getMethod(msg);
    else msg = breakStr(msg, indents);

    msg = chalk.white(msg);
    msg = mkIndent(indents) + msg;
    console.log(msg);
  });

  runner.on('suite end', function() {
    --indents;
    if (!indents) console.log();
  });

  runner.on('pending', function(test) {

    /** @type {string} */
    var msg;

    msg = '- ' + test.title;
    msg = indentStr(msg, indents + 2);
    msg = chalk.yellow(msg);
    msg = mkIndent(indents + 1) + msg;
    console.log(msg);
  });

  runner.on('pass', function(test) {

    /** @type {string} */
    var title;
    /** @type {string} */
    var msg;

    title = indentStr(test.title, indents + 2);
    title = chalk.white(title);

    if (test.speed !== 'fast') {
      msg = ' (' + test.duration + 'ms)';
      msg = test.speed === 'slow'
        ? chalk.red(msg)
        : chalk.yellow(msg);
    }

    msg = OK + ' ' + title + (msg || '');
    msg = mkIndent(indents + 1) + msg;
    console.log(msg);
  });

  runner.on('fail', function(test) {

    /** @type {string} */
    var msg;

    ++fails;
    msg = fails + ' ' + test.title;
    msg = indentStr(msg, indents + 2);
    msg = chalk.red(msg);
    msg = mkIndent(indents + 1) + msg;
    console.log(msg);
  });

  runner.on('end', self.epilogue.bind(self));
}

inherits(Specky, Base);

/**
 * @private
 * @param {number} indents
 * @return {string}
 */
function mkIndent(indents) {

  /** @type {string} */
  var indent;

  if (indents < 1) return '';

  indent = '';
  while (indents--) indent += '  ';
  return indent;
}

/**
 * @private
 * @param {string} title
 * @return {string}
 */
function getMethod(title) {
  return ALIAS.test(title)
    ? title.replace(ALIAS,  '$1')
    : title.replace(METHOD, '$1');
}
