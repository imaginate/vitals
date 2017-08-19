/**
 * ---------------------------------------------------------------------------
 * BUILD TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task preprocesses, compiles, and minifies the vitals source code
 *   into distributable versions and documentation. Use `act build` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'builds distributable versions of vitals';
exports['value'] = '[SUPER]';
exports['default'] = '-node';
exports['methods'] = {
  'all': {
    'desc': 'builds all vitals distributables & documentation',
    'value': '[SUPER]',
    'method': buildAll
  },
  'dist': {
    'desc': 'builds browser & node versions of vitals',
    'value': '[SUPER]',
    'method': buildDist
  },
  'browser': {
    'desc': 'builds browser versions of vitals',
    'value': '[SUPER]',
    'method': buildBrowser
  },
  'node': {
    'desc': 'builds node versions of vitals',
    'value': '[SUPER]',
    'method': buildNode
  },
  'docs': {
    'desc': 'builds vitals documentation',
    'value': '[SUPER]',
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

/// #{{{ @const COPYRIGHT
/**
 * @private
 * @const {string}
 */
var COPYRIGHT = (function COPYRIGHT_PrivateScope() {

  /// #{{{ @const _PRESENT
  /**
   * @private
   * @const {string}
   */
  var _PRESENT = loadHelper('get-present-year').asString();
  /// #}}} @const _PRESENT

  /// #{{{ @const _CREATED
  /**
   * @private
   * @const {string}
   */
  var _CREATED = loadHelper('has-own-property')(CONFIG, 'created')
    ? CONFIG.created
    : _PRESENT;
  /// #}}} @const _CREATED

  /// #{{{ @const _YEAR
  /**
   * @private
   * @const {string}
   */
  var _YEAR = _CREATED === _PRESENT
    ? _PRESENT
    : _CREATED + '-' + _PRESENT;
  /// #}}} @const _YEAR

  /// #{{{ @const COPYRIGHT
  /**
   * @const {string}
   */
  var COPYRIGHT = 'Copyright (c) '
    + _YEAR
    + ' Adam A Smith <adam@imaginate.life>';
  /// #}}} @const COPYRIGHT

  return COPYRIGHT;
})();
/// #}}} @const COPYRIGHT

/// #{{{ @const DIR_MODE
/**
 * @private
 * @const {string}
 */
var DIR_MODE = '0755';
/// #}}} @const DIR_MODE

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
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const LICENSE
/**
 * @private
 * @const {string}
 */
var LICENSE = 'The Apache License (' + CONFIG.website + '/license)';
/// #}}} @const LICENSE

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

/// #{{{ @const VERSION
/**
 * @private
 * @const {string}
 */
var VERSION = loadHelper('get-version')();
/// #}}} @const VERSION

/// #{{{ @const WEBSITE
/**
 * @private
 * @const {string}
 */
var WEBSITE = CONFIG.website;
/// #}}} @const WEBSITE

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

/// #{{{ @func makeClosureExterns
/**
 * @private
 * @param {string} path
 * @return {!Array<!Object>}
 */
function makeClosureExterns(path) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Object>} */
  var externs;
  /** @type {!Array<string>} */
  var paths;
  /** @type {!Object} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

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
  if ( !isDirectory(path) ) {
    throw setDirError(new Error, 'path', path);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-externs-array

  externs = [];

  /// #}}} @step make-externs-array

  /// #{{{ @step make-extern-objects

  paths = getFilePaths(path, {
    'deep': false,
    'full': true,
    'extend': true,
    'validFiles': /\.js$/
  });
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    file = makeClosureFile(path);
    externs.push(file);
  }

  /// #}}} @step make-extern-objects

  /// #{{{ @step freeze-externs-object

  freezeObject(externs);

  /// #}}} @step freeze-externs-object

  /// #{{{ @step return-externs-object

  return externs;

  /// #}}} @step return-externs-object
}
/// #}}} @func makeClosureExterns

/// #{{{ @func makeClosureFile
/**
 * @private
 * @param {string} srcFile
 * @param {string=} srcCode
 * @return {!Object}
 */
function makeClosureFile(srcFile, srcCode) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      srcCode = undefined;
      break;
    default:
      if ( !isUndefined(srcCode) && !isString(srcCode) ) {
        throw setTypeError(new TypeError, 'srcCode', 'string=');
      }
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-src-code

  if ( isUndefined(srcCode) ) {
    srcCode = getFileContent(srcFile);
  }

  /// #}}} @step get-src-code

  /// #{{{ @step make-file-object

  file = {
    path: srcFile,
    src: srcCode
  };

  /// #}}} @step make-file-object

  /// #{{{ @step freeze-file-object

  freezeObject(file);

  /// #}}} @step freeze-file-object

  /// #{{{ @step return-file-object

  return file;

  /// #}}} @step return-file-object
}
/// #}}} @func makeClosureFile

/// #{{{ @func makeClosureFiles
/**
 * @private
 * @param {...(string|!Object|undefined)=} file
 * @return {!Array<!Object>}
 */
function makeClosureFiles(file) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Object>} */
  var files;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step make-files-array

  files = [];

  /// #}}} @step make-files-array

  /// #{{{ @step make-file-objects

  len = arguments.length;
  i = -1;
  while (++i < len) {
    file = arguments[i];
    if ( isUndefined(file) ) {
      continue;
    }
    else if ( isString(file) ) {
      file = makeClosureFile(file);
    }
    else if ( !isObject(file) ) {
      throw setTypeError(new TypeError, 'file', '(string|!Object|undefined)');
    }
    files.push(file);
  }

  /// #}}} @step make-file-objects

  /// #{{{ @step freeze-files-array

  freezeObject(files);

  /// #}}} @step freeze-files-array

  /// #{{{ @step return-files-array

  return files;

  /// #}}} @step return-files-array
}
/// #}}} @func makeClosureFiles

