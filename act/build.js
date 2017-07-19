/**
 * ---------------------------------------------------------------------------
 * BUILD TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task preprocesses, compiles, and minifies the vitals source code
 *   into distributable versions and documentation. Use `act build` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'builds distributable versions of vitals';
exports['default'] = '-dist';
exports['methods'] = {
  'all': {
    'desc': 'builds all vitals distributables & documentation',
    'method': buildAll
  },
  'dist': {
    'desc': 'builds browser & node versions of vitals',
    'method': buildDist
  },
  'browser': {
    'desc': 'builds browser versions of vitals',
    'method': buildBrowser
  },
  'node': {
    'desc': 'builds node versions of vitals',
    'method': buildNode
  },
  'docs': {
    'desc': 'builds vitals documentation',
    'method': buildDocs
  }
};
exports['done'] = false;

/// #}}} @group EXPORTS

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
var loadHelper = require('./helpers/load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @func loadDocsHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadDocsHelper = require('./docs/helpers/load-helper.js');
/// #}}} @func loadDocsHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const CONFIG
/**
 * @private
 * @const {!Object}
 */
var CONFIG = require('./build.json');
/// #}}} @const CONFIG

/// #{{{ @const COMMENT
/**
 * @private
 * @const {!RegExp}
 */
var COMMENT = /^[ \t]*\/\//;
/// #}}} @const COMMENT

/// #{{{ @const FLAGS
/**
 * @private
 * @const {!Object}
 */
var FLAGS = CONFIG.flags;
/// #}}} @const FLAGS

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const MODE
/**
 * @private
 * @const {string}
 */
var MODE = '0755';
/// #}}} @const MODE

/// #{{{ @const PARAM
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var PARAM = {
  DFLT: / = `[^`]+` *$/,
  LINE: /^ *\* @param \{[^\}]+\} [a-zA-Z0-9_\.\$]+(?: = `[^`]+`)? *$/
};
/// #}}} @const PARAM

/// #{{{ @const TAGS
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var TAGS = {
  OPEN: /^[ \t]*\/\*\*[ \t]*$/,
  CLOSE: /^[ \t]*\*\//,
  LINE: /^ *\*(?: +.*)?$/,
  PARAM: /^ *\* @param/,
  DESC: /^ *\* @desc(?:ription)?/,
  TAG: /^ *\* @/
};
/// #}}} @const TAGS

/// #{{{ @const STATE
/**
 * @private
 * @const {!Object}
 */
var STATE = CONFIG.state;
/// #}}} @const STATE

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group COMPILE

/// #{{{ @func closureCompile
/**
 * @private
 * @param {!Object} flags
 * @return {!Object}
 */
var closureCompile = require('google-closure-compiler-js').compile;
/// #}}} @func closureCompile

/// #{{{ @func makeCompile
/**
 * @private
 * @param {string} srcFile
 * @return {!function(string): string}
 */
function makeCompile(srcFile) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'srcFile');
  }
  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', srcFile, 'string');
  }

  /// #{{{ @func compile
  /**
   * @param {string} srcCode
   * @return {string}
   */
  function compile(srcCode) {

    /** @type {!Object} */
    var result;
    /** @type {!Object} */
    var flags;
    /** @type {!Error} */
    var err;

    if (!arguments.length) {
      throw setNoArgError(new Error, 'srcCode');
    }
    if ( !isString(srcCode) ) {
      throw setTypeError(new TypeError, 'srcCode', srcCode, 'string');
    }

    srcCode = srcCode.replace(/\n\n\n+/g, '\n\n');
    srcCode = trimComments(srcFile, srcCode);
    flags = cloneObject(FLAGS);
    flags.jsCode = [
      { src: srcCode }
    ];
    try {
      result = closureCompile(flags);
    }
    catch (err) {
      err.closure = true;
      throw setError(err, err.message);
    }
    return result.compiledCode;
  }
  /// #}}} @func compile

  return compile;
}
/// #}}} @func makeCompile

