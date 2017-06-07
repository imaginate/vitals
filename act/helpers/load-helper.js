/**
 * ---------------------------------------------------------------------------
 * LOAD-HELPER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group INIT-HELPERS
//////////////////////////////////////////////////////////////////////////////
// INIT-HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath
/// #}}} @group INIT-HELPERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const HELPER_DIR
/**
 * @private
 * @const {string}
 */
var HELPER_DIR = resolvePath(__dirname);
/// #}}} @const HELPER_DIR

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = require('./is.js');
/// #}}} @const IS
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isFile
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func trimJsExt
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimJsExt = require('./trim-file-ext.js').construct('.js');
/// #}}} @func trimJsExt
/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @public
 * @param {string} name
 * @return {(!Object|!Function)}
 */
function loadHelper(name) {

  /** @type {string} */
  var path;

  if ( !isString(name) )
    throw new TypeError('invalid `name` data type (must be a `string`)');

  name = trimJsExt(name);

  if (!name)
    throw new Error('invalid empty `name` `string`');

  path = resolvePath(HELPER_DIR, name + '.js');

  if ( !isFile(path) )
    throw new Error('invalid `name` file path `' + path + '`');

  return require(path);
}
/// #}}} @func loadHelper

module.exports = loadHelper;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
