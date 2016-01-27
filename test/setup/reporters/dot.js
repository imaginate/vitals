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
var chalk = require('chalk');
var Base = require('./base.js');
var DOT = Base.symbols.dot;

var SPEED = {
  'slow':   'cyan',
  'medium': 'cyan',
  'fast':   'white'
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
  width = Base.window.width * 0.75;
  width = width | 0;
  width = width > 50 ? 50 : width;
  dots = -1;

  /**
   * @private
   * @param {string} color
   */
  function writeDot(color) {
    if ( is.same(++dots % width, 0) ) process.stdout.write('\n  ');
    process.stdout.write( chalk[color](DOT) );
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

inherits(Dot, Base);
