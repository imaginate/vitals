/**
 * ---------------------------------------------------------------------------
 * TRIM-FILE-EXTENSION HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FILE_EXT
/**
 * @private
 * @const {!RegExp}
 */
var FILE_EXT = /\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
/// #}}} @const FILE_EXT

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const LEAD_DOT
/**
 * @private
 * @const {!RegExp}
 */
var LEAD_DOT = /^\./;
/// #}}} @const LEAD_DOT

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

/// #{{{ @group HAS

/// #{{{ @func hasFileExtension
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasFileExtension = require('./has-file-extension.js');
/// #}}} @func hasFileExtension

/// #{{{ @func newHasFileExtension
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)} ext
 *   If more than one file extension is defined, `newHasFileExtensions`, is
 *   called. If the #ext does not begin with a period, `"."`, one will be
 *   appended. The #ext must match the following `RegExp`:
 *   `/^\.?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/`.
 * @return {!function(string): boolean}
 */
var newHasFileExtension = hasFileExtension.construct;
/// #}}} @func newHasFileExtension

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArguments
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArguments = IS.args;
/// #}}} @func isArguments

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isFileExtension
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileExtension = IS.fileExtension;
/// #}}} @func isFileExtension

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeFileExtensionPattern
/**
 * @private
 * @param {string} ext
 * @return {!RegExp}
 */
function makeFileExtensionPattern(ext) {

  if ( !LEAD_DOT.test(ext) ) {
    ext = '.' + ext;
  }

  ext += '$';
  ext = ext.replace(/\./g, '\\.');
  return new RegExp(ext);
}
/// #}}} @func makeFileExtensionPattern

/// #{{{ @func makeFileExtensionPatterns
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>)} exts
 * @return {!Array<!RegExp>}
 */
function makeFileExtensionPatterns(exts) {

  /** @type {!Array<!RegExp>} */
  var patts;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = exts.length;
  patts = new Array(len);
  i = -1;
  while (++i < len) {
    patts[i] = makeFileExtensionPattern(exts[i]);
  }
  return freezeObject(patts);
}
/// #}}} @func makeFileExtensionPatterns

/// #{{{ @func makeFileExtensionTests
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>)} exts
 * @return {!Array<!function(string): boolean>}
 */
function makeFileExtensionTests(exts) {

  /** @type {!Array<!function(string): boolean>} */
  var tests;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = exts.length;
  tests = new Array(len);
  i = -1;
  while (++i < len) {
    tests[i] = newHasFileExtension(exts[i]);
  }
  return freezeObject(tests);
}
/// #}}} @func makeFileExtensionTests

/// #}}} @group MAKE

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = require('./freeze-object.js');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func trimFileExtension
/**
 * @public
 * @param {string} path
 * @return {string}
 */
function trimFileExtension(path) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  return hasFileExtension(path)
    ? path.replace(FILE_EXT, '')
    : path;
}
/// #}}} @func trimFileExtension

/// #{{{ @func newTrimFileExtension
/**
 * @public
 * @param {(!Array<string>|!Arguments<string>|...string)} ext
 *   If more than one file extension is defined, `newTrimFileExtensions`, is
 *   called. If the #ext does not begin with a period, `"."`, one will be
 *   appended. The #ext must match the following `RegExp`:
 *   `/^\.?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/`.
 * @return {!function(string): string}
 */
