/**
 * ---------------------------------------------------------------------------
 * HAS-FILE-EXTENSION HELPER
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
var FILE_EXT = /[^\.\/]\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
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

  ext = '[^./](?:.[a-zA-Z0-9]+)*' + ext + '$';
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

/// #{{{ @func hasFileExtension
/**
 * @public
 * @param {string} path
 * @return {boolean}
 */
function hasFileExtension(path) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  return FILE_EXT.test(path);
}
/// #}}} @func hasFileExtension

/// #{{{ @func newHasFileExtension
/**
 * @public
 * @param {(!Array<string>|!Arguments<string>|...string)} ext
 *   If more than one file extension is defined, `newHasFileExtensions`, is
 *   called. If the #ext does not begin with a period, `"."`, one will be
 *   appended. The #ext must match the following `RegExp`:
 *   `/^\.?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/`.
 * @return {!function(string): boolean}
 */
function newHasFileExtension(ext) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ext');
    case 1:
      if ( isArray(ext) || isArguments(ext) ) {
        return newHasFileExtensions(ext);
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
      return newHasFileExtensions(arguments);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const FILE_EXT_PATT
  /**
   * @private
   * @const {!RegExp}
   */
  var FILE_EXT_PATT = makeFileExtensionPattern(ext);
  /// #}}} @const FILE_EXT_PATT

  /// #}}} @step set-constants

  /// #{{{ @step make-new-has-file-extension

  /// #{{{ @func hasFileExtension
  /**
   * @param {string} path
   * @return {boolean}
   */
  function hasFileExtension(path) {

    if (!arguments.length) {
      throw setNoArgError(new Error, 'path');
    }
    if ( !isString(path) ) {
      throw setTypeError(new TypeError, 'path', 'string');
    }
    if (!path) {
      throw setEmptyError(new Error, 'path');
    }

    return FILE_EXT_PATT.test(path);
  }
  /// #}}} @func hasFileExtension

  /// #}}} @step make-new-has-file-extension

  /// #{{{ @step return-new-has-file-extension

  return hasFileExtension;

  /// #}}} @step return-new-has-file-extension
}
/// #}}} @func newHasFileExtension

/// #{{{ @func newHasFileExtensions
/**
 * @public
 * @param {(!Array<string>|!Arguments<string>|...string)} exts
 *   For each file extension in #exts, if it does not begin with a period,
 *   `"."`, one will be appended. Each file extension must match the following
 *   `RegExp`: `/^\.?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/`.
 * @return {!function(string): boolean}
 */
function newHasFileExtensions(exts) {

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
        return newHasFileExtension(exts);
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

  /// #{{{ @step make-new-has-file-extensions

  /// #{{{ @func hasFileExtensions
  /**
   * @param {string} path
   * @return {boolean}
   */
  function hasFileExtensions(path) {

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
      if ( PATTS[i].test(path) ) {
        return true;
      }
    }
    return false;
  }
  /// #}}} @func hasFileExtensions

  /// #}}} @step make-new-has-file-extensions

  /// #{{{ @step return-new-has-file-extensions

  return hasFileExtensions;

  /// #}}} @step return-new-has-file-extensions
}
/// #}}} @func newHasFileExtension

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

hasFileExtension.construct = newHasFileExtension;

hasFileExtension.newHasFileExtension = newHasFileExtension;
hasFileExtension.newHasFileExt = newHasFileExtension;

hasFileExtension.newHasFileExtensions = newHasFileExtensions;
hasFileExtension.newHasFileExts = newHasFileExtensions;

module.exports = hasFileExtension;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