/// #{{{ @func newMoldProgram
/**
 * @description
 *   This is a shortcut to call the `Prg` constructor without the `new`
 *   keyword. The following helpers are appended (as a property) to the public
 *   `Prg` constructor, the `Prg` prototype, and the `newPrg` helper:
 *   - **Constructors**
 *     - `Log`
 *     - `Prg` or `Program`
 *   - **Functions**
 *     - `isLog`
 *     - `isPrg` or `isProgram`
 *     - `newLog`
 *     - `newPrg` or `newProgram`
 *   - **Strings**
 *     - `VERSION`
 * @private
 * @param {string} src
 *   The file-system path to the root directory containing the source code you
 *   want to preprocess.
 * @param {?Log=} log = `new Log()`
 *   The #log parameter allows you to disable logging by setting it to `null`
 *   or to provide your own `log` or `write` methods for *Mold* to use. The
 *   defaults are `console.log` and `process.stdout.write`. Use the provided
 *   `Log` constructor to wrap your customizations into a compatible format.
 * @return {!Prg}
 */
var newMoldProgram = require('mold');
/// #}}} @func newMoldProgram

/// #{{{ @func trimComments
/**
 * @private
 * @param {string} srcFile
 * @param {string} srcCode
 * @return {string}
 */
function trimComments(srcFile, srcCode) {

  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'srcCode');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', srcFile, 'string');
  }
  if ( !isString(srcCode) ) {
    throw setTypeError(new TypeError, 'srcCode', srcCode, 'string');
  }

  result = '';
  lines = srcCode.split('\n');
  len = lines.length;
  i = 0;
  while (i < len) {
    line = lines[i++] || '';
    if ( TAGS.OPEN.test(line) ) {
      result += line + '\n';
      while (true) {
        if (i >= len) {
          throw setNoTagCloseError(new Error, srcFile);
        }
        line = lines[i++] || '';
        if ( TAGS.CLOSE.test(line) ) {
          result += line + '\n';
          break;
        }
        if ( !TAGS.LINE.test(line) ) {
          throw setTagLineError(new SyntaxError, line, i, srcFile);
        }
        if ( TAGS.TAG.test(line) && !TAGS.DESC.test(line) ) {
          if ( TAGS.PARAM.test(line) ) {
            if ( !PARAM.LINE.test(line) ) {
              throw setParamLineError(new SyntaxError, line, i, srcFile);
            }
            line = line.replace(PARAM.DFLT, '');
          }
          result += line + '\n';
        }
      }
    }
    else if ( !COMMENT.test(line) ) {
      result += line + '\n';
    }
  }
  return result;
}
/// #}}} @func trimComments

/// #}}} @group COMPILE

/// #{{{ @group DOCS

/// #}}} @group DOCS

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

/// #{{{ @func setBuildEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} key
 * @param {string} prop
 * @return {!Error}
 */
function setBuildEmptyError(err, key, prop) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!TypeError');
  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');
  if ( !isString(prop) )
    throw setTypeError(new TypeError, 'prop', 'string');

  prop = key + '.' + prop;

  msg = 'invalid empty `string` for `build` task property `' + prop + '`';

  return setError(err, msg);
}
/// #}}} @func setBuildEmptyError

/// #{{{ @func setBuildOwnError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {string} key
 * @param {string} prop
 * @return {!ReferenceError}
 */
function setBuildOwnError(err, key, prop) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!ReferenceError');
  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');
  if ( !isString(prop) )
    throw setTypeError(new TypeError, 'prop', 'string');

  prop = key + '.' + prop;

  msg = 'missing required `build` task property `' + prop + '`';

  return setError(err, msg);
}
/// #}}} @func setBuildOwnError

/// #{{{ @func setBuildSlashError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} key
 * @param {string} prop
 * @param {string} path
 * @return {!RangeError}
 */
function setBuildSlashError(err, key, prop, path) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');
  if ( !isString(prop) )
    throw setTypeError(new TypeError, 'prop', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  prop = key + '.' + prop;

  msg = 'invalid dir notation for `build` task property `' + prop + '`\n' +
    '    valid-end-char: `"/"`\n' +
    '    bad-dir-path: `' + path + '`';

  return setError(err, msg);
}
/// #}}} @func setBuildSlashError

