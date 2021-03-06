/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getTests
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var get = require('../../get-match');

var BASE = /^[a-z]+/;

var LINK = 'https://github.com/imaginate/vitals/blob/master/test/methods/';

/**
 * @param {string} method
 * @return {string}
 */
module.exports = function getTests(method) {

  /** @type {string} */
  var base;

  base = get(method, BASE);
  return LINK + base + '/' + method + '.js';
};