/// #{{{ @func makeClosureFlags
/**
 * @private
 * @param {?Object} flags
 * @param {(!Object|!Array<!Object>)} src
 * @return {!Object}
 */
function makeClosureFlags(flags, src, externs) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'src');
  }

  if ( !isNull(flags) && !isObject(flags) ) {
    throw setTypeError(new TypeError, 'flags', '?Object');
  }
  if ( !isArray(src) && isObject(src) ) {
    src = makeClosureFiles(src);
  }
  if ( !isArray(src) || !isObjectList(src) ) {
    throw setTypeError(new TypeError, 'src', '!Array<!Object>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-flags-object

  flags = cloneObject(flags);
  flags.jsCode = src;

  /// #}}} @step make-flags-object

  /// #{{{ @step freeze-flags-object

  freezeObject(flags);

  /// #}}} @step freeze-flags-object

  /// #{{{ @step return-flags-object

  return flags;

  /// #}}} @step return-flags-object
}
/// #}}} @func makeClosureFlags

/// #{{{ @func makeCompile
/**
 * @private
 * @param {string} srcFile
 * @param {?Object} flags
 * @return {!function(string): string}
 */
function makeCompile(srcFile, flags) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'flags');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isNull(flags) && !isObject(flags) ) {
    throw setTypeError(new TypeError, 'flags', '?Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @func compile
  /**
   * @param {string} srcCode
   * @return {string}
   */
  function compile(srcCode) {

    /// #{{{ @step declare-variables

    /** @type {!Object} */
    var result;
    /** @type {string} */
    var code;
    /** @type {!Object} */
    var src;
    /** @type {!Error} */
    var err;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    if (!arguments.length) {
      throw setNoArgError(new Error, 'srcCode');
    }
    if ( !isString(srcCode) ) {
      throw setTypeError(new TypeError, 'srcCode', 'string');
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step trim-src-code

    srcCode = srcCode.replace(/\n\n\n+/g, '\n\n');
    srcCode = trimComments(srcFile, srcCode);
    srcCode = srcCode.replace(/\n[ \t\*]*@copyright [^\n]+/g, '');

    /// #}}} @step trim-src-code

    /// #{{{ @step make-closure-compiler-src

    src = makeClosureFile(srcFile, srcCode);

    /// #}}} @step make-closure-compiler-src

    /// #{{{ @step make-closure-compiler-flags

    flags = makeClosureFlags(flags, src);

    /// #}}} @step make-closure-compiler-flags

    /// #{{{ @step run-closure-compiler

    try {
      result = closureCompile(flags);
    }
    catch (err) {
      err.closure = true;
      throw setError(err, err.message);
    }

    /// #}}} @step run-closure-compiler

    /// #{{{ @step verify-closure-compiler-results

    if ( !isObject(result) ) {
      throw setClosureRetError(new TypeError, '!Object');
    }

    if (!hasOwnProperty(result, 'compiledCode')
          || !isString(result.compiledCode) ) {
      throw setClosureRetError(new TypeError, '{ compiledCode: string }');
    }

    if (!hasOwnProperty(result, 'errors')
          || !isArray(result.errors)
          || !isObjectList(result.errors) ) {
      throw setClosureRetError(new TypeError, '{ errors: !Array<!Object> }');
    }

    if (result.errors.length) {
      throw setClosureError(new Error, srcCode.split('\n'), result.errors[0]);
    }

    /// #}}} @step verify-closure-compiler-results

    /// #{{{ @step make-compiled-code

    code = ''
      + '/* vitals v' + VERSION + ' (' + WEBSITE + ')\n'
      + ' * ' + COPYRIGHT + '\n'
      + ' * ' + LICENSE + ' */\n'
      + result.compiledCode;

    /// #}}} @step make-compiled-code

    /// #{{{ @step return-compiled-code

    return code;

    /// #}}} @step return-compiled-code
  }
  /// #}}} @func compile

  return compile;
}
/// #}}} @func makeCompile

/// #{{{ @func moldSource
/**
 * @private
 * @param {string} src
 *   The file-system path to the root directory containing the source code you
 *   want to proc.
 * @param {?Object=} opts
 * @param {boolean=} opts.quiet = `false`
 *   If #opts.quiet is `true`, logging will be disabled.
 * @param {?Stream=} opts.stdout = `proc.stdout`
 *   The #opts.stdout option allows you to provide a different `Stream` for
 *   *Mold* to log to. If a `Stream` is provided, it must be `Writable`.
 * @param {boolean=} opts.verbose = `false`
 *   If #opts.verbose is `true`, logging will be increased.
 * @param {!function(!Function)} callback
 *   This is where you complete preprocing, save results, and anything else
 *   you desire. The *proc* parameter provided to the #callback is the
 *   `proc` method built by the `makeProcess` method defined below. It has
 *   the following properties appended to it:
 *   - **log** *`!Function`*!$
 *     The `log` method used by the current instance. This `function` is built
 *     by the `makeLog` method defined below.
 *   - **quiet** *`boolean`*!$
 *     Whether logging is disabled for the current instance. This value is set
 *     by #opts.quiet.
 *   - **src** *`string`*!$
 *     The path to the source tree root for the current instance. This value
 *     is set by #src.
 *   - **stdout** *`?Stream`*!$
 *     The `stdout` for the current instance's logging. This value is set by
 *     #opts.stdout.
 *   - **verbose** *`boolean`*!$
 *     Whether logging is increased for the current instance. This value is
 *     set by #opts.verbose.
 *   Note that if an error occurs, an `Error` instance is thrown. To determine
 *   if a thrown `Error` instance was created by *Mold*, you can check the
 *   `Error` instance for an owned property with the key name of `"mold"` and
 *   the value of `true`.
 *   ```
 *   // @example
 *   //   Determine if a thrown `Error` instance was created by *Mold*.
 *   try {
 *     require("mold")("path/to/src/tree/", callback);
 *   } catch (err) {
 *     if (isError(err) && err.hasOwnProperty("mold") && err.mold === true) {
 *       console.error("MoldError", err);
 *     } else {
 *       console.error(err);
 *     }
 *     proc.exit(1);
 *   }
 *   ```
 * @return {void}
 */
var moldSource = require('mold');
/// #}}} @func moldSource

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
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(srcCode) ) {
    throw setTypeError(new TypeError, 'srcCode', 'string');
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

/// #{{{ @func trimDocs
/**
 * @private
 * @param {string} srcCode
 * @return {string}
 */
function trimDocs(srcCode) {
  return srcCode.replace(/\n\n\n+/g, '\n\n');
}
/// #}}} @func trimDocs

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

/// #{{{ @func setClosureError
/**
 * @private
 * @param {!Error} err
 * @param {!Array<string>} lines
 * @param {!Object} result
 * @return {!Error}
 */
function setClosureError(err, lines, result) {

  /** @type {number} */
  var linenum;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }
  if ( !isObject(result) ) {
    throw setTypeError(new TypeError, 'result', '!Object');
  }

  msg = result.description + '\n'
    + '    dest-path: `' + result.file + '`\n'
    + '    line-number: `' + result.lineNo + '`\n'
    + '    char-number: `' + result.charNo + '`\n'
    + '    code-snippet:';

  end = result.lineNo + 5;
  i = result.lineNo - 6;
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
    msg += result.lineNo === linenum
      ? '--> '
      : '    ';
    msg += i + ' `' + line + '`';
  }

  err.closure = true;
  return setError(err, msg);
}
/// #}}} @func setClosureError