/// #{{{ @func setBuildTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} key
 * @param {string} prop
 * @param {string} types
 * @return {!TypeError}
 */
function setBuildTypeError(err, key, prop, types) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!TypeError');
  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');
  if ( !isString(prop) )
    throw setTypeError(new TypeError, 'prop', 'string');
  if ( !isString(types) )
    throw setTypeError(new TypeError, 'types', 'string');

  prop = key + '.' + prop;

  msg = 'invalid `build` task property data type for `' + prop + '`\n' +
    '    valid-types: `' + types + '`';

  return setError(err, msg);
}
/// #}}} @func setBuildTypeError

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

/// #{{{ @func setNoTagCloseError
/**
 * @private
 * @param {!Error} err
 * @param {string} file
 * @return {!Error}
 */
function setNoTagCloseError(err, file) {

  /** @type {string} */
  var msg;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }

  msg = 'unclosed `closure-compiler` comment section`\n' +
    '    file-path: `' + file + '`';

  return setError(err, msg);
}
/// #}}} @func setNoTagCloseError

/// #{{{ @func setParamLineError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} text
 * @param {number} linenum
 * @param {string} file
 * @return {!SyntaxError}
 */
function setParamLineError(err, text, linenum, file) {

  /** @type {string} */
  var valid;
  /** @type {string} */
  var msg;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'text');
    case 2:
      throw setNoArgError(new Error, 'linenum');
    case 3:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(text) ) {
    throw setTypeError(new TypeError, 'text', 'string');
  }
  if ( !isNumber(linenum) ) {
    throw setTypeError(new TypeError, 'linenum', 'string');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }

  valid = '/^ *\\* @param \\{[^}]+\\} [a-zA-Z0-9_.$]+( = \\`[^\\`]+\\`)? *$/';
  msg = 'invalid `line` format for a `closure-compiler` parameter tag`\n' +
    '    valid-line-test: `' + valid + '`\n' +
    '    invalid-line:\n' +
    '        text: `' + text + '`\n' +
    '        file: `' + file + '`\n' +
    '        linenum: `' + linenum + '`';

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  return setError(err, msg);
}
/// #}}} @func setParamLineError

/// #{{{ @func setRetError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} method
 * @param {string} types
 * @return {!TypeError}
 */
var setRetError = setError.ret;
/// #}}} @func setRetError

/// #{{{ @func setTagLineError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} text
 * @param {number} linenum
 * @param {string} file
 * @return {!SyntaxError}
 */
function setTagLineError(err, text, linenum, file) {

  /** @type {string} */
  var msg;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'text');
    case 2:
      throw setNoArgError(new Error, 'linenum');
    case 3:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(text) ) {
    throw setTypeError(new TypeError, 'text', 'string');
  }
  if ( !isNumber(linenum) ) {
    throw setTypeError(new TypeError, 'linenum', 'string');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }

  msg = 'invalid `line` format in a `closure-compiler` section`\n' +
    '    valid-line-test: `/^ *\\*( +.*)?$/`\n' +
    '    invalid-line:\n' +
    '        text: `' + text + '`\n' +
    '        file: `' + file + '`\n' +
    '        linenum: `' + linenum + '`';

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  return setError(err, msg);
}
/// #}}} @func setTagLineError

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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

/// #}}} @group ERROR

/// #{{{ @group FS

/// #{{{ @func makeDirectory
/**
 * @private
 * @param {string} path
 * @param {string=} mode = `"0755"`
 * @return {string}
 */
var makeDirectory = loadHelper('make-directory');
/// #}}} @func makeDirectory

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasEndSlash
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var hasEndSlash = loadHelper('has-end-slash');
/// #}}} @func hasEndSlash

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isMoldProgram
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isMoldProgram = newMoldProgram.isProgram;
/// #}}} @func isMoldProgram

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

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

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

/// #{{{ @func isObjectHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObjectHashMap = IS.objectHashMap;
/// #}}} @func isObjectHashMap

