/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getVersion
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var VERSION = /[\s\S]+?"version": "([0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+.?[0-9]*)?)".*/;

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
