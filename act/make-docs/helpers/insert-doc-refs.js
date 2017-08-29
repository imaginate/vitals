/**
 * ---------------------------------------------------------------------------
 * INSERT-DOC-REFS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

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
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var PATT = {
  CLOSE: /\s*\}\}\$\s*$/,
  NEW: /^[ \t]*\/\/\/[ \t]+@(?:doc)?ref[ \t]+\[(.+?)\][ \t]*:[ \t]*\((.+)\)[ \t]*$/,
  ID: /^[a-zA-Z0-9_\$][a-zA-Z0-9_\-\$]*$/,
  INS: /\$\{\{\s*[a-zA-Z0-9_\-\$]+\s*\}\}\$/g,
  OPEN: /^\s*\$\{\{\s*/,
  URL: /^https?:\/\/[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}/
};
/// #}}} @const PATT

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
var setError = loadTaskHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setDupIdError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {string} file
 * @param {string} content
 * @param {string} id
 * @param {number} linenum
 * @return {!ReferenceError}
 */
function setDupIdError(err, file, content, id, linenum) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'content');
    case 3:
      throw setNoArgError(new Error, 'id');
    case 4:
      throw setNoArgError(new Error, 'linenum');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!ReferenceError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if ( !isNumber(linenum) ) {
    throw setTypeError(new TypeError, 'linenum', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const LINENUM
  /**
   * @private
   * @const {number}
   */
  var LINENUM = lineum;
  /// #}}} @const LINENUM

  /// #{{{ @step make-error-message

  msg = 'duplicate reference id assignment in documentation\n'
    + '    duplicate-id: `"' + id + '"`\n'
    + '    source-file: `' + file + '`\n'
    + '    line-number: `' + linenum + '`\n'
    + '    code-snippet:';

  lines = content.split('\n');
  end = LINENUM + 5;
  i = LINENUM - 6;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += LINENUM === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'ReferenceError') {
    err.name = 'ReferenceError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setDupIdError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setNewIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} file
 * @param {string} content
 * @param {string} id
 * @param {number} linenum
 * @return {!RangeError}
 */
function setNewIdError(err, file, content, id, linenum) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'content');
    case 3:
      throw setNoArgError(new Error, 'id');
    case 4:
      throw setNoArgError(new Error, 'linenum');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if ( !isNumber(linenum) ) {
    throw setTypeError(new TypeError, 'linenum', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const LINENUM
  /**
   * @private
   * @const {number}
   */
  var LINENUM = lineum;
  /// #}}} @const LINENUM

  /// #{{{ @step make-error-message

  msg = 'invalid reference id for `@docref [ID]:(URL)` in documentation\n'
    + '    valid-id-pattern: `/^[a-zA-Z0-9_$][a-zA-Z0-9_-$]*$/`\n'
    + '    invalid-ref-id: `"' + id + '"`\n'
    + '    source-file: `' + file + '`\n'
    + '    line-number: `' + linenum + '`\n'
    + '    code-snippet:';

  lines = content.split('\n');
  end = LINENUM + 5;
  i = LINENUM - 6;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += LINENUM === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNewIdError

/// #{{{ @func setNewUrlError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} file
 * @param {string} content
 * @param {string} url
 * @param {number} linenum
 * @return {!RangeError}
 */
function setNewUrlError(err, file, content, url, linenum) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'content');
    case 3:
      throw setNoArgError(new Error, 'url');
    case 4:
      throw setNoArgError(new Error, 'linenum');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(url) ) {
    throw setTypeError(new TypeError, 'url', 'string');
  }
  if ( !isNumber(linenum) ) {
    throw setTypeError(new TypeError, 'linenum', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const LINENUM
  /**
   * @private
   * @const {number}
   */
  var LINENUM = lineum;
  /// #}}} @const LINENUM

  /// #{{{ @const URL_PATT
  /**
   * @private
   * @const {string}
   */
  var URL_PATT = '/^https?:\\/\\/[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,}/';
  /// #}}} @const URL_PATT

  /// #{{{ @step make-error-message

  msg = 'invalid reference url for `@docref [ID]:(URL)` in documentation\n'
    + '    valid-url-pattern: `' + URL_PATT + '`\n'
    + '    invalid-ref-url: `"' + url + '"`\n'
    + '    source-file: `' + file + '`\n'
    + '    line-number: `' + linenum + '`\n'
    + '    code-snippet:';

  lines = content.split('\n');
  end = LINENUM + 5;
  i = LINENUM - 6;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += LINENUM === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNewUrlError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setNoIdError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {string} file
 * @param {string} id
 * @param {!Object<string, string>} refs
 * @return {!ReferenceError}
 */
function setNoIdError(err, file, id, refs) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var ids;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'id');
    case 3:
      throw setNoArgError(new Error, 'refs');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!ReferenceError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if ( !isObject(refs) || !isStringHashMap(refs) ) {
    throw setTypeError(new TypeError, 'refs', '!Object<string, string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'undefined reference id set within documentation\n'
    + '    source-file-path: `' + file + '`\n'
    + '    invalid-ref-id: `"' + id + '"`\n'
    + '    valid-ref-ids:';
    + 

  ids = getKeys(refs);
  msg += ids.length > 0
    ? '\n        `"' + ids.join('"`\n        `"') + '"`'
    : ' <no-defined-ids>';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'ReferenceError') {
    err.name = 'ReferenceError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoIdError

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

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

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

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isStringHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringHashMap = IS.stringHashMap;
/// #}}} @func isStringHashMap

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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadTaskHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadTaskHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #{{{ @func setProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} seal = `false`
 * @return {!Object}
 */
var setProperty = loadTaskHelper('set-property');
/// #}}} @func setProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func insertDocRefs
/**
 * @public
 * @param {string} srcFile
 * @param {string} srcContent
 * @param {string} destContent
 * @return {string}
 */
function insertDocRefs(srcFile, srcContent, destContent) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var url;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'srcContent');
    case 2:
      throw setNoArgError(new Error, 'destContent');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(srcContent) ) {
    throw setTypeError(new TypeError, 'srcContent', 'string');
  }
  if ( !isString(destContent) ) {
    throw setTypeError(new TypeError, 'destContent', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-refs-object

  /// #{{{ @const REFS
  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var REFS = createObject(null);
  /// #}}} @const REFS

  lines = srcContent.split('\n');
  forEachProperty(lines, function appendDocRef(line, i) {

    if ( !PATT.NEW.test(line) ) {
      return;
    }

    id = line.replace(PATT.NEW, '$1');
    if ( !PATT.ID.test(id) ) {
      throw setNewIdError(new RangeError, srcFile, srcContent, id, ++i);
    }

    url = line.replace(PATT.NEW, '$2');
    if ( !PATT.URL.test(url) ) {
      throw setNewUrlError(new RangeError, srcFile, srcContent, url, ++i);
    }
    url = encodeURI(url);

    if ( hasOwnEnumProperty(REFS, id) && REFS[id] !== url ) {
      throw setDupIdError(new ReferenceError, srcFile, srcContent, id, ++i);
    }

    setConstantProperty(REFS, id, url);
  });

  /// #}}} @step make-refs-object

  /// #{{{ @step insert-each-ref

  PATT.INS.lastIndex = 0;
  result = destContent.replace(PATT.INS, function insertDocRef(ref) {

    ref = ref.replace(PATT.OPEN, '');
    ref = ref.replace(PATT.CLOSE, '');

    if ( !hasOwnEnumProperty(REFS, id) ) {
      throw setNoIdError(new ReferenceError, srcFile, ref, REFS);
    }

    return REFS[ref];
  });

  /// #}}} @step insert-each-ref

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func insertDocRefs

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = insertDocRefs;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