/// #{{{ @func isObjectList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObjectList = IS.objectList;
/// #}}} @func isObjectList

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

/// #{{{ @func deepMergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var deepMergeObject = loadHelper('deep-merge-object');
/// #}}} @func deepMergeObject

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

/// #{{{ @func mergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var mergeObject = loadHelper('merge-object');
/// #}}} @func mergeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const REPO
/**
 * @private
 * @const {string}
 */
var REPO = loadHelper('get-repo-root')();
/// #}}} @const REPO

/// #{{{ @const SRC
/**
 * @private
 * @const {string}
 */
var SRC = resolvePath(REPO, CONFIG.src);
/// #}}} @const SRC

/// #{{{ @const DEST
/**
 * @private
 * @const {string}
 */
var DEST = resolvePath(REPO, CONFIG.dest);
/// #}}} @const DEST

/// #}}} @group PATHS

/// #{{{ @group BUILDERS
//////////////////////////////////////////////////////////////////////////////
// BUILDERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func buildBranches
/**
 * @private
 * @param {!Prg} prg
 * @param {string} key
 * @param {!Object<string, !Object>} branches
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(null|(function(string): string)|undefined)=} alter = `undefined`
 * @return {void}
 */
function buildBranches(prg, key, branches, src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var newkey;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'prg');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'branches');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'state');
    case 6:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  if ( !isMoldProgram(prg) ) {
    throw setTypeError(new TypeError, 'prg', '!Prg');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }
  if ( !isObject(branches) || !isObjectHashMap(branches) ) {
    throw setTypeError(new TypeError, 'branches', '!Object<string, !Object>');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(dest) ) {
    throw setTypeError(new TypeError, 'dest', 'string');
  }
  if ( !isObject(state) ) {
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }
  if (!dest) {
    throw setEmptyError(new Error, 'dest');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-key-const

  /// #{{{ @const KEY
  /**
   * @private
   * @const {string}
   */
  var KEY = key;
  /// #}}} @const KEY

  /// #}}} @step set-key-const

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) ) {
    makeDirectory(dest, MODE);
  }

  /// #}}} @step make-dest

  /// #{{{ @step build-each-branch

  for (key in branches) {
    if ( hasOwnProperty(branches, key) ) {
      newkey = !!KEY
        ? KEY + '.' + key
        : key;
      buildBranch(prg, newkey, branches[key], src, dest, state, alter);
    }
  }

  /// #}}} @step build-each-branch
}
/// #}}} @func buildBranches

/// #{{{ @func buildBranch
/**
 * @private
 * @param {!Prg} prg
 * @param {string} key
 * @param {!Object} branch
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(null|(function(string): string)|undefined)=} alter = `undefined`
 * @return {void}
 */
function buildBranch(prg, key, branch, src, dest, state, alter) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'prg');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'branch');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'state');
    case 6:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  if ( !isMoldProgram(prg) ) {
    throw setTypeError(new TypeError, 'prg', '!Prg');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }
  if ( !isObject(branch) ) {
    throw setTypeError(new TypeError, 'branch', '!Object');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(dest) ) {
    throw setTypeError(new TypeError, 'dest', 'string');
  }
  if ( !isObject(state) ) {
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }
  if (!dest) {
    throw setEmptyError(new Error, 'dest');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step resolve-paths

  src = resolvePath(src);
  dest = resolvePath(dest);

  /// #}}} @step resolve-paths

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) ) {
    makeDirectory(dest, MODE);
  }

  /// #}}} @step make-dest

  /// #{{{ @step update-src

  if ( hasOwnProperty(branch, 'src') ) {
    if ( !isString(branch.src) ) {
      throw setBuildTypeError(new TypeError, key, 'src', 'string');
    }
    if (!!branch.src) {
      if ( !hasEndSlash(branch.src) ) {
        throw setBuildSlashError(new RangeError, key, 'src', branch.src);
      }
      src = resolvePath(src, branch.src);
    }
  }

  /// #}}} @step update-src

  /// #{{{ @step update-dest

  if ( hasOwnProperty(branch, 'dest') ) {
    if ( !isString(branch.dest) ) {
      throw setBuildTypeError(new TypeError, key, 'dest', 'string');
    }
    if (!!branch.dest) {
      if ( !hasEndSlash(branch.dest) ) {
        throw setBuildSlashError(new RangeError, key, 'dest', branch.dest);
      }
      dest = resolvePath(dest, branch.dest);
    }
  }

  /// #}}} @step update-dest

  /// #{{{ @step update-state

  state = cloneObject(state);

  if ( hasOwnProperty(branch, 'state') ) {
    if ( !isObject(branch.state) ) {
      throw setBuildTypeError(new TypeError, key, 'state',
        '!Object<string, (boolean|!Object<string, boolean>)>');
    }
    state = deepMergeObject(state, branch.state);
  }

  /// #}}} @step update-state

  /// #{{{ @step build-files

  if ( hasOwnProperty(branch, 'files') ) {
    buildFiles(prg, key, branch.files, src, dest, state, alter);
  }

  /// #}}} @step build-files

  /// #{{{ @step build-branches

  if ( hasOwnProperty(branch, 'branches') ) {
    buildBranches(prg, key, branch.branches, src, dest, state, alter);
  }

  /// #}}} @step build-branches
}
/// #}}} @func buildBranch

