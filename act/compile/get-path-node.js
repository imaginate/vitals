/**
 * ---------------------------------------------------------------------------
 * GET-PATH-NODE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasOwn
/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasOwn = loadHelper('has-own-property');
/// #}}} @func hasOwn

/// #{{{ @func isDirNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDirNode = require('./dir.js').isDirNode;
/// #}}} @func isDirNode

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = require('./file.js').isFileNode;
/// #}}} @func isFileNode

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString
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
        : hasOwn(src.dirs, name)
          ? src.dirs[name]
          : hasOwn(src.files, name)
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
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isDirNode(src) && !isFileNode(src) )
    throw new TypeError('invalid `src` data type (valid types: `!Dir|!File`)');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type (valid types: `string`)');

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
