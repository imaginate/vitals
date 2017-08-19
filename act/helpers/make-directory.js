/**
 * ---------------------------------------------------------------------------
 * MAKE-DIRECTORY HELPER
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
 * @const {!Object}
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

/// #{{{ @func setDirError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setDirError = setError.dir;
/// #}}} @func setDirError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setFileModeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} mode
 * @return {!RangeError}
 */
var setFileModeError = setError.fileMode;
/// #}}} @func setFileModeError

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

/// #{{{ @func mkdir
/**
 * @private
 * @param {string} path
 * @param {string} mode
 * @return {void}
 */
var mkdir = FS.mkdirSync;
/// #}}} @func mkdir

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
var hasOption = require('./has-option.js');
/// #}}} @func hasOption

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = require('./has-own-enum-property.js');
/// #}}} @func hasOwnEnumProperty

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

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

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;
/// #}}} @func isRegExp

/// #{{{ @func isRootDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isRootDirectory = IS.rootDirectory;
/// #}}} @func isRootDirectory

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

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = require('./freeze-object.js');
/// #}}} @func freezeObject

/// #{{{ @func mergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var mergeObject = require('./merge-object.js');
/// #}}} @func mergeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func getParentPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function getParentPath(path) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-parent-path

  path = isRootDirectory(path)
    ? ''
    : trimPathName(path);

  /// #}}} @step get-parent-path

  /// #{{{ @step return-parent-path

  return path;

  /// #}}} @step return-parent-path
}
/// #}}} @func getParentPath

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #{{{ @func trimPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathName = require('./trim-path-name.js');
/// #}}} @func trimPathName

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group DEFAULTS
//////////////////////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLTS
/**
 * @private
 * @const {!Object<string, *>}
 * @dict
 */
var DFLTS = freezeObject({
  'mode': '0755',
  'parents': false
});
/// #}}} @const DFLTS

/// #}}} @group DEFAULTS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeDirectory
/**
 * @public
 * @param {string} path
 * @param {(?Object|?string)=} opts
 *   If the #opts is a `string`, the #opts.mode option is set to its value.
 * @param {string=} opts.mode = `"0755"`
 *   The file mode for the new directory path. Note that if a directory
 *   already exists at the #path, the file mode of the existing directory is
 *   **not** set to #opts.mode.
 * @param {boolean=} opts.parents = `false`
 *   If the #opts.parents option is set to `true`, any non-existing parent
 *   directories are created. Otherwise, an error is thrown if a parent
 *   directory does not exist.
 * @return {string}
 */
function makeDirectory(path, opts) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var dir;
  /** @type {!Error} */
  var err;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      opts = cloneObject(DFLTS);
      freezeObject(opts);
      break;
    default:
      if ( isUndefined(opts) || isNull(opts) ) {
        opts = cloneObject(DFLTS);
        freezeObject(opts);
        break;
      }

      if ( isString(opts) ) {
        if (!opts) {
          throw setEmptyError(new Error, 'opts.mode');
        }
        if ( !isFileMode(opts) ) {
          throw setFileModeError(new RangeError, opts);
        }
        opts = mergeObject(DFLTS, { 'mode': opts });
        freezeObject(opts);
        break;
      }

      if ( !isObject(opts) || isRegExp(opts) || isArray(opts) ) {
        throw setTypeError(new TypeError, 'opts', '(?Object|?string)=');
      }

      opts = cloneObject(opts);

      if ( !hasOption(opts, 'mode') ) {
        opts['mode'] = DFLTS['mode'];
      }
      else if ( !isString(opts['mode']) ) {
        throw setTypeError(new TypeError, 'opts.mode', 'string=');
      }
      else if (!opts['mode']) {
        throw setEmptyError(new Error, 'opts.mode');
      }
      else if ( !isFileMode(opts['mode']) ) {
        throw setFileModeError(new RangeError, opts['mode']);
      }

      if ( !hasOption(opts, 'parents') ) {
        opts['parents'] = DFLTS['parents'];
      }
      else if ( !isBoolean(opts['parents']) ) {
        throw setTypeError(new TypeError, 'opts.parents', 'boolean=');
      }

      freezeObject(opts);
  }

  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }

  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  if ( isFile(path) ) {
    throw setError(new Error,
      'file exists (instead of directory) at path set by `path` parameter\n'
      + '    path: `' + path + '`');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-existing-path

  if ( isDirectory(path) ) {
    return path;
  }

  /// #}}} @step check-existing-path

  /// #{{{ @step resolve-path

  path = resolvePath(path);

  /// #}}} @step resolve-path

  /// #{{{ @step get-parent-path

  dir = getParentPath(path);

  /// #}}} @step get-parent-path

  /// #{{{ @step verify-parent-directory

  if ( !!dir && !opts['parents'] && !isDirectory(dir) ) {
    throw setDirError(new Error, 'path', dir);
  }

  /// #}}} @step verify-parent-directory

  /// #{{{ @step make-parent-directories

  if (opts['parents']) {
    while ( !!dir && !isDirectory(dir) ) {
      makeDirectory(dir, opts);
      dir = getParentPath(dir);
    }
  }

  /// #}}} @step make-parent-directories

  /// #{{{ @step make-directory

  try {
    mkdir(path, opts['mode']);
  }
  catch (err) {
    throw setError(err, err.message);
  }

  /// #}}} @step make-directory

  /// #{{{ @step return-path

  return path;

  /// #}}} @step return-path
}
/// #}}} @func makeDirectory

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeDirectory;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
