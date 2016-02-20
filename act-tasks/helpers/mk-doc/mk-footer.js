/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkFooter
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var getFile = require('../get-file');

var TEMPLATE = getFile('act-tasks/helpers/mk-doc/templates/footer.md');

/**
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkFooter(content, fscontent) {
  return TEMPLATE;
};
