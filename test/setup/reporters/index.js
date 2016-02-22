/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS MOCHA REPORTER: default (spec)
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [spec reporter]{@link https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js}.
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var Base = require('./base.js');
var chalk = require('chalk');
var inherits = require('util').inherits;
var OK = chalk.green(Base.symbols.ok);

module.exports = Spec;

/**
 * Initialize a new `Spec` test reporter.
 * @param {Runner} runner
 */
function Spec(runner) {

  /** @type {number} */
  var indents;
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
    console.log(mkIndent(++indents) + suite.title);
  });

  runner.on('suite end', function() {
    --indents;
    if (!indents) console.log();
  });

  runner.on('pending', function(test) {

    /** @type {string} */
    var msg;

    msg = '  - ' + test.title;
    msg = chalk.yellow(msg);
    console.log(mkIndent(indents) + msg);
  });

  runner.on('pass', function(test) {

    /** @type {string} */
    var msg;

    if (test.speed !== 'fast') {
      msg = ' (' + test.duration + 'ms)';
      msg = test.speed === 'slow' ? chalk.red(msg) : chalk.yellow(msg);
    }
    else msg = '';
    msg = ' ' + OK + ' ' + chalk.white(test.title) + msg;
    console.log(mkIndent(indents) + msg);
  });

  runner.on('fail', function(test) {

    /** @type {string} */
    var msg;

    msg = '  ' + (++fails) + ') ' + test.title;
    msg = chalk.red(msg);
    console.log(mkIndent(indents) + msg);
  });

  runner.on('end', self.epilogue.bind(self));
}

inherits(Spec, Base);

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
  while (--indents) indent += '  ';
  return indent;
}
