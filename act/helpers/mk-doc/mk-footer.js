/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkFooter
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var getFile = require('../get-file');

var TEMPLATE = getFile('act/helpers/mk-doc/templates/footer.md');

/**
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkFooter(content, fscontent) {
  return TEMPLATE;
};
