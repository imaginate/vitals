/**
 * ---------------------------------------------------------------------------
 * MAKE-DUMMY-PATHS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group TYPEDEFS
//////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
//////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {(string|!Array<string>)} Files
 */

/**
 * @typedef {!Object<string, (?Files|?Dirs)>} Dirs
 */

/// #}}} @group TYPEDEFS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func makeDirectory
/**
 * @private
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
var makeDirectory = require('./make-directory.js');
/// #}}} @func makeDirectory

/// #{{{ @func makeDummyFile
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var makeDummyFile = require('./make-dummy-file.js');
/// #}}} @func makeDummyFile

/// #}}} @group FS

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {Array}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

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

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolveDummyPath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolveDummyPath = require('./resolve-dummy-path.js');
/// #}}} @func resolveDummyPath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeDummyPaths
/**
 * @public
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
function makeDummyPaths(paths) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'paths');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-dummy-paths

  if ( isNull(paths) || isUndefined(paths) ) {
    return;
  }

  /// #}}} @step check-dummy-paths

  /// #{{{ @const DIRS
  /**
   * @private
   * @const {!Array<string>}
   */
  var DIRS = [];
  /// #}}} @const DIRS

  /// #{{{ @const FILES
  /**
   * @private
   * @const {!Array<string>}
   */
  var FILES = [];
  /// #}}} @const FILES

  /// #{{{ @func parseFile
  /**
   * @private
   * @param {string} path
   * @param {string} file
   * @return {void}
   */
  function parseFile(path, file) {

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'path');
      case 1:
        throw setNoArgError(new Error, 'file');
    }

    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if ( !isString(file) ) {
      throw setTypeError(new TypeError, 'file', 'string');
    }

    if (!file) {
      throw setEmptyError(new Error, 'file');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step parse-file

    path = resolveDummyPath(path, file);
    FILES.push(path);

    /// #}}} @step parse-file
  }
  /// #}}} @func parseFile

  /// #{{{ @func parseFiles
  /**
   * @private
   * @param {string} path
   * @param {!Array<string>} files
   * @return {void}
   */
  function parseFiles(path, files) {

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'path');
      case 1:
        throw setNoArgError(new Error, 'files');
    }

    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if ( !isArray(files) ) {
      throw setTypeError(new TypeError, 'files', '!Array<string>');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step parse-files

    forEachProperty(files, function _parsefile(file) {
      parseFile(path, file);
    });

    /// #}}} @step parse-files
  }
  /// #}}} @func parseFiles

  /// #{{{ @func parseDir
  /**
   * @private
   * @param {string} path
   * @param {string} dir
   * @return {void}
   */
  function parseDir(path, dir) {

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'path');
      case 1:
        throw setNoArgError(new Error, 'dir');
    }

    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if ( !isString(dir) ) {
      throw setTypeError(new TypeError, 'dir', 'string');
    }

    if (!dir) {
      throw setEmptyError(new Error, 'dir');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step parse-dir

    path = resolveDummyPath(path, dir);
    DIRS.push(path);

    /// #}}} @step parse-dir
  }
  /// #}}} @func parseDir

  /// #{{{ @func parseDirs
  /**
   * @private
   * @param {string} path
   * @param {!Dirs} dirs
   * @return {void}
   */
  function parseDirs(path, dirs) {

    /// #{{{ @step verify-parameters

    switch (arguments.length) {
      case 0:
        throw setNoArgError(new Error, 'path');
      case 1:
        throw setNoArgError(new Error, 'dirs');
    }

    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if ( !isPlainObject(dirs) ) {
      throw setTypeError(new TypeError, 'dirs', '!Dirs');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step parse-dirs

    forEachProperty(dirs, function _parseDir(val, key) {
      if ( isString(val) ) {
        parseFile(path, val);
      }
      else if ( isArray(val) ) {
        parseFiles(path, val);
      }
      else if ( isPlainObject(val) ) {
        parseDir(path, key);
        parseDirs(path, val);
      }
      else if ( isNull(val) ) {
        parseDir(path, key);
      }
      else if ( !isUndefined(val) ) {
        throw setTypeError(new TypeError, 'dirs.' + key, '(?Files|?Dirs)=');
      }
    });

    /// #}}} @step parse-dirs
  }
  /// #}}} @func parseDirs

  /// #{{{ @step parse-paths

  if ( isString(paths) ) {
    parseFile('', paths);
  }
  else if ( isArray(paths) ) {
    parseFiles('', paths);
  }
  else if ( isPlainObject(paths) ) {
    parseDirs('', paths);
  }
  else {
    throw setTypeError(new TypeError, 'paths', '(?Files|?Dirs)=');
  }

  /// #}}} @step parse-paths

  /// #{{{ @step make-dummy-directories

  forEachProperty(DIRS, makeDirectory);

  /// #}}} @step make-dummy-directories

  /// #{{{ @step make-dummy-files

  forEachProperty(FILES, makeDummyFile);

  /// #}}} @step make-dummy-files
}
/// #}}} @func makeDummyPaths

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeDummyPaths;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