/// #{{{ @func setClosureRetError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} types
 * @return {!TypeError}
 */
function setClosureRetError(err, types) {

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!TypeError');
  }
  if ( !isString(types) ) {
    throw setTypeError(new TypeError, 'types', 'string');
  }

  err.closure = true;
  return setRetError(err, 'closureCompiler.compile', types);
}
/// #}}} @func setClosureRetError

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

/// #{{{ @func setMethodError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} method
 * @return {!RangeError}
 */
function setMethodError(err, method) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var path;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'method');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-method-name

  path = method;
  method = getPathName(method);
  method = trimJsFileExtension(method);

  /// #}}} @step get-method-name

  /// #{{{ @step make-message

  msg = 'invalid value for `method` argument (must exist in `src`)\n'
    + '    method-name: `"' + method + '"`\n'
    + '    src-path: `' + path + '`';

  /// #}}} @step make-message

  /// #{{{ @step set-error-name

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setMethodError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer = `false`
 * @return {(!Buffer|string)}
 */
var getFileContent = loadHelper('get-file-content');
/// #}}} @func getFileContent

/// #{{{ @func getFilePaths
/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If the #opts is a `boolean`, the #opts.deep option is set to its value.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid files.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute file paths instead of relative file paths.
 * @param {?boolean=} opts.extend = `false`
 *   When supplying a valid or invalid pattern to check paths against, the
 *   #opts.extend option allows you to supplement instead of overwrite the
 *   default valid or invalid test. If the default value is `null`, this
 *   option does not have any side effects.
 * @param {?RegExp=} opts.valid = `null`
 *   A pattern for matching valid file or directory paths. If #opts.valid is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.valid pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.valid pattern.
 * @param {?RegExp=} opts.invalid = `null`
 *   A pattern for matching invalid file or directory paths. If #opts.invalid
 *   is `null`, no check is performed. If it is a `RegExp`, the source
 *   property is checked for a forward slash, `"/"`. If it has a forward
 *   slash, the path tree is tested against the #opts.invalid pattern.
 *   Otherwise (i.e. if it does not have a forward slash), the path name is
 *   tested against the #opts.invalid pattern.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when #opts.deep is `true`. A pattern for matching valid
 *   directory paths. If #opts.validDirs is `null`, no check is performed. If
 *   it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.validDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.validDirs pattern.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   Only used when #opts.deep is `true`. A pattern for matching invalid
 *   directory paths. If #opts.invalidDirs is `null`, no check is performed.
 *   If it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.invalidDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.invalidDirs pattern.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid file paths. If #opts.validFiles is `null`,
 *   no check is performed. If it is a `RegExp`, the source property is
 *   checked for a forward slash, `"/"`. If it has a forward slash, the path
 *   tree is tested against the #opts.validFiles pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.validFiles pattern.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid file paths. If #opts.invalidFiles is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.invalidFiles pattern. Otherwise
 *   (i.e. if it does not have a forward slash), the path name is tested
 *   against the #opts.invalidFiles pattern.
 * @return {!Array<string>}
 */
var getFilePaths = loadHelper('get-file-paths');
/// #}}} @func getFilePaths

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

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
function hasOption(opts, key) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'opts');
    case 1:
      throw setNoArgError(new Error, 'key');
  }

  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }

  if (!key) {
    throw setEmptyError(new Error, 'key');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return hasOwnEnumProperty(opts, key) && !isUndefined(opts[key]);

  /// #}}} @step return-result
}
/// #}}} @func hasOption

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func hasSlash
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var hasSlash = loadHelper('has-slash');
/// #}}} @func hasSlash

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

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNullArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullArray(val) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  return isNull(val) || isArray(val);
}
/// #}}} @func isNullArray

