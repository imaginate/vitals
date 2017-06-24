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

/// #{{{ @const DOCS_HELPER_DIR
/**
 * @private
 * @const {string}
 */
var DOCS_HELPER_DIR = resolvePath(__dirname);
/// #}}} @const DOCS_HELPER_DIR

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

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setFileError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setFileError = setError.file;
/// #}}} @func setFileError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

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
    throw setTypeError(new TypeError, 'name', 'string');

  name = trimJsExt(name);

  if (!name)
    throw setEmptyError(new Error, 'name');

  name += '.js';
  path = resolvePath(DOCS_HELPER_DIR, name);

  if ( !isFile(path) ) {
    path = resolvePath(TASK_HELPER_DIR, name);

    if ( !isFile(path) )
      throw setError(new Error,
        'invalid readable file path for helper `name`\n' +
        '    file-name: `' + name + '`\n' +
        '    task-path: `' + path + '`\n' +
        '    docs-path: `' + resolvePath(DOCS_HELPER_DIR, name) + '`');
  }

  return require(path);
}
/// #}}} @func loadHelper

module.exports = loadHelper;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
