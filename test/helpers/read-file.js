/**
 * ---------------------------------------------------------------------------
 * READ-FILE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var FS = require('fs');
/// #}}} @const FS

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

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

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

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

/// #}}} @group ERROR

/// #{{{ @group FS

/// #{{{ @func _readFile
/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/fs.html#fs_fs_readfilesync_filename_options)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/fs.html#fs_fs_readfilesync_file_options)
 * @private
 * @param {string} path
 * @param {string=} encoding
 * @return {(!Buffer|string)}
 *   If no #encoding is defined, a `buffer` is returned. Otherwise, a `string`
 *   of the file's content is returned.
 */
var _readFile = FS.readFileSync;
/// #}}} @func _readFile

/// #}}} @group FS

/// #{{{ @group IS

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group STRING

/// #{{{ @func setEol
/**
 * @private
 * @param {string} content
 * @param {string} eol
 * @return {string}
 */
var setEol = require('./set-eol.js');
/// #}}} @func setEol

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func readFile
/**
 * @public
 * @param {string} path
 * @param {boolean=} encode = `false`
 * @return {string}
 */
function readFile(path, encode) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var content;
  /** @type {!Error} */
  var err;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      encode = false;
      break;
    default:
      if ( isUndefined(encode) ) {
        encode = false;
      }
      else if ( !isBoolean(encode) ) {
        throw setTypeError(new TypeError, 'encode', 'boolean=');
      }
  }

  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }

  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  if ( !isFile(path) ) {
    throw setFileError(new Error, 'path', path);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-file-content

  try {
    content = encode
      ? _readFile(path, 'utf8')
      : _readFile(path).toString();
  }
  catch (err) {
    throw setError(err, err.message);
  }

  if (encode) {
    content = setEol(content, 'LF');
  }

  /// #}}} @step get-file-content

  /// #{{{ @step return-file-content

  return content;

  /// #}}} @step return-file-content
}
/// #}}} @func readFile

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = readFile;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
