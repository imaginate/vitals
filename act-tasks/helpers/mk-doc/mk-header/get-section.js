/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getSection
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var SECTION = /^[\s\S]+?@section ([a-z-]+)[\s\S]+$/;

/**
 * @param {string} content
 * @return {string}
 */
module.exports = function getSection(content) {
  return content.replace(SECTION, '$1');
};
