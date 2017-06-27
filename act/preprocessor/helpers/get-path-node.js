/**
 * ---------------------------------------------------------------------------
 * GET-PATH-NODE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasDirectory
/**
 * @private
 * @param {string} src
 *   The file path to check in.
 * @param {string} path
 *   The directory path to check for.
 * @return {boolean}
 */
var hasDirectory = require('./has-directory.js');
/// #}}} @func hasDirectory

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isDirNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDirNode = require('./is-directory-node.js');
/// #}}} @func isDirNode

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = require('./is-file-node.js');
/// #}}} @func isFileNode

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func trimDirectory
/**
 * @private
 * @param {string} src
 *   The file path to trim from.
 * @param {string} path
 *   The directory path to trim.
 * @return {string}
 */
var trimDirectory = require('./trim-directory.js');
/// #}}} @func trimDirectory

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getNode
/**
 * @private
 * @param {(!Dir|!File)} src
 * @param {string} name
 * @return {(?Dir|?File)}
 */
function getNode(src, name) {
  return !name || name === '.'
    ? src
    : name === '..'
      ? src.parent
      : isFileNode(src)
        ? null
        : hasOwnProperty(src.dirs, name)
          ? src.dirs[name]
          : hasOwnProperty(src.files, name)
            ? src.files[name]
            : null;
}
/// #}}} @func getNode

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getPathNode
/**
 * @public
 * @param {(!Dir|!File)} src
 * @param {string} path
 * @return {(?Dir|?File)}
 */
function getPathNode(src, path) {

  /** @type {!Array<string>} */
  var names;
  /** @type {(?Dir|?File)} */
  var node;
  /** @type {string} */
  var pwd;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');

  if ( isDirNode(src) )
    pwd = src.path;
  else if ( isFileNode(src) )
    pwd = src.parent.path;
  else
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `!Dir|!File`');

  path = resolvePath(pwd, path);

  if ( !isFile(path) && !isDirectory(path) )
    return null;
  if ( !hasDirectory(path, pwd) )
    return null;

  path = trimDirectory(path, pwd);
  names = path.split('/');
  node = src;
  len = names.length;
  i = -1;
  while (++i < len && node)
    node = getNode(node, names[i]);
  return node;
}
/// #}}} @func getPathNode

module.exports = getPathNode;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