/// #{{{ @func isNullObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullObject(val) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  return isNull(val) || isObject(val);
}
/// #}}} @func isNullObject

/// #{{{ @func isNullObjectHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullObjectHashMap(val) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  return isNull(val) || ( isObject(val) && isObjectHashMap(val) );
}
/// #}}} @func isNullObjectHashMap

/// #{{{ @func isNullObjectList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullObjectList(val) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  return isNull(val) || ( isArray(val) && isObjectList(val) );
}
/// #}}} @func isNullObjectList

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

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func deepMergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var deepMergeObject = loadHelper('deep-merge-object');
/// #}}} @func deepMergeObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func mergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var mergeObject = loadHelper('merge-object');
/// #}}} @func mergeObject

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadHelper('set-constant-property');
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
var setProperty = loadHelper('set-property');
/// #}}} @func setProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = loadHelper('clean-path');
/// #}}} @func cleanPath

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadHelper('get-path-name');
/// #}}} @func getPathName

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func trimJsFileExtension
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimJsFileExtension = loadHelper('trim-file-extension').construct('.js');
/// #}}} @func trimJsFileExtension

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

/// #{{{ @const METHODS
/**
 * @private
 * @const {string}
 */
var METHODS = resolvePath(SRC, 'methods');
/// #}}} @const METHODS

/// #{{{ @const EXTERNS
/**
 * @private
 * @const {string}
 */
var EXTERNS = resolvePath(REPO, CONFIG.externs);
/// #}}} @const EXTERNS

/// #}}} @group PATHS

/// #{{{ @group CLASSES
//////////////////////////////////////////////////////////////////////////////
// CLASSES
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group BRANCH

/// #{{{ @func Branch
/**
 * @private
 * @param {?Branch} parent
 * @param {string} name
 * @param {!Object} config
 * @param {string} src
 * @param {string} dest
 * @param {string} method
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {?Object} flags
 * @param {(null|(function(string): string)|undefined)=} alter = `undefined`
 * @constructor
 * @struct
 */
