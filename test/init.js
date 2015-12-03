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


runTests();


/**
 * @private
 * @type {function}
 */
function runTests() {
  setupColors();
  logSpace(1);
  getMethods().forEach(function(method) {
    runTest(method);
  });
}

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function runTest(method) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var chunks;
  /** @type {!Array} */
  var cmd;

  cmd = getCmd(method);
  result = cp.spawn(cmd[0], cmd.slice(1));
  chunks = '';
  result.stdout.on('data', function(chunk) {
    chunks += chunk.toString();
  });
  result.stdout.on('close', function() {
    logTitle(method);
    log(chunks);
    logTitle(method, true);
  });
}

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
 * @param {number} spaces
 */
function logSpace(spaces) {
  while (spaces--) log('');
}

/**
 * @private
 * @param {string} method
 * @param {boolean=} end
 */
function logTitle(method, end) {

  /** @type {string} */
  var msg;

  method = 'vitals.' + method;
  msg = end
    ? ( colors.end(' Finished ') +
        colors.aend(method)      +
        colors.end(' Tests    ') )
    : ( colors.start(' Starting ') +
        colors.astart(method)      +
        colors.start(' Tests    ') );
  log(msg);
  end && logSpace(3);
}

/**
 * @private
 * @param {string} method
 * @return {!Array}
 */
function getCmd(method) {
  return [
    'node',
    './node_modules/mocha/bin/mocha',
    '--colors',
    '--recursive',
    '--require',
    './test/_setup/methods.js',
    './test/methods/' + method
  ];
}

/**
 * @private
 * @return {!Array}
 */
function getMethods() {

  /** @type {!Array} */
  var methods;
  /** @type {string} */
  var base;

  base = 'src/methods/';
  methods = fs.readdirSync(base);
  methods = methods.filter(function(method) {
    return is.file(base + method);
  });
  return methods.map(function(method) {
    return method.replace(/\.js$/, '');
  });
}
