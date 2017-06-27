/**
 * ---------------------------------------------------------------------------
 * MAKE-DIRECTORY HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FS
/**
 * @private
 * @const {!Object}
 */
var FS = require('fs');
/// #}}} @const FS

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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileMode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileMode = IS.fileMode;
/// #}}} @func isFileMode

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #{{{ @func mkdir
/**
 * @private
 * @param {string} path
 * @param {string} mode
 * @return {void}
 */
var mkdir = FS.mkdirSync;
/// #}}} @func mkdir

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeDirectory
/**
 * @public
 * @param {string} path
 * @param {string=} mode = `"0755"`
 * @return {string}
 */
function makeDirectory(path, mode) {

  /** @type {!Error} */
  var err;

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');

  if ( isUndefined(mode) )
    mode = "0755";
  else if ( !isString(mode) )
    throw setTypeError(new TypeError, 'mode', 'string');
  else if (!mode)
    throw setEmptyError(new Error, 'mode');
  else if ( !isFileMode(mode) )
    throw setError(new RangeError,
      'invalid file mode for `mode` parameter\n' +
      '    valid-mode-regex: `/^0?[0-7]{1,3}$/`\n' +
      '    received-mode: `' + mode + '`');

  path = resolvePath(path);

  if ( isDirectory(path) )
    return path;

  if ( isFile(path) )
    throw setError(new Error,
      'file exists at directory path set by `path` parameter\n' +
      '    received-path: `' + path + '`');

  try {
    mkdir(path, mode);
  }
  catch (err) {
    throw setError(err, err.message);
  }
  return path;
}
/// #}}} @func makeDirectory

module.exports = makeDirectory;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
