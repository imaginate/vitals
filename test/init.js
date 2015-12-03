/**
 * -----------------------------------------------------------------------------
 * INIT NPM TESTS FOR VITALS
 * -----------------------------------------------------------------------------
 * @file Use `$ npm test` to access this file. This file is maintained
 *   separately to ensure cross-compatibility with all node versions.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var log = console.log;
var is = require('node-are').is;
var fs = require('fs');
var cp = require('child_process');
var colors = require('colors/safe');


setupColors();
logTitle();
runTests();


/**
 * @private
 * @type {function}
 */
function setupColors() {
  colors.setTheme({
    start:  [ 'white',   'bold', 'bgBlue'  ],
    end:    [ 'white',   'bold', 'bgGreen' ],
    astart: [ 'magenta', 'bold', 'bgBlue'  ],
    aend:   [ 'yellow',  'bold', 'bgGreen' ]
  });
}

/**
 * @private
 * @type {function}
 */
function runTests() {

  /** @type {string} */
  var result;
  /** @type {string} */
  var chunks;

  result = cp.spawn('node', [
    './node_modules/mocha/bin/mocha',
    '--colors',
    '--recursive',
    '--require',
    './test/_setup/methods.js',
    './test/methods'
  ]);
  chunks = '';
  result.stdout.on('data', function(chunk) {
    chunks += chunk.toString();
  });
  result.stdout.on('close', function() {
    chunks = chunks.replace(/^\n/, '');
    log(chunks);
    logTitle(true);
  });
}

/**
 * @private
 * @param {boolean=} end
 */
function logTitle(end) {

  /** @type {string} */
  var msg;

  msg = end
    ? ( colors.end(' Finished') +
        colors.aend(' vitals ') +
        colors.end('Tests    ') )
    : ( colors.start(' Starting') +
        colors.astart(' vitals ') +
        colors.start('Tests    ') );
  log(msg);
  end && log('');
}
