/**
 * -----------------------------------------------------------------------------
 * ACT TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ act year` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

exports['desc'] = 'updates year in entire repo';
exports['value'] = '2xxx';
exports['method'] = updateYear;

var YEAR_FIND = /(copyright )2[0-9]{3}/ig;
var YEAR_VAL  = /^2[0-9]{3}$/;

var getFilepaths = require('./helpers/get-filepaths');
var getFile = require('./helpers/get-file');
var toFile = require('./helpers/to-file');

/**
 * @public
 * @param {string} year
 */
function updateYear(year) {

  /** @type {!Array<string>} */
  var files;

  if ( !isYear(year) ) throw new Error('invalid value (must be a year - 2xxx)');

  files = getFilepaths('.', true, /\.(?:js|md)$/);
  insertYears(files, year);
}

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && YEAR_VAL.test(year);
}

/**
 * @private
 * @param {!Array<string>} files
 * @param {string} year
 */
function insertYears(files, year) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = files.length;
  i = -1;
  while (++i < len) insertYear(files[i], year);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} year
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;

  year = '$1' + year;
  content = getFile(filepath);
  content = content.replace(YEAR_FIND, year);
  toFile(content, filepath);
}