function Branch(
          parent, name, config, src, dest, method, state, flags, alter) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Branch) ) {
    throw setNewError(new SyntaxError, 'Branch');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'config');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'method');
    case 6:
      throw setNoArgError(new Error, 'state');
    case 7:
      throw setNoArgError(new Error, 'flags');
    case 8:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  if ( !isNull(parent) && !isInstanceOf(parent, Branch) ) {
    throw setTypeError(new TypeError, 'parent', '?Branch');
  }
  if ( !isString(name) ) {
    throw setTypeError(new TypeError, 'name', 'string');
  }
  if ( !isObject(config) ) {
    throw setTypeError(new TypeError, 'config', '!Object');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(dest) ) {
    throw setTypeError(new TypeError, 'dest', 'string');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isObject(state) ) {
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  }
  if ( !isNull(flags) && !isObject(flags) ) {
    throw setTypeError(new TypeError, 'flags', '?Object');
  }

  if (!name) {
    throw setEmptyError(new Error, 'name');
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

  /// #{{{ @step verify-config-properties

  if ( hasOption(config, 'src') ) {
    if ( !isString(config.src) ) {
      throw setBuildTypeError(new TypeError, name, 'src', 'string');
    }
    if ( !!config.src && !hasEndSlash(config.src) ) {
      throw setBuildSlashError(new RangeError, name, 'src', config.src);
    }
  }

  if ( hasOption(config, 'dest') ) {
    if ( !isString(config.dest) ) {
      throw setBuildTypeError(new TypeError, name, 'dest', 'string');
    }
    if ( !!config.dest && !hasEndSlash(config.dest) ) {
      throw setBuildSlashError(new RangeError, name, 'dest', config.dest);
    }
  }

  if ( hasOption(config, 'state') && !isNullObject(config.state) ) {
    throw setBuildTypeError(new TypeError, name, 'state',
      '?Object<string, (boolean|!Object<string, boolean>)>');
  }

  if ( hasOption(config, 'flags') && !isNullObject(config.flags) ) {
    throw setBuildTypeError(new TypeError, name, 'flags', '?Object');
  }

  if ( hasOption(config, 'files') && !isNullObjectList(config.files) ) {
    throw setBuildTypeError(new TypeError, name, 'files', '?Array<!Object>');
  }

  if ( hasOption(config, 'branches')
        && !isNullObjectHashMap(config.branches) ) {
    throw setBuildTypeError(new TypeError, name, 'branches',
      '?Object<!Object>');
  }

  /// #}}} @step verify-config-properties

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {?Branch}
   */
  var PARENT = parent;
  /// #}}} @const PARENT

  /// #{{{ @const NAME
  /**
   * @private
   * @const {string}
   */
  var NAME = name;
  /// #}}} @const NAME

  /// #{{{ @const CONFIG
  /**
   * @private
   * @const {!Object}
   */
  var CONFIG = freezeObject(config);
  /// #}}} @const CONFIG

  /// #{{{ @const SRC
  /**
   * @private
   * @const {string}
   */
  var SRC = hasOption(CONFIG, 'src') && !!CONFIG.src
    ? resolvePath(src, CONFIG.src)
    : resolvePath(src);
  /// #}}} @const SRC

  /// #{{{ @const DEST
  /**
   * @private
   * @const {string}
   */
  var DEST = hasOption(CONFIG, 'dest') && !!CONFIG.dest
    ? resolvePath(dest, CONFIG.dest)
    : resolvePath(dest);
  /// #}}} @const DEST

  /// #{{{ @const METHOD
  /**
   * @private
   * @const {string}
   */
  var METHOD = method;
  /// #}}} @const METHOD

  /// #{{{ @const STATE
  /**
   * @private
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  var STATE = hasOption(CONFIG, 'state') && !!CONFIG.state
    ? deepMergeObject(state, config.state)
    : cloneObject(state);
  /// #}}} @const STATE

  /// #{{{ @const FLAGS
  /**
   * @private
   * @const {!Object}
   */
  var FLAGS = hasOption(CONFIG, 'flags') && !!CONFIG.flags
    ? mergeObject(flags, config.flags)
    : cloneObject(flags);
  /// #}}} @const FLAGS

  /// #{{{ @const ALTER
  /**
   * @private
   * @const {(null|(function(string): string)|undefined)}
   */
  var ALTER = alter;
  /// #}}} @const ALTER

  /// #{{{ @const FILES
  /**
   * @private
   * @const {!Array<!File>}
   */
  var FILES = [];
  /// #}}} @const FILES

  /// #{{{ @const BRANCHES
  /**
   * @private
   * @const {!Object}
   */
  var BRANCHES = createObject(null);
  /// #}}} @const BRANCHES

  /// #}}} @step set-constants

  /// #{{{ @step verify-method

  if (METHOD) {
    method = resolvePath(METHODS, METHOD);
    if ( !isFile(method) ) {
      throw setFileError(new Error, 'method', method);
    }
  }

  /// #}}} @step verify-method

  /// #{{{ @step make-dest

  makeDirectory(DEST, {
    'mode': DIR_MODE,
    'parents': true
  });

  /// #}}} @step make-dest

  /// #{{{ @step set-members

  /// #{{{ @member parent
  /**
   * @const {?Branch}
   */
  setConstantProperty(this, 'parent', PARENT);
  /// #}}} @member parent

  /// #{{{ @member name
  /**
   * @const {string}
   */
  setConstantProperty(this, 'name', NAME);
  /// #}}} @member name

  /// #{{{ @member config
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'config', CONFIG);
  /// #}}} @member config

  /// #{{{ @member src
  /**
   * @const {string}
   */
  setConstantProperty(this, 'src', SRC);
  /// #}}} @member src

  /// #{{{ @member dest
  /**
   * @const {string}
   */
  setConstantProperty(this, 'dest', DEST);
  /// #}}} @member dest

  /// #{{{ @member method
  /**
   * @const {string}
   */
  setConstantProperty(this, 'method', METHOD);
  /// #}}} @member method

  /// #{{{ @member state
  /**
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  setConstantProperty(this, 'state', STATE);
  /// #}}} @member state

  /// #{{{ @member flags
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'flags', FLAGS);
  /// #}}} @member flags

  /// #{{{ @member alter
  /**
   * @const {(null|(function(string): string)|undefined)}
   */
  setConstantProperty(this, 'alter', ALTER);
  /// #}}} @member alter

  /// #{{{ @member files
  /**
   * @const {!Array<!File>}
   */
  setConstantProperty(this, 'files', FILES);
  /// #}}} @member files

  /// #{{{ @member branches
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'branches', BRANCHES);
  /// #}}} @member branches

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step make-files

  if ( hasOption(CONFIG, 'files') ) {
    this.makeFiles(CONFIG.files);
  }
  else {
    this.makeFiles(null);
  }

  /// #}}} @step make-files

  /// #{{{ @step make-branches

  if ( hasOption(CONFIG, 'branches') ) {
    this.makeBranches(CONFIG.branches);
  }
  else {
    this.makeBranches(null);
  }

  /// #}}} @step make-branches
}
/// #}}} @func Branch

/// #{{{ @func newBranch
/**
 * @private
 * @param {?Branch} parent
 * @param {string} name
 * @param {!Object} config
 * @param {string} src
 * @param {string} dest
 * @param {string} method
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {?Object} flags
 * @param {(null|(function(string): string)|undefined)=} alter = `undefined`
 * @return {!Branch}
 */
function newBranch(
          parent, name, config, src, dest, method, state, flags, alter) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'config');
    case 3:
      throw setNoArgError(new Error, 'src');
    case 4:
      throw setNoArgError(new Error, 'dest');
    case 5:
      throw setNoArgError(new Error, 'method');
    case 6:
      throw setNoArgError(new Error, 'state');
    case 7:
      throw setNoArgError(new Error, 'flags');
    case 8:
      alter = undefined;
      break;
    default:
      if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) ) {
        throw setTypeError(new TypeError, 'alter',
          '(?function(string): string)=');
      }
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-branch

  return new Branch(
    parent, name, config, src, dest, method, state, flags, alter);

  /// #}}} @step return-new-branch
}
/// #}}} @func newBranch

/// #{{{ @func Branch.prototype.build
/**
 * @param {!Function} build
 * @return {!Branch}
 */
function buildBranch(build) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'build');
  }

  if ( !isFunction(build) ) {
    throw setTypeError(new TypeError, 'build', '!Function');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-each-file

  len = this.files.length;
  i = -1;
  while (++i < len) {
    this.files[i].build(build);
  }

  /// #}}} @step build-each-file

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Branch.prototype.build

/// #{{{ @func Branch.prototype.isMethod
/**
 * @param {!Object} file
 * @return {boolean}
 */
function isMethod(file) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'file');
  }
  if ( !isObject(file) ) {
    throw setTypeError(new TypeError, 'file', '!Object');
  }
  if (!file) {
    throw setEmptyError(new Error, 'file');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return !this.method
    || ( hasOption(file, 'src') && file.src === this.method );

  /// #}}} @step return-result
}
/// #}}} @func Branch.prototype.isMethod

