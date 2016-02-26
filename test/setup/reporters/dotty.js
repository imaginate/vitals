/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS MOCHA REPORTER: dotty
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [dot reporter]{@link https://github.com/mochajs/mocha/blob/master/lib/reporters/dot.js}.
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var inherits = require('util').inherits;
var chalk = require('chalk');
var Base = require('./base.js');

var DOT = Base.symbols.dot;

var SPEED = {
  'slow':   chalk.red.bold,
  'medium': chalk.yellow.bold,
  'fast':   chalk.white
};

module.exports = Dotty;

/**
 * Initialize a new `Dotty` test reporter.
 * @param {Runner} runner
 */
function Dotty(runner) {

  /** @type {number} */
  var width;
  /** @type {number} */
  var dots;
  /** @type {!Object} */
  var self;

  Base.call(this, runner);

  self = this;
  width = Base.window.width * 0.75;
  width = width | 0;
  width = width > 50 ? 50 : width;
  dots = -1;

  /**
   * @private
   * @param {(string|function)} color
   */
  function writeDot(color) {
    if (!(++dots % width)) process.stdout.write('\n  ');
    if ( is.str(color) ) color = chalk[color];
    process.stdout.write( color(DOT) );
  }

  runner.on('pending', function() {
    writeDot('yellow');
  });

  runner.on('pass', function(test) {
    writeDot( SPEED[test.speed] );
  });

  runner.on('fail', function() {
    writeDot('red');
  });

  runner.on('end', function() {
    console.log();
    self.epilogue();
  });
}

inherits(Dotty, Base);
