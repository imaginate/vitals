/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getVersion
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var VERSION = /^[\s\S]+?"version": "([0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+.?[0-9]*)?)"[\s\S]*$/;

var getFile = require('./get-file');

/**
 * @return {string}
 */
module.exports = function getVersion() {

  /** @type {string} */
  var content;

  content = getFile('./package.json');
  return content.replace(VERSION, '$1');
};
