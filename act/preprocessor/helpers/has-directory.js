/**
 * ---------------------------------------------------------------------------
 * HAS-DIRECTORY HELPER
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

/// #{{{ @func appendSlash
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var appendSlash = loadTaskHelper('append-slash');
/// #}}} @func appendSlash

/// #{{{ @func escapeSource
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var escapeSource = loadTaskHelper('escape-source');
/// #}}} @func escapeSource

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasDirectory
/**
 * @public
 * @param {string} src
 *   The file path to check in.
 * @param {string} path
 *   The directory path to check for.
 * @return {boolean}
 */
function hasDirectory(src, path) {

  /** @type {!RegExp} */
  var pattern;
  /** @type {string} */
  var source;

  if ( !isString(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `string`');
  if (!src)
    throw new Error('invalid empty `string` for `src`');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');
  if (!path)
    throw new Error('invalid empty `string` for `path`');

  src = resolvePath(src);
  path = resolvePath(path);
  path = appendSlash(path);
  source = '^' + escapeSource(path);
  pattern = new RegExp(source);
  return pattern.test(src);
}
/// #}}} @func hasDirectory

module.exports = hasDirectory;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