function newTrimFileExtension(ext) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ext');
    case 1:
      if ( isArray(ext) || isArguments(ext) ) {
        return newTrimFileExtensions(ext);
      }

      if ( !isString(ext) ) {
        throw setTypeError(new TypeError, 'ext', 'string');
      }
      if (!ext) {
        throw setEmptyError(new Error, 'ext');
      }
      if ( !isFileExtension(ext) ) {
        throw setError(new RangeError,
          'invalid characters in `ext` parameter\n' +
          '    valid-ext-regex: `/^\\.?[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*$/`\n' +
          '    invalid-ext-value: `"' + ext + '"`');
      }

      break;
    default:
      return newTrimFileExtensions(arguments);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PATT
  /**
   * @private
   * @const {!RegExp}
   */
  var PATT = makeFileExtensionPattern(ext);
  /// #}}} @const PATT

  /// #}}} @step set-constants

  /// #{{{ @step make-new-has-file-extension

  /// #{{{ @func hasFileExtension
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  var hasFileExtension = newHasFileExtension(ext);
  /// #}}} @func hasFileExtension

  /// #}}} @step make-new-has-file-extension

  /// #{{{ @step make-new-trim-file-extension

  /// #{{{ @func trimFileExtension
  /**
   * @param {string} path
   * @return {string}
   */
  function trimFileExtension(path) {

    if (!arguments.length) {
      throw setNoArgError(new Error, 'path');
    }
    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if (!path) {
      throw setEmptyError(new Error, 'path');
    }

    return hasFileExtension(path)
      ? path.replace(PATT, '')
      : path;
  }
  /// #}}} @func trimFileExtension

  /// #}}} @step make-new-trim-file-extension

  /// #{{{ @step return-new-trim-file-extension

  return trimFileExtension;

  /// #}}} @step return-new-trim-file-extension
}
/// #}}} @func newTrimFileExtension

/// #{{{ @func newTrimFileExtensions
/**
 * @public
 * @param {(!Array<string>|!Arguments<string>|...string)} exts
 *   For each file extension in #exts, if it does not begin with a period,
 *   `"."`, one will be appended. Each file extension must match the following
 *   `RegExp`: `/^\.?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/`.
 * @return {!function(string): string}
 */
function newTrimFileExtensions(exts) {

  /// #{{{ @step declare-variables

  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var ext;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'exts');
    case 1:
      if ( isString(exts) ) {
        return newTrimFileExtension(exts);
      }

      if ( !isArray(exts) && !isArguments(exts) ) {
        throw setTypeError(new TypeError, 'exts',
          '(!Array<string>|!Arguments<string>|...string)');
      }

      break;
    default:
      exts = arguments;
  }

  len = exts.length;
  i = -1;
  while (++i < len) {
    ext = exts[i];
    if ( !isString(ext) ) {
      throw setTypeError(new TypeError, 'ext', 'string');
    }
    if (!ext) {
      throw setEmptyError(new Error, 'ext');
    }
    if ( !isFileExtension(ext) ) {
      throw setError(new RangeError,
        'invalid characters in `ext` parameter\n' +
          '    valid-ext-regex: `/^\\.?[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*$/`\n' +
          '    invalid-ext-value: `"' + ext + '"`');
    }
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const TESTS
  /**
   * @private
   * @const {!Array<!function(string): boolean>}
   */
  var TESTS = makeFileExtensionTests(exts);
  /// #}}} @const TESTS

  /// #{{{ @const PATTS
  /**
   * @private
   * @const {!Array<!RegExp>}
   */
  var PATTS = makeFileExtensionPatterns(exts);
  /// #}}} @const PATTS

  /// #{{{ @const LEN
  /**
   * @private
   * @const {number}
   */
  var LEN = PATTS.length;
  /// #}}} @const LEN

  /// #}}} @step set-constants

  /// #{{{ @step make-new-trim-file-extensions

  /// #{{{ @func trimFileExtensions
  /**
   * @param {string} path
   * @return {string}
   */
  function trimFileExtensions(path) {

    /** @type {number} */
    var i;

    if (!arguments.length) {
      throw setNoArgError(new Error, 'path');
    }
    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if (!path) {
      throw setEmptyError(new Error, 'path');
    }

    i = -1;
    while (++i < LEN) {
      if ( TESTS[i](path) ) {
        path = path.replace(PATTS[i], '');
      }
    }
    return path;
  }
  /// #}}} @func trimFileExtensions

  /// #}}} @step make-new-trim-file-extensions

  /// #{{{ @step return-new-trim-file-extensions

  return trimFileExtensions;

  /// #}}} @step return-new-trim-file-extensions
}
/// #}}} @func newTrimFileExtension

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

trimFileExtension.construct = newTrimFileExtension;

trimFileExtension.newTrimFileExtension = newTrimFileExtension;
trimFileExtension.newTrimFileExt = newTrimFileExtension;

trimFileExtension.newTrimFileExtensions = newTrimFileExtensions;
trimFileExtension.newTrimFileExts = newTrimFileExtensions;

module.exports = trimFileExtension;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
