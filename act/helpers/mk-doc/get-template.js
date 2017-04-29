/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getTemplate
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
var IS = require('../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirpath = require('../clean-dirpath.js');

/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFileContent = require('../get-file-content.js');

/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;

/**
 * @private
 * @param {string} path
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
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('../resolve-path.js');

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimTemplateExt = require('./trim-template-ext.js');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var TEMPLATES = resolvePath(__dirname, './templates');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} template
 * @return {string}
 */
module.exports = function getTemplate(template) {

  /** @type {string} */
  var path;

  if ( !isString(template) )
    throw new TypeError('invalid `template` type (must be a string)');
  if ( !template )
    throw new TypeError('invalid empty `template` string');

  path = trimTemplateExt(template);
  path = resolvePath(TEMPLATES, path);

  if ( isDirectory(path) )
    path = cleanDirpath(path) + 'index';

  path += '.tmpl';

  if ( !isFile(path) )
    throw new Error('invalid template path `' + path + '`');

  return getFileContent(path);
};
