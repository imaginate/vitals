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
 * The below code is a modified version of the Mocha [dot reporter]{@link https://github.com/mochajs/mocha/blob/master/lib/reporters/dot.js}.
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var inherits = require('util').inherits;
var Base = require('./base.js');
var color = Base.color;
var dot = Base.symbols.dot;

var speeds = {
  'slow':   1,
  'medium': 3,
  'fast':   7
};

module.exports = Dot;

/**
 * Initialize a new `Dot` test reporter.
 * @param {Runner} runner
 */
function Dot(runner) {

  /** @type {number} */
  var width;
  /** @type {number} */
  var dots;
  /** @type {!Object} */
  var self;

  Base.call(this, runner);

  self = this;
  width = Base.window.width * .75 | 0;
  dots = -1;

  runner.on('pending', function() {
    if (++dots % width === 0) process.stdout.write('\n  ');
    process.stdout.write(color(3, dot));
  });

  runner.on('pass', function(test) {
    if (++dots % width === 0) process.stdout.write('\n  ');
    process.stdout.write( color(speeds[test.speed], dot) );
  });

  runner.on('fail', function() {
    if (++dots % width === 0) process.stdout.write('\n  ');
    process.stdout.write( color(1, dot) );
  });

  runner.on('end', function() {
    console.log();
    self.epilogue();
  });
}

inherits(Dot, Base);