/// #{{{ @func Branch.prototype.makeBranches
/**
 * @param {?Object<!Object>} branches
 * @return {!Branch}
 */
function makeBranches(branches) {

  /// #{{{ @step declare-variables

  /** @type {!Branch} */
  var branch;
  /** @type {string} */
  var name;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'branches');
  }

  if ( !isNullObjectHashMap(branches) ) {
    throw setTypeError(new TypeError, 'branches', '?Object<!Object>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-each-branch

  if (branches) {
    for (key in branches) {
      if ( hasOwnProperty(branches, key) ) {
        name = this.name + '.' + key;
        branch = new Branch(this, name, branches[key], this.src, this.dest,
          this.method, this.state, this.flags, this.alter);
        setConstantProperty(this.branches, key, branch);
      }
    }
  }

  /// #}}} @step make-each-branch

  /// #{{{ @step freeze-branches-member

  freezeObject(this.branches);

  /// #}}} @step freeze-branches-member

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Branch.prototype.makeBranches

/// #{{{ @func Branch.prototype.makeFiles
/**
 * @param {?Array<!Object>} files
 * @return {!Branch}
 */
function makeFiles(files) {

  /// #{{{ @step declare-variables

  /** @type {!File} */
  var file;
  /** @type {string} */
  var name;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'files');
  }

  if ( !isNullObjectList(files) ) {
    throw setTypeError(new TypeError, 'files', '?Array<!Object>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-each-file

  if (files) {
    len = files.length;
    i = -1;
    while (++i < len) {
      if ( this.isMethod(files[i]) ) {
        name = this.name + '.files[' + i + ']';
        file = new File(this, name, files[i]);
        this.files.push(file);
      }
    }
  }

  /// #}}} @step make-each-file

  /// #{{{ @step freeze-files-member

  freezeObject(this.files);

  /// #}}} @step freeze-files-member

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Branch.prototype.makeFiles

/// #{{{ @step setup-branch-constructor

Branch.Branch = Branch;
Branch.newBranch = newBranch;
Branch.construct = newBranch;
Branch.prototype = createObject(null);

freezeObject(Branch);

/// #}}} @step setup-branch-constructor

/// #{{{ @step setup-branch-prototype

setConstantProperty(Branch.prototype, 'build', buildBranch);
setConstantProperty(Branch.prototype, 'constructor', Branch, false);
setConstantProperty(Branch.prototype, 'isMethod', isMethod);
setConstantProperty(Branch.prototype, 'makeBranches', makeBranches);
setConstantProperty(Branch.prototype, 'makeFiles', makeFiles);

freezeObject(Branch.prototype);

/// #}}} @step setup-branch-prototype

/// #}}} @group BRANCH

/// #{{{ @group FILE

/// #{{{ @func File
/**
 * @private
 * @param {!Branch} parent
 * @param {string} name
 * @param {!Object} config
 * @constructor
 * @struct
 */
function File(parent, name, config) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, File) ) {
    throw setNewError(new SyntaxError, 'File');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'config');
  }

  if ( !isInstanceOf(parent, Branch) ) {
    throw setTypeError(new TypeError, 'parent', '?Branch');
  }
  if ( !isString(name) ) {
    throw setTypeError(new TypeError, 'name', 'string');
  }
  if ( !isObject(config) ) {
    throw setTypeError(new TypeError, 'config', '!Object');
  }

  if (!name) {
    throw setEmptyError(new Error, 'name');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-config-properties

  if ( !hasOption(config, 'src') ) {
    throw setBuildOwnError(new ReferenceError, name, 'src');
  }
  if ( !isString(config.src) ) {
    throw setBuildTypeError(new TypeError, name, 'src', 'string');
  }
  if (!config.src) {
    throw setBuildEmptyError(new Error, name, 'src');
  }

  if ( !hasOption(config, 'dest') ) {
    throw setBuildOwnError(new ReferenceError, name, 'dest');
  }
  if ( !isString(config.dest) ) {
    throw setBuildTypeError(new TypeError, name, 'dest', 'string');
  }
  if (!config.dest) {
    throw setBuildEmptyError(new Error, name, 'dest');
  }

  if ( hasOption(config, 'state') && !isNullObject(config.state) ) {
    throw setBuildTypeError(new TypeError, name, 'state',
      '?Object<string, (boolean|!Object<string, boolean>)>');
  }

  if ( hasOption(config, 'flags') && !isNullObject(config.flags) ) {
    throw setBuildTypeError(new TypeError, name, 'flags', '?Object');
  }

  /// #}}} @step verify-config-properties

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {!Branch}
   */
  var PARENT = parent;
  /// #}}} @const PARENT

  /// #{{{ @const NAME
  /**
   * @private
   * @const {string}
   */
  var NAME = name;
  /// #}}} @const NAME

  /// #{{{ @const CONFIG
  /**
   * @private
   * @const {!Object}
   */
  var CONFIG = freezeObject(config);
  /// #}}} @const CONFIG

  /// #{{{ @const SRC
  /**
   * @private
   * @const {string}
   */
  var SRC = resolvePath(PARENT.src, CONFIG.src);
  /// #}}} @const SRC

  /// #{{{ @const DEST
  /**
   * @private
   * @const {string}
   */
  var DEST = resolvePath(PARENT.dest, CONFIG.dest);
  /// #}}} @const DEST

  /// #{{{ @const METHOD
  /**
   * @private
   * @const {string}
   */
  var METHOD = PARENT.method;
  /// #}}} @const METHOD

  /// #{{{ @const STATE
  /**
   * @private
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  var STATE = hasOption(CONFIG, 'state') && !!CONFIG.state
    ? deepMergeObject(PARENT.state, CONFIG.state)
    : cloneObject(PARENT.state);
  freezeObject(STATE);
  /// #}}} @const STATE

  /// #{{{ @const FLAGS
  /**
   * @private
   * @const {!Object}
   */
  var FLAGS = hasOption(CONFIG, 'flags') && !!CONFIG.flags
    ? mergeObject(PARENT.flags, CONFIG.flags)
    : cloneObject(PARENT.flags);
  freezeObject(FLAGS);
  /// #}}} @const FLAGS

  /// #{{{ @const ALTER
  /**
   * @private
   * @const {?function(string): string}
   */
  var ALTER = isUndefined(PARENT.alter)
    ? makeCompile(DEST, FLAGS)
    : PARENT.alter;
  /// #}}} @const ALTER

  /// #}}} @step set-constants

  /// #{{{ @step verify-src

  if ( !isFile(SRC) ) {
    throw setFileError(new Error, NAME + '.src', SRC);
  }

  /// #}}} @step verify-src

  /// #{{{ @step set-members

  /// #{{{ @member parent
  /**
   * @const {!Branch}
   */
  setConstantProperty(this, 'parent', PARENT);
  /// #}}} @member parent

  /// #{{{ @member name
  /**
   * @const {string}
   */
  setConstantProperty(this, 'name', NAME);
  /// #}}} @member name

  /// #{{{ @member config
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'config', CONFIG);
  /// #}}} @member config

  /// #{{{ @member src
  /**
   * @const {string}
   */
  setConstantProperty(this, 'src', SRC);
  /// #}}} @member src

  /// #{{{ @member dest
  /**
   * @const {string}
   */
  setConstantProperty(this, 'dest', DEST);
  /// #}}} @member dest

  /// #{{{ @member method
  /**
   * @const {string}
   */
  setConstantProperty(this, 'method', METHOD);
  /// #}}} @member method

  /// #{{{ @member state
  /**
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  setConstantProperty(this, 'state', STATE);
  /// #}}} @member state

  /// #{{{ @member flags
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'flags', FLAGS);
  /// #}}} @member flags

  /// #{{{ @member alter
  /**
   * @const {?function(string): string}
   */
  setConstantProperty(this, 'alter', ALTER);
  /// #}}} @member alter

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func File

