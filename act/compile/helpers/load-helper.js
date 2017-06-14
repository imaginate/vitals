/**
 * ---------------------------------------------------------------------------
 * LOAD-HELPER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group INIT-HELPERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const COMPILE_HELPER_DIR
/**
 * @private
 * @const {string}
 */
var COMPILE_HELPER_DIR = resolvePath(__dirname);
/// #}}} @const COMPILE_HELPER_DIR

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const TASK_HELPER_DIR
/**
 * @private
 * @const {string}
 */
var TASK_HELPER_DIR = resolvePath(__dirname, '../../helpers');
/// #}}} @const TASK_HELPER_DIR

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
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
var trimJsExt = loadTaskHelper('trim-file-ext').construct('.js');
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
    throw new TypeError('invalid `name` data type\n' +
      '    valid-types: `string`');

  name = trimJsExt(name);

  if (!name)
    throw new Error('invalid empty `string` for `name`');

  name += '.js';
  path = resolvePath(COMPILE_HELPER_DIR, name);

  if ( !isFile(path) ) {
    path = resolvePath(TASK_HELPER_DIR, name);

    if ( !isFile(path) )
      throw new Error('invalid file path for `name`\n' +
        '    file-name: `' + name + '`\n' +
        '    task-path: `' + path + '`\n' +
        '    compile-path: `' + resolvePath(COMPILE_HELPER_DIR, name) + '`');
  }

  return require(path);
}
/// #}}} @func loadHelper

module.exports = loadHelper;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
