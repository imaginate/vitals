/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getFile
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var fs = require('fs');

/**
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
module.exports = function getFile(filepath, buffer) {

  /** @type {string} */
  var content;

  if (buffer) return fs.readFileSync(filepath);

  content = fs.readFileSync(filepath, 'utf8');
  return content && content.replace(/\r\n?/g, '\n');
};
