/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS SETUP: METHODS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var isFile = require('../helpers/is-file');
var cutJSExt = require('../helpers/cut-js-ext');
var getFilepaths = require('../helpers/get-filepaths');

global.vitals = getMethods();

/**
 * @private
 * @return {!Object}
 */
function getMethods() {

  /** @type {!Array<string>} */
  var filenames;
  /** @type {string} */
  var filename;
  /** @type {string} */
  var filepath;
  /** @type {!Object} */
  var vitals;
  /** @type {string} */
  var method;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  vitals = {};

  filenames = getFilepaths('src/methods');
  len = filenames.length;
  i = -1;
  while (++i < len) {

    filename = filenames[i];
    method = cutJSExt(filename);

    filepath = '../../src/methods/' + filename;
    vitals[method] = require(filepath);

    filepath = 'src/methods/fs/' + filename;
    if ( isFile(filepath) ) {
      filepath = '../../' + filepath;
      merge(vitals[method], require(filepath));
    }
  }
  return vitals;
}