/// #{{{ @func buildFiles
/**
 * @private
 * @param {!Prg} prg
 * @param {string} key
 * @param {!Array<!Object>} files
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(null|(function(string): string)|undefined)=} alter = `undefined`
 * @return {void}
 */
function buildFiles(prg, key, files, src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'prg');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'files');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'state');
    case 6:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  if ( !isMoldProgram(prg) ) {
    throw setTypeError(new TypeError, 'prg', '!Prg');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }
  if ( !isArray(files) || !isObjectList(files) ) {
    throw setTypeError(new TypeError, 'files', '!Array<!Object>');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(dest) ) {
    throw setTypeError(new TypeError, 'dest', 'string');
  }
  if ( !isObject(state) ) {
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }
  if (!dest) {
    throw setEmptyError(new Error, 'dest');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-key-const

  /// #{{{ @const KEY
  /**
   * @private
   * @const {string}
   */
  var KEY = key;
  /// #}}} @const KEY

  /// #}}} @step set-key-const

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) ) {
    makeDirectory(dest, MODE);
  }

  /// #}}} @step make-dest

  /// #{{{ @step build-each-file

  len = files.length;
  i = -1;
  while (++i < len) {
    file = files[i];
    key = 'files[' + i + ']';

    if ( !isObject(file) ) {
      throw setBuildTypeError(new TypeError, KEY, key, '!Object');
    }

    key = KEY + '.' + key;
    buildFile(prg, key, file, src, dest, state, alter);
  }

  /// #}}} @step build-each-file
}
/// #}}} @func buildFiles

/// #{{{ @func buildFile
/**
 * @private
 * @param {!Prg} prg
 * @param {string} key
 * @param {!Object} file
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(null|(function(string): string)|undefined)=} alter = `makeCompile(dest)`
 * @return {string}
 */