/// #{{{ @func newFile
/**
 * @private
 * @param {!Branch} parent
 * @param {string} name
 * @param {!Object} config
 * @return {!File}
 */
function newFile(parent, name, config) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'config');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-file

  return new File(parent, name, config);

  /// #}}} @step return-new-file
}
/// #}}} @func newFile

/// #{{{ @func File.prototype.build
/**
 * @param {!Function} build
 * @return {string}
 */
function buildFile(build) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'build');
  }

  if ( !isFunction(build) ) {
    throw setTypeError(new TypeError, 'build', '!Function');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step build-file

  result = this.alter
    ? build(this.src, this.dest, this.state, this.alter)
    : build(this.src, this.dest, this.state);

  /// #}}} @step build-file

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
}
/// #}}} @func File.prototype.build

/// #{{{ @step setup-file-constructor

File.File = File;
File.newFile = newFile;
File.construct = newFile;
File.prototype = createObject(null);

freezeObject(File);

/// #}}} @step setup-file-constructor

/// #{{{ @step setup-file-prototype

setConstantProperty(File.prototype, 'build', buildFile);
setConstantProperty(File.prototype, 'constructor', File, false);

freezeObject(File.prototype);

/// #}}} @step setup-file-prototype

/// #}}} @group FILE

/// #}}} @group CLASSES

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func buildAll
/**
 * @public
 * @param {?string=} method
 *   The #method must be the name of a *vitals* `@super` method. It must exist
 *   in the `../src/methods` directory matching the file name `<method>.js`.
 * @return {void}
 */
function buildAll(method) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Branch>} */
  var branch;
  /** @type {!Object} */
  var flags;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isUndefined(method) || isNull(method) ) {
    method = '';
  }
  else if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', '?string=');
  }
  else if (method) {
    method = cleanPath(method);
    method = trimJsFileExtension(method) + '.js';
    method = resolvePath(METHODS, method);
    if ( !isFile(method) ) {
      throw setMethodError(new RangeError, method);
    }
    method = getPathName(method);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-flags

  flags = cloneObject(FLAGS);
  flags.externs = makeClosureExterns(EXTERNS);

  freezeObject(flags);

  /// #}}} @step make-flags

  /// #{{{ @step make-branches

  /** @struct */
  branch = {};

  branch.browser = new Branch(null, 'browser', CONFIG.branches.browser, SRC,
    DEST, method, STATE, flags);
  branch.node = new Branch(null, 'node', CONFIG.branches.node, SRC, DEST,
    method, STATE, flags);
  branch.docs = new Branch(null, 'docs', CONFIG.branches.docs, SRC, DEST,
    method, STATE, null, trimDocs);

  freezeObject(branch);

  /// #}}} @step make-branches

  /// #{{{ @step build-vitals

  moldSource(SRC, {
    'quiet': false,
    'verbose': true
  }, function buildVitals(run) {
    branch.browser.build(run);
    branch.node.build(run);
    branch.docs.build(run);
  });

  /// #}}} @step build-vitals
}
/// #}}} @func buildAll

