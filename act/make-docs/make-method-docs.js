/**
 * ---------------------------------------------------------------------------
 * MAKE-METHOD-DOCS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./.load-helper.js');
/// #}}} @func loadHelper

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
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !Object<string, !RegExp>>}
 * @struct
 */
var PATT = {
  BODY: {
    ALIAS: /^[ \t]*\/\/\/[ \t]+@alias[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/,
    DESC_LINE: /^[ \t]+\*[ \t]{3}/,
    DESC_TAG: /^[ \t]+\*[ \t]@desc(?:ription)?[ \t]*$/,
    DETAILS_CLOSE: /^[ \t]*\/\*\*[ \t]*$/,
    DETAILS_OPEN: /^[ \t]*\*\/[ \t]*$/,
    EMPTY: /^[ \t]+\*[ \t]{0,2}$/,
    METHOD: /^[ \t]*\/\/\/[ \t]+@method[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/,
    PARAM: /^@param(?:eter)?[ \t]+\{(.+?)\}[ \t]+([a-zA-Z_\.\$]+)(?:[ \t]*=[ \t]*`.+?`)?[ \t]*$/,
    PARAM_DFLT: /^@param(?:eter)?[ \t]+\{.+?\}[ \t]+[a-zA-Z_\.\$]+[ \t]*=[ \t]*`(.+?)`[ \t]*$/,
    PARAM_LINE: /^[ \t]+\*[ \t]/,
    PARAM_TAG: /^[ \t]+\*[ \t]@param(?:eter)?[ \t]/,
    RETURN_LINE: /^[ \t]+\*[ \t]/,
    RETURN_TAG: /^[ \t]+\*[ \t]@returns?[ \t]/,
    SECTION: /^[ \t]*\/\/\/[ \t]+@section[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/
  },
  DOCS: {
    SUPER: /^[ \t]*\/\/\/[ \t]+@super[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/m
  },
  HEADER: {
    ALIAS: /^[ \t]*\/\/\/[ \t]+@alias[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/,
    METHOD: /^[ \t]*\/\/\/[ \t]+@method[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/,
    SECTION: /^[ \t]*\/\/\/[ \t]+@section[ \t]+([a-zA-Z0-9_\.]+)[ \t]*$/
  }
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
var setError = loadHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setDetailsError
/**
 * @private
 * @param {!Error} err
 * @param {string} method
 * @param {!Array<string>} details
 * @param {number} index
 * @return {!Error}
 */
function setDetailsError(err, method, details, index) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'method');
    case 2:
      throw setNoArgError(new Error, 'details');
    case 3:
      throw setNoArgError(new Error, 'index');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(details) || !isStringList(details) ) {
    throw setTypeError(new TypeError, 'details', '!Array<string>');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid documentation line for `' + method + '`\n'
    + '    code-snippet:';

  forEachProperty(details, function appendDetailToMsg(line, i) {
    line = !!line
      ? line.replace(/`/g, '\\`')
      : ' ';
    msg += '\n    ';
    msg += i === index
      ? '-->'
      : '   ';
    msg += ' `' + line + '`';
  });

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setDetailsError

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

/// #{{{ @func setExtError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {(string|!Array<string>)} exts
 * @return {!RangeError}
 */
var setExtError = setError.ext;
/// #}}} @func setExtError

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

/// #{{{ @func setIndexError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
var setIndexError = setError.index;
/// #}}} @func setIndexError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setNoCloseError
/**
 * @private
 * @param {!Error} err
 * @param {string} file
 * @param {string} content
 * @param {number} linenum
 * @return {!Error}
 */
function setNoCloseError(err, file, content, linenum) {

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
      throw setNoArgError(new Error, 'linenum');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
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

  msg = 'unclosed comment in documentation`\n'
    + '    source-file-path: `' + file + '`\n'
    + '    open-line-number: `' + linenum + '`\n'
    + '    code-snippet:';

  lines = content.split('\n');
  end = LINENUM + 5;
  i = LINENUM - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line = line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += LINENUM === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoCloseError

/// #{{{ @func setNoDetailsError
/**
 * @private
 * @param {!Error} err
 * @param {string} file
 * @param {string} content
 * @param {string} method
 * @param {number} open
 * @param {number=} close
 * @return {!Error}
 */
function setNoDetailsError(err, file, content, method, open, close) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var linenum;
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
      throw setNoArgError(new Error, 'method');
    case 4:
      throw setNoArgError(new Error, 'open');
    case 5:
      close = undefined;
      break;
    default:
      if ( !isUndefined(close) && !isNumber(close) ) {
        throw setTypeError(new TypeError, 'close', 'number=');
      }
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isNumber(open) ) {
    throw setTypeError(new TypeError, 'open', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const OPEN
  /**
   * @private
   * @const {number}
   */
  var OPEN = open;
  /// #}}} @const OPEN

  /// #{{{ @const CLOSE
  /**
   * @private
   * @const {(number|undefined)}
   */
  var CLOSE = close;
  /// #}}} @const CLOSE

  /// #{{{ @step make-error-message

  msg = isUndefined(CLOSE)
    ? 'missing `/**` to open `' + method + '` details'
    : 'missing `' + method + '` details in between `/**` and `*/`';

  msg += '\n'
    + '    source-file-path: `' + file + '`\n'
    + '    open-line-number: `' + OPEN + '`';

  if ( !isUndefined(CLOSE) ) {
    msg += '\n    close-line-number: `' + CLOSE + '`';
  }

  msg += '\n    code-snippet:';

  lines = content.split('\n');
  end = OPEN + 7;
  i = OPEN - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line = line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += OPEN === linenum || CLOSE === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoDetailsError

/// #{{{ @func setNoMethodError
/**
 * @private
 * @param {!Error} err
 * @param {string} file
 * @param {string} content
 * @param {number} linenum
 * @return {!Error}
 */
function setNoMethodError(err, file, content, linenum) {

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
      throw setNoArgError(new Error, 'linenum');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
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

  msg = 'missing `@method METHOD` after `@section SECTION`\n'
    + '    source-file: `' + file + '`\n'
    + '    line-number: `' + linenum + '`\n'
    + '    code-snippet:';

  lines = content.split('\n');
  end = LINENUM + 5;
  i = LINENUM - 9;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    line = lines[i] || ' ';
    line = line.replace(/`/g, '\\`');
    linenum = ++i;
    msg += '\n    ';
    msg += LINENUM === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoMethodError

/// #{{{ @func setParamError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} method
 * @param {!Array<string>} lines
 * @return {!RangeError}
 */
function setParamError(err, method, lines) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'method');
    case 2:
      throw setNoArgError(new Error, 'lines');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @const PRE
  /**
   * @private
   * @const {string}
   */
  var PRE = '^[ \\t]+\\*[ \\t]';
  /// #}}} @const PRE

  /// #{{{ @const PATT
  /**
   * @private
   * @const {string}
   */
  var PATT = '@param(eter)?[ \\t]+\\{.+?\\}[ \\t]+'
    + '[a-zA-Z_\\.\\$]+([ \\t]*=[ \\t]*`.+?`)?[ \\t]*$';
  /// #}}} @const PATT

  /// #{{{ @step make-error-message

  msg = 'invalid parameter documentation for `' + method + '`\n'
    + '    full-valid-line-pattern: `/' + PRE + PATT + '/`\n'
    + '    trimmed-valid-pattern: `/' + PATT + '/`\n'
    + '    trimmed-invalid-line: `"' + (lines[0] || '') + '"`\n'
    + '    trimmed-code-snippet:';

  forEachProperty(lines, function appendLineToMsg(line, i) {
    line = !!line
      ? line.replace(/`/g, '\\`')
      : ' ';
    msg += '\n    ';
    msg += i === 0
      ? '-->'
      : '   ';
    msg += ' `' + line + '`';
  });

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
/// #}}} @func setParamError

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

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func hasMdFileExtension
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasMdFileExtension = loadHelper('has-file-extension').construct('.md');
/// #}}} @func hasMdFileExtension

/// #{{{ @func trimPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathName = loadHelper('trim-path-name');
/// #}}} @func trimPathName

/// #}}} @group PATH

/// #{{{ @group SPECIAL

/// #{{{ @func getMethodId
/**
 * @private
 * @param {string} method
 * @return {string}
 */
var getMethodId = loadHelper('get-method-id');
/// #}}} @func getMethodId

/// #{{{ @func getTemplate
/**
 * @private
 * @param {string} template
 * @return {string}
 */
var getTemplate = loadHelper('get-template');
/// #}}} @func getTemplate

/// #{{{ @func insertDocRefs
/**
 * @private
 * @param {string} srcFile
 * @param {string} srcContent
 * @param {string} destContent
 * @return {string}
 */
var insertDocRefs = loadHelper('insert-doc-refs');
/// #}}} @func insertDocRefs

/// #{{{ @func insertMentions
/**
 * @private
 * @param {string} srcFile
 * @param {string} content
 * @return {string}
 */
var insertMentions = loadHelper('insert-mentions');
/// #}}} @func insertMentions

/// #{{{ @func insertTag
/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
var insertTag = loadHelper('insert-tag');
/// #}}} @func insertTag

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group TEMPLATES
//////////////////////////////////////////////////////////////////////////////
// TEMPLATES
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const TMPL
/**
 * @private
 * @const {!Object<string, !Object<string, string>>}
 * @struct
 */
var TMPL = freezeObject({
  BODY: {
    MAIN: getTemplate('method/body'),
    PARAM: getTemplate('method/body/param'),
    RETURNS: getTemplate('method/body/returns')
  },
  FOOTER: {
    MAIN: getTemplate('footer')
  },
  HEADER: {
    MAIN: getTemplate('method/header'),
    ROW: getTemplate('method/header/row'),
    ALIAS: getTemplate('method/header/alias').replace(/\n/g, '')
  }
}, true);
/// #}}} @const TMPL

/// #}}} @group TEMPLATES

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeMethodBody
/**
 * @private
 * @param {string} srcFile
 * @param {string} content
 * @param {string} superMethod
 * @return {string}
 */
function makeMethodBody(srcFile, content, superMethod) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var aliases;
  /** @type {!Array<string>} */
  var details;
  /** @type {string} */
  var section;
  /** @type {string} */
  var method;
  /** @type {string} */
  var result;
  /** @type {string} */
  var alias;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {number} */
  var last;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'content');
    case 2:
      throw setNoArgError(new Error, 'superMethod');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(superMethod) ) {
    throw setTypeError(new TypeError, 'superMethod', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }
  if (!superMethod) {
    throw setEmptyError(new Error, 'superMethod');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-body

  result = '';
  lines = content.split('\n');
  last = lines.length - 1;
  i = -1;
  while (i++ < last) {
    line = lines[i];
    if ( PATT.BODY.SECTION.test(line) ) {
      section = line.replace(PATT.BODY.SECTION, '$1');
      if (++i > last) {
        throw setNoMethodError(new Error, srcFile, content, i);
      }
      line = lines[i];
      if ( !PATT.BODY.METHOD.test(line) ) {
        throw setNoMethodError(new Error, srcFile, content, i);
      }
      method = line.replace(PATT.BODY.METHOD, '$1');
      aliases = [];
      while ( i < last && PATT.BODY.ALIAS.test(lines[i + 1]) ) {
        line = lines[++i];
        alias = line.replace(PATT.BODY.ALIAS, '$1');
        aliases.push(alias);
      }
      if (++i > last) {
        throw setNoDetailsError(new Error, srcFile, content, method, i);
      }
      line = lines[i];
      if ( !PATT.BODY.DETAILS_OPEN.test(line) ) {
        throw setNoDetailsError(new Error, srcFile, content, method, i);
      }
      if (++i > last) {
        throw setNoCloseError(new Error, srcFile, content, i);
      }
      line = lines[i];
      if ( PATT.BODY.DETAILS_CLOSE.test(line) ) {
        throw setNoDetailsError(new Error, srcFile, content, method, i, ++i);
      }
      details = [];
      while ( !PATT.BODY.DETAILS_CLOSE.test(line) ) {
        details.push(line);
        if (++i > last) {
          i -= details.length;
          throw setNoCloseError(new Error, srcFile, content, i);
        }
        line = lines[i];
      }
      result += makeMethodBodyDetail(section, superMethod, method, aliases,
        details);
    }
  }

  result = insertDocRefs(srcFile, content, result);

  /// #}}} @step build-body

  /// #{{{ @step return-body

  return result;

  /// #}}} @step return-body
}
/// #}}} @func makeMethodBody

/// #{{{ @func makeMethodBodyDetail
/**
 * @private
 * @param {string} section
 * @param {string} superMethod
 * @param {string} method
 * @param {!Array<string>} aliases
 * @param {!Array<string>} details
 * @return {string}
 */
function makeMethodBodyDetail(section, superMethod, method, aliases, details) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {number} */
  var param;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var part;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'section');
    case 1:
      throw setNoArgError(new Error, 'superMethod');
    case 2:
      throw setNoArgError(new Error, 'method');
    case 3:
      throw setNoArgError(new Error, 'aliases');
    case 4:
      throw setNoArgError(new Error, 'details');
  }

  if ( !isString(section) ) {
    throw setTypeError(new TypeError, 'section', 'string');
  }
  if ( !isString(superMethod) ) {
    throw setTypeError(new TypeError, 'superMethod', 'string');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(aliases) || !isStringList(aliases) ) {
    throw setTypeError(new TypeError, 'aliases', '!Array<string>');
  }
  if ( !isArray(details) || !isStringList(details) ) {
    throw setTypeError(new TypeError, 'details', '!Array<string>');
  }

  if (!section) {
    throw setEmptyError(new Error, 'section');
  }
  if (!superMethod) {
    throw setEmptyError(new Error, 'superMethod');
  }
  if (!method) {
    throw setEmptyError(new Error, 'method');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-body-detail

  result = TMPL.BODY.MAIN;
  len = details.length;
  i = 0;

  part = '';
  if ( PATT.BODY.DESC_TAG.test(details[i]) ) {
    lines = [];
    while ( ++i < len && PATT.BODY.DESC_LINE.test(details[i]) ) {
      line = details[i].replace(PATT.BODY.DESC_LINE, '');
      lines.push(line);
    }
    part = parseToHtml(lines, {
      'github': true
    });
  }
  result = insertTag(result, 'intro', part);

  while ( i < len && PATT.BODY.EMPTY.test(details[i]) ) {
    ++i;
  }

  part = '';
  param = 0;
  while ( i < len && PATT.BODY.PARAM_TAG.test(details[i]) ) {
    lines = [];
    line = details[i].replace(PATT.BODY.PARAM_LINE, '');
    lines.push(line);
    while ( ++i < len && PATT.BODY.DESC_LINE.test(details[i]) ) {
      line = details[i].replace(PATT.BODY.DESC_LINE, '');
      lines.push(line);
    }
    while ( i < len && PATT.BODY.EMPTY.test(details[i]) ) {
      ++i;
    }
    part += makeMethodBodyDetailParam(section, superMethod, method, lines,
      ++param);
  }
  result = insertTag(result, 'params', part);

  while ( i < len && PATT.BODY.EMPTY.test(details[i]) ) {
    ++i;
  }

  part = '';
  if ( i < len && PATT.BODY.RETURN_TAG.test(details[i]) ) {
    lines = [];
    line = details[i].replace(PATT.BODY.RETURN_LINE, '');
    lines.push(line);
    while ( ++i < len && PATT.BODY.DESC_LINE.test(details[i]) ) {
      line = details[i].replace(PATT.BODY.DESC_LINE, '');
      lines.push(line);
    }
    part = makeMethodBodyDetailReturn(section, superMethod, method, lines);
  }
  result = insertTag(result, 'returns', part);

  while ( i < len && PATT.BODY.EMPTY.test(details[i]) ) {
    ++i;
  }

  if (i < len) {
    throw setDetailsError(new Error, method, details, i);
  }

  result = insertTag(result, 'method', method);
  result = insertTag(result, 'super', superMethod);

  part = getMethodId(method);
  result = insertTag(result, 'id', part);

  /// #}}} @step build-body-detail

  /// #{{{ @step return-body-detail

  return result;

  /// #}}} @step return-body-detail
}
/// #}}} @func makeMethodBodyDetail

/// #{{{ @func makeMethodBodyDetailParam
/**
 * @private
 * @param {string} section
 * @param {string} superMethod
 * @param {string} method
 * @param {!Array<string>} lines
 * @param {number} index
 * @return {string}
 */
function makeMethodBodyDetailParam(section, superMethod, method, lines, index) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {string} */
  var part;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'section');
    case 1:
      throw setNoArgError(new Error, 'superMethod');
    case 2:
      throw setNoArgError(new Error, 'method');
    case 3:
      throw setNoArgError(new Error, 'lines');
    case 4:
      throw setNoArgError(new Error, 'index');
  }

  if ( !isString(section) ) {
    throw setTypeError(new TypeError, 'section', 'string');
  }
  if ( !isString(superMethod) ) {
    throw setTypeError(new TypeError, 'superMethod', 'string');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }

  if (!section) {
    throw setEmptyError(new Error, 'section');
  }
  if (!superMethod) {
    throw setEmptyError(new Error, 'superMethod');
  }
  if (!method) {
    throw setEmptyError(new Error, 'method');
  }

  if ( !lines.length || !PATT.BODY.PARAM.test(lines[0]) ) {
    throw setParamError(new RangeError, method, lines);
  }

  if ( !isWholeNumber(index) || index < 0 ) {
    throw setIndexError(new RangeError, 'index', index, 0);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-body-detail-parameter

  result = TMPL.BODY.PARAM;

  part = index > 0
    ? String(index)
    : '';
  result = insertTag(result, 'index', part);

  line = lines[0];

  part = line.replace(PATT.BODY.PARAM, '$1');
  result = insertTag(result, 'type', part);

  part = line.replace(PATT.BODY.PARAM, '$2');
  result = insertTag(result, 'param', part);

  part = part.replace(/\./g, '-');
  result = insertTag(result, 'param-id', part);

  part = PATT.BODY.PARAM_DFLT.test(line)
    ? line.replace(PATT.BODY.PARAM_DFLT, '$1')
    : '';
  result = insertTag(result, 'dflt', part);

  lines.shift();
  part = parseToHtml(lines, {
    'github': true
  });
  result = insertTag(result, 'desc', part);

  /// #}}} @step build-body-detail-parameter

  /// #{{{ @step return-body-detail-parameter

  return result;

  /// #}}} @step return-body-detail-parameter
}
/// #}}} @func makeMethodBodyDetailParam

/// #{{{ @func makeMethodDocs
/**
 * @public
 * @param {string} srcFile
 * @param {string} destFile
 * @param {string} content
 * @return {string}
 */
function makeMethodDocs(srcFile, destFile, content) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var superMethod;
  /** @type {string} */
  var result;
  /** @type {string} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'destFile');
    case 2:
      throw setNoArgError(new Error, 'content');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(destFile) ) {
    throw setTypeError(new TypeError, 'destFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }
  if (!destFile) {
    throw setEmptyError(new Error, 'destFile');
  }

  if ( !isFile(srcFile) ) {
    throw setFileError(new Error, 'srcFile', srcFile);
  }

  if ( !hasMdFileExtension(destFile) ) {
    throw setExtError(new RangeError, 'destFile', destFile, '.md');
  }

  dir = trimPathName(destFile);

  if ( !isDirectory(dir) ) {
    throw setDirError(new Error, 'destFile', dir);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-super-method

  if ( !PATT.DOCS.SUPER.test(content) ) {
    throw setNoSuperError(new Error, srcFile, content);
  }

  /// #}}} @step verify-super-method

  /// #{{{ @step get-super-method

  superMethod = content.replace(PATT.DOCS.SUPER, '$1');

  /// #}}} @step get-super-method

  /// #{{{ @step make-each-section

  result = makeMethodHeader(srcFile, content, superMethod);
  result += makeMethodBody(srcFile, content, superMethod);
  result += makeMethodFooter(srcFile, content, superMethod);

  /// #}}} @step make-each-section

  /// #{{{ @step insert-mentions

  result = insertMentions(srcFile, result);

  /// #}}} @step insert-mentions

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func makeMethodDocs

/// #{{{ @func makeMethodFooter
/**
 * @private
 * @param {string} srcFile
 * @param {string} content
 * @param {string} superMethod
 * @return {string}
 */
function makeMethodFooter(srcFile, content, superMethod) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'content');
    case 2:
      throw setNoArgError(new Error, 'superMethod');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(superMethod) ) {
    throw setTypeError(new TypeError, 'superMethod', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }
  if (!superMethod) {
    throw setEmptyError(new Error, 'superMethod');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-footer

  return TMPL.FOOTER.MAIN;

  /// #}}} @step return-footer
}
/// #}}} @func makeMethodFooter

/// #{{{ @func makeMethodHeader
/**
 * @private
 * @param {string} srcFile
 * @param {string} content
 * @param {string} superMethod
 * @return {string}
 */
function makeMethodHeader(srcFile, content, superMethod) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var rows;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'content');
    case 2:
      throw setNoArgError(new Error, 'superMethod');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(superMethod) ) {
    throw setTypeError(new TypeError, 'superMethod', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }
  if (!superMethod) {
    throw setEmptyError(new Error, 'superMethod');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-header

  rows = makeMethodHeaderRows(srcFile, content);

  result = TMPL.HEADER.MAIN;
  result = insertTag(result, 'rows', rows);
  result = insertTag(result, 'super', superMethod);

  /// #}}} @step build-header

  /// #{{{ @step return-header

  return result;

  /// #}}} @step return-header
}
/// #}}} @func makeMethodHeader

/// #{{{ @func makeMethodHeaderRow
/**
 * @private
 * @param {string} section
 * @param {string} method
 * @param {!Array<string>} aliases
 * @return {string}
 */
function makeMethodHeaderRow(section, method, aliases) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var alias;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'section');
    case 1:
      throw setNoArgError(new Error, 'method');
    case 2:
      throw setNoArgError(new Error, 'aliases');
  }

  if ( !isString(section) ) {
    throw setTypeError(new TypeError, 'section', 'string');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isArray(aliases) || !isStringList(aliases) ) {
    throw setTypeError(new TypeError, 'aliases', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-header-row

  id = getMethodId(method);
  alias = makeMethodHeaderRowAlias(aliases);

  result = TMPL.HEADER.ROW;
  result = insertTag(result, 'id', id);
  result = insertTag(result, 'alias', alias);
  result = insertTag(result, 'method', method);
  result = insertTag(result, 'section', section);

  /// #}}} @step build-header-row

  /// #{{{ @step return-header-row

  return result;

  /// #}}} @step return-header-row
}
/// #}}} @func makeMethodHeaderRow

/// #{{{ @func makeMethodHeaderRowAlias
/**
 * @private
 * @param {!Array<string>} aliases
 * @return {string}
 */
function makeMethodHeaderRowAlias(aliases) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'aliases');
  }
  if ( !isArray(aliases) || !isStringList(aliases) ) {
    throw setTypeError(new TypeError, 'aliases', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-header-row-alias

  result = '';
  forEachProperty(aliases, function appendMethodHeaderRowAlias(alias) {
    if (alias) {
      result += insertTag(TMPL.HEADER.ALIAS, 'alias', alias);
    }
  });

  /// #}}} @step build-header-row-alias

  /// #{{{ @step return-header-row-alias

  return result;

  /// #}}} @step return-header-row-alias
}
/// #}}} @func makeMethodHeaderRowAlias

/// #{{{ @func makeMethodHeaderRows
/**
 * @private
 * @param {string} srcFile
 * @param {string} content
 * @return {string}
 */
function makeMethodHeaderRows(srcFile, content) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var aliases;
  /** @type {string} */
  var section;
  /** @type {string} */
  var method;
  /** @type {string} */
  var result;
  /** @type {string} */
  var alias;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {number} */
  var last;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'content');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-header-rows

  result = '';
  lines = content.split('\n');
  last = lines.length - 1;
  i = -1;
  while (i++ < last) {
    line = lines[i];
    if ( PATT.HEADER.SECTION.test(line) ) {
      section = line.replace(PATT.HEADER.SECTION, '$1');
      if (++i > last) {
        throw setNoMethodError(new Error, srcFile, content, --i);
      }
      line = lines[i];
      if ( !PATT.HEADER.METHOD.test(line) ) {
        throw setNoMethodError(new Error, srcFile, content, --i);
      }
      method = line.replace(PATT.HEADER.METHOD, '$1');
      aliases = [];
      while ( i < last && PATT.HEADER.ALIAS.test(lines[i + 1]) ) {
        line = lines[++i];
        alias = line.replace(PATT.HEADER.ALIAS, '$1');
        aliases.push(alias);
      }
      result += makeMethodHeaderRow(section, method, aliases);
    }
  }

  /// #}}} @step build-header-rows

  /// #{{{ @step return-header-rows

  return result;

  /// #}}} @step return-header-rows
}
/// #}}} @func makeMethodHeaderRows

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeMethodDocs;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