function buildFile(prg, key, file, src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'prg');
    case 1:
      throw setNoArgError(new Error, 'key');
    case 2:
      throw setNoArgError(new Error, 'file');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'state');
    case 6:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  if ( !isMoldProgram(prg) ) {
    throw setTypeError(new TypeError, 'prg', '!Prg');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }
  if ( !isObject(file) ) {
    throw setTypeError(new TypeError, 'file', '!Object');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(dest) ) {
    throw setTypeError(new TypeError, 'dest', 'string');
  }
  if ( !isObject(state) ) {
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }
  if (!dest) {
    throw setEmptyError(new Error, 'dest');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) ) {
    makeDirectory(dest, MODE);
  }

  /// #}}} @step make-dest

  /// #{{{ @step setup-src

  if ( !hasOwnProperty(file, 'src') ) {
    throw setBuildOwnError(new ReferenceError, key, 'src');
  }
  if ( !isString(file.src) ) {
    throw setBuildTypeError(new TypeError, key, 'src', 'string');
  }
  if (!file.src) {
    throw setBuildEmptyError(new Error, key, 'src');
  }

  src = resolvePath(src, file.src);

  if ( !isFile(src) ) {
    throw setFileError(new Error, key + '.src', src);
  }

  /// #}}} @step setup-src

  /// #{{{ @step setup-dest

  if ( !hasOwnProperty(file, 'dest') ) {
    throw setBuildOwnError(new ReferenceError, key, 'dest');
  }
  if ( !isString(file.dest) ) {
    throw setBuildTypeError(new TypeError, key, 'dest', 'string');
  }
  if (!file.dest) {
    throw setBuildEmptyError(new Error, key, 'dest');
  }

  dest = resolvePath(dest, file.dest);

  /// #}}} @step setup-dest

  /// #{{{ @step update-state

  state = cloneObject(state);

  if ( hasOwnProperty(file, 'state') ) {
    if ( !isObject(file.state) ) {
      throw setBuildTypeError(new TypeError, key, 'state',
        '!Object<string, (boolean|!Object<string, boolean>)>');
    }
    state = deepMergeObject(state, file.state);
  }

  /// #}}} @step update-state

  /// #{{{ @step make-alter

  if ( isUndefined(alter) ) {
    alter = makeCompile(dest);
  }

  /// #}}} @step make-alter

  /// #{{{ @step build-file

  result = alter
    ? prg.process(src, dest, state, alter)
    : prg.process(src, dest, state);

  /// #}}} @step build-file

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
}
/// #}}} @func buildFile

/// #}}} @group BUILDERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func buildAll
/**
 * @public
 * @return {void}
 */
function buildAll() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Prg} */
  var prg;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  prg = newMoldProgram(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-browser-dist

  branch = CONFIG.branches.browser;
  buildBranch(prg, 'browser', branch, SRC, DEST, STATE);

  /// #}}} @step build-browser-dist

  /// #{{{ @step build-node-dist

  branch = CONFIG.branches.node;
  buildBranch(prg, 'node', branch, SRC, DEST, STATE);

  /// #}}} @step build-node-dist

  /// #{{{ @step build-docs

  branch = CONFIG.branches.docs;
  buildBranch(prg, 'docs', branch, SRC, DEST, STATE, null);

  /// #}}} @step build-docs
}
/// #}}} @func buildAll

/// #{{{ @func buildDist
/**
 * @public
 * @return {void}
 */
function buildDist() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Prg} */
  var prg;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  prg = newMoldProgram(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-browser-dist

  branch = CONFIG.branches.browser;
  buildBranch(prg, 'browser', branch, SRC, DEST, STATE);

  /// #}}} @step build-browser-dist

  /// #{{{ @step build-node-dist

  branch = CONFIG.branches.node;
  buildBranch(prg, 'node', branch, SRC, DEST, STATE);

  /// #}}} @step build-node-dist
}
/// #}}} @func buildDist

/// #{{{ @func buildBrowser
/**
 * @public
 * @return {void}
 */
function buildBrowser() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Prg} */
  var prg;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  prg = newMoldProgram(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-browser-dist

  branch = CONFIG.branches.browser;
  buildBranch(prg, 'browser', branch, SRC, DEST, STATE);

  /// #}}} @step build-browser-dist
}
/// #}}} @func buildBrowser

/// #{{{ @func buildNode
/**
 * @public
 * @return {void}
 */
function buildNode() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Prg} */
  var prg;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  prg = newMoldProgram(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-node-dist

  branch = CONFIG.branches.node;
  buildBranch(prg, 'node', branch, SRC, DEST, STATE);

  /// #}}} @step build-node-dist
}
/// #}}} @func buildNode

/// #{{{ @func buildDocs
/**
 * @public
 * @return {void}
 */
function buildDocs() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Prg} */
  var prg;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  prg = newMoldProgram(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-docs

  branch = CONFIG.branches.docs;
  buildBranch(prg, 'docs', branch, SRC, DEST, STATE, null);

  /// #}}} @step build-docs
}
/// #}}} @func buildDocs

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