/// #{{{ @func buildDist
/**
 * @public
 * @param {?string=} method
 *   The #method must be the name of a *vitals* `@super` method. It must exist
 *   in the `../src/methods` directory matching the file name `<method>.js`.
 * @return {void}
 */
function buildDist(method) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Branch>} */
  var branch;
  /** @type {!Object} */
  var flags;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isUndefined(method) || isNull(method) ) {
    method = '';
  }
  else if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', '?string=');
  }
  else if (method) {
    method = cleanPath(method);
    method = trimJsFileExtension(method) + '.js';
    method = resolvePath(METHODS, method);
    if ( !isFile(method) ) {
      throw setMethodError(new RangeError, method);
    }
    method = getPathName(method);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-flags

  flags = cloneObject(FLAGS);
  flags.externs = makeClosureExterns(EXTERNS);

  freezeObject(flags);

  /// #}}} @step make-flags

  /// #{{{ @step make-branches

  /** @struct */
  branch = {};

  branch.browser = new Branch(null, 'browser', CONFIG.branches.browser, SRC,
    DEST, method, STATE, flags);
  branch.node = new Branch(null, 'node', CONFIG.branches.node, SRC, DEST,
    method, STATE, flags);

  freezeObject(branch);

  /// #}}} @step make-branches

  /// #{{{ @step build-vitals

  moldSource(SRC, {
    'quiet': false,
    'verbose': true
  }, function buildVitals(run) {
    branch.browser.build(run);
    branch.node.build(run);
  });

  /// #}}} @step build-vitals
}
/// #}}} @func buildDist

/// #{{{ @func buildBrowser
/**
 * @public
 * @param {?string=} method
 *   The #method must be the name of a *vitals* `@super` method. It must exist
 *   in the `../src/methods` directory matching the file name `<method>.js`.
 * @return {void}
 */
function buildBrowser(method) {

  /// #{{{ @step declare-variables

  /** @type {!Branch} */
  var branch;
  /** @type {!Object} */
  var flags;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isUndefined(method) || isNull(method) ) {
    method = '';
  }
  else if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', '?string=');
  }
  else if (method) {
    method = cleanPath(method);
    method = trimJsFileExtension(method) + '.js';
    method = resolvePath(METHODS, method);
    if ( !isFile(method) ) {
      throw setMethodError(new RangeError, method);
    }
    method = getPathName(method);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-flags

  flags = cloneObject(FLAGS);
  flags.externs = makeClosureExterns(EXTERNS);

  freezeObject(flags);

  /// #}}} @step make-flags

  /// #{{{ @step make-branch

  branch = new Branch(null, 'browser', CONFIG.branches.browser, SRC, DEST,
    method, STATE, flags);

  /// #}}} @step make-branch

  /// #{{{ @step build-vitals

  moldSource(SRC, {
    'quiet': false,
    'verbose': true
  }, function buildVitals(run) {
    branch.build(run);
  });

  /// #}}} @step build-vitals
}
/// #}}} @func buildBrowser

/// #{{{ @func buildNode
/**
 * @public
 * @param {?string=} method
 *   The #method must be the name of a *vitals* `@super` method. It must exist
 *   in the `../src/methods` directory matching the file name `<method>.js`.
 * @return {void}
 */
function buildNode(method) {

  /// #{{{ @step declare-variables

  /** @type {!Branch} */
  var branch;
  /** @type {!Object} */
  var flags;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isUndefined(method) || isNull(method) ) {
    method = '';
  }
  else if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', '?string=');
  }
  else if (method) {
    method = cleanPath(method);
    method = trimJsFileExtension(method) + '.js';
    method = resolvePath(METHODS, method);
    if ( !isFile(method) ) {
      throw setMethodError(new RangeError, method);
    }
    method = getPathName(method);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-flags

  flags = cloneObject(FLAGS);
  flags.externs = makeClosureExterns(EXTERNS);

  freezeObject(flags);

  /// #}}} @step make-flags

  /// #{{{ @step make-branch

  branch = new Branch(null, 'node', CONFIG.branches.node, SRC, DEST, method,
    STATE, flags);

  /// #}}} @step make-branch

  /// #{{{ @step build-vitals

  moldSource(SRC, {
    'quiet': false,
    'verbose': true
  }, function buildVitals(run) {
    branch.build(run);
  });

  /// #}}} @step build-vitals
}
/// #}}} @func buildNode

/// #{{{ @func buildDocs
/**
 * @public
 * @param {?string=} method
 *   The #method must be the name of a *vitals* `@super` method. It must exist
 *   in the `../src/methods` directory matching the file name `<method>.js`.
 * @return {void}
 */
function buildDocs(method) {

  /// #{{{ @step declare-variables

  /** @type {!Branch} */
  var branch;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isUndefined(method) || isNull(method) ) {
    method = '';
  }
  else if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', '?string=');
  }
  else if (method) {
    method = cleanPath(method);
    method = trimJsFileExtension(method) + '.js';
    method = resolvePath(METHODS, method);
    if ( !isFile(method) ) {
      throw setMethodError(new RangeError, method);
    }
    method = getPathName(method);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-branch

  branch = new Branch(null, 'docs', CONFIG.branches.docs, SRC, DEST, method,
    STATE, null, trimDocs);

  /// #}}} @step make-branch

  /// #{{{ @step build-vitals

  moldSource(SRC, {
    'quiet': false,
    'verbose': true
  }, function buildVitals(run) {
    branch.build(run);
  });

  /// #}}} @step build-vitals
}
/// #}}} @func buildDocs

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
