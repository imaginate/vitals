/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: toFile
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var is = require('./is');
var fs = require('fs');

/**
 * @param {(!Buffer|string)} content
 * @param {string} filepath
 * @return {(!Buffer|string)}
 */
module.exports = function toFile(content, filepath) {
  if ( is.buffer(content) ) fs.writeFileSync(filepath, content);
  else fs.writeFileSync(filepath, content, 'utf8');
  return content;
};
