/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getFileContent
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var FS = require('fs');

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFile = IS.file;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/fs.html#fs_fs_readfilesync_filename_options)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/fs.html#fs_fs_readfilesync_file_options)
 * @private
 * @param {string} filepath
 * @param {string=} encoding
 * @return {(string|!Buffer)}
 *   If no encoding is provided a buffer is returned. Otherwise a string of the
 *   file's content is returned.
 */
var readFile = FS.readFileSync;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} filepath
 * @param {boolean=} buffer = `false`
 * @return {(!Buffer|string)}
 */
module.exports = function getFileContent(filepath, buffer) {

  /** @type {string} */
  var content;

  if ( !isString(filepath) )
    throw new TypeError('invalid `filepath` type (must be a string)');
  if ( !isFile(filepath) )
    throw new Error('invalid `filepath` path (must be a readable file)');

  if ( !!buffer )
    return readFile(filepath);

  content = readFile(filepath, 'utf8');
  return content && content.replace(/\r\n?/g, '\n');
};
