/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getTests
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var get = require('node-vitals')('get');
var fuse = require('node-vitals')('fuse');

var BASE = /^[a-z]+/;

var LINK = 'https://github.com/imaginate/vitals/blob/master/test/methods/';

/**
 * @param {string} method
 * @return {string}
 */
module.exports = function getTests(method) {

  /** @type {string} */
  var base;

  base = get(method, BASE)[0];
  return fuse(LINK, base, '/', method, '.js');
};
