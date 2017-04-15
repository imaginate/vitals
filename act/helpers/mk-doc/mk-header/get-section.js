/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getSection
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
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
