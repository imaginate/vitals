/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: MOCHA REPORTER
 * -----------------------------------------------------------------------------
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
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [spec reporter]{@link https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js}.
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var Base = require('./base.js');
var inherits = require('util').inherits;
var cursor = Base.cursor;
var color = Base.color;
var ok = Base.symbols.ok;
ok = fuse(' ', ok);
ok = color(2, ok);

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

    /** @type {string} */
    var indent;
    /** @type {string} */
    var title;

    indent = fill(++indents, '  ');
    title = color(7, suite.title);
    title = fuse(indent, title);
    console.log(title);
  });

  runner.on('suite end', function() {
    --indents;
    if (!indents) console.log();
  });

  runner.on('pending', function(test) {

    /** @type {string} */
    var indent;
    /** @type {string} */
    var msg;

    indent = fill(indents, '  ');
    msg = fuse('  - ', test.title);
    msg = color(6, msg, true);
    msg = fuse(indent, msg);
    console.log(msg);
  });

  runner.on('pass', function(test) {

    /** @type {string} */
    var indent;
    /** @type {string} */
    var title;
    /** @type {string} */
    var msg;

    indent = fill(indents, '  ');
    title = color(7, test.title);
    msg = is.same(test.speed, 'fast') ? '' : fuse(' (', test.duration, 'ms)');
    msg = msg && color(is.same(test.speed, 'slow') ? 1 : 3, msg);
    msg = fuse(indent, ok, ' ', title, msg);
    cursor.CR();
    console.log(msg);
  });

  runner.on('fail', function(test) {

    /** @type {string} */
    var indent;
    /** @type {string} */
    var msg;

    indent = fill(indents, '  ');
    msg = fuse('  ', ++fails, ') ', test.title);
    msg = color(1, msg);
    msg = fuse(indent, msg);
    cursor.CR();
    console.log(msg);
  });

  runner.on('end', self.epilogue.bind(self));
}

inherits(Spec, Base);
