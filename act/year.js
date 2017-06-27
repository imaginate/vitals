/**
 * ---------------------------------------------------------------------------
 * YEAR TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task updates the copyright year for the entire repo. Use `act year`
 *   to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'updates vitals copyright year for entire repo';
exports['method'] = updateAll;

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

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var PATT = {
  ANY: /(copyright[ \t]*)2[0-9]{3}(?:-2[0-9]{3})?/i,
  DOCTAG: /(@copyright[ \t]+)2[0-9]{3}(?:-2[0-9]{3})?\b/
};
/// #}}} @const PATT

/// #{{{ @const PRESENT
/**
 * @private
 * @const {string}
 */
var PRESENT = loadHelper('get-present-year').asString();
/// #}}} @const PRESENT

/// #{{{ @const CREATED
/**
 * @private
 * @const {string}
 */
var CREATED = loadHelper('has-own-property')(CONFIG, 'created')
  ? CONFIG.created
  : PRESENT;
/// #}}} @const CREATED

/// #{{{ @const YEAR
/**
 * @private
 * @const {string}
 */
var YEAR = CREATED === PRESENT
  ? PRESENT
  : CREATED + '-' + PRESENT;
/// #}}} @const YEAR

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

/// #{{{ @func setCreatedError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} year
 * @return {!RangeError}
 */
function setCreatedError(err, year) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(year) )
    throw setTypeError(new TypeError, 'year', 'string');

  msg = 'invalid `build` config property year for `created`\n' +
    '    valid-range: `2010 <= Number(createdYear) <= presentYear`\n' +
    '    actual-value: `' + year + '`';

  return setError(err, msg);
}
/// #}}} @func setCreatedError

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

/// #{{{ @func setPresentError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} year
 * @return {!RangeError}
 */
function setPresentError(err, year) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(year) )
    throw setTypeError(new TypeError, 'year', 'string');

  msg = 'invalid `year` returned by `getPresentYear` helper\n' +
    '    valid-range: `2010 <= Number(presentYear) <= 2999`\n' +
    '    actual-value: `' + year + '`';

  return setError(err, msg);
}
/// #}}} @func setPresentError

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

/// #{{{ @group GET

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} path
 * @param {boolean=} buffer
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
var getFilePaths = loadHelper('get-filepaths');
/// #}}} @func getFilePaths

/// #}}} @group GET

/// #{{{ @group HAS

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

/// #{{{ @func isList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isList = IS.list;
/// #}}} @func isList

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
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #{{{ @func isYear
/**
 * @private
 * @param {*} val
 * @param {(!Date|number|string)=} min = `2000`
 * @param {(!Date|number|string)=} max = `2999`
 * @return {boolean}
 */
var isYear = IS.year;
/// #}}} @func isYear

/// #}}} @group IS

/// #{{{ @group OBJECT

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
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #{{{ @group TO

/// #{{{ @func toFile
/**
 * @private
 * @param {(!Buffer|string)} content
 * @param {string} filepath
 * @return {(!Buffer|string)}
 */
var toFile = loadHelper('to-file');
/// #}}} @func toFile

/// #}}} @group TO

/// #{{{ @group UPDATE

/// #{{{ @func update
/**
 * @private
 * @param {(!Array<string>|string)} path
 * @param {!RegExp} pattern
 * @param {string} year
 * @return {void}
 */
var update = (function updatePrivateScope() {

  /// #{{{ @func update
  /**
   * @param {(!Array<string>|string)} path
   * @param {!RegExp} pattern
   * @param {string} year
   * @return {void}
   */
  function update(path, pattern, year) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var replacement;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    if ( !isString(path) && !isStringList(path) )
      throw setTypeError(new TypeError, 'path', '(!Array<string>|string)');
    if ( !isRegExp(pattern) )
      throw setTypeError(new TypeError, 'pattern', '!RegExp');
    if ( !isString(year) )
      throw setTypeError(new TypeError, 'year', 'string');

    /// #}}} @step verify-parameters

    /// #{{{ @step make-replacement

    replacement = '$1' + year;

    /// #}}} @step make-replacement

    /// #{{{ @step update-paths

    if ( isString(path) ) {
      if (pattern.global)
        _globalUpdate(path, pattern, replacement);
      else
        _update(path, pattern, replacement);
    }
    else if (pattern.global)
      _globalUpdateEach(path, pattern, replacement);
    else
      _updateEach(path, pattern, replacement);

    /// #}}} @step update-paths
  }
  /// #}}} @func update

  /// #{{{ @func _globalUpdate
  /**
   * @private
   * @param {string} path
   * @param {!RegExp} pattern
   * @param {string} replacement
   * @return {void}
   */
  function _globalUpdate(path, pattern, replacement) {

    /** @type {string} */
    var content;

    pattern.lastIndex = 0;
    content = getFileContent(path);
    content = content.replace(pattern, replacement);
    toFile(content, path);
  }
  /// #}}} @func _globalUpdate

  /// #{{{ @func _globalUpdateEach
  /**
   * @private
   * @param {!Array<string>} paths
   * @param {!RegExp} pattern
   * @param {string} replacement
   * @return {void}
   */
  function _globalUpdateEach(paths, pattern, replacement) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = paths.length;
    i = -1;
    while (++i < len)
      _globalUpdate(paths[i], pattern, replacement);
  }
  /// #}}} @func _globalUpdateEach

  /// #{{{ @func _update
  /**
   * @private
   * @param {string} path
   * @param {!RegExp} pattern
   * @param {string} replacement
   * @return {void}
   */
  function _update(path, pattern, replacement) {

    /** @type {string} */
    var content;

    content = getFileContent(path);
    content = content.replace(pattern, replacement);
    toFile(content, path);
  }
  /// #}}} @func _update

  /// #{{{ @func _updateEach
  /**
   * @private
   * @param {!Array<string>} paths
   * @param {!RegExp} pattern
   * @param {string} replacement
   * @return {void}
   */
  function _updateEach(paths, pattern, replacement) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = paths.length;
    i = -1;
    while (++i < len)
      _update(paths[i], pattern, replacement);
  }
  /// #}}} @func _updateEach

  return update;
})();
/// #}}} @func update

/// #}}} @group UPDATE

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

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var DIR = {
  REPO: REPO,
  SRC: resolvePath(REPO, CONFIG.src),
  DIST: resolvePath(REPO, CONFIG.dest),
  TASK: resolvePath(__dirname),
  TEST: resolvePath(REPO, './test')
};
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var FILE = {
  COPYRIGHT: resolvePath(REPO, './COPYRIGHT.md'),
  LICENSE: resolvePath(REPO, './LICENSE.md')
};
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func updateAll
/**
 * @public
 * @return {void}
 */
function updateAll() {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var files;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-years

  if ( !isYear(PRESENT, 2010) )
    throw setPresentError(new RangeError, PRESENT);
  if ( !isYear(CREATED, 2010, PRESENT) )
    throw setCreatedError(new RangeError, CREATED);

  /// #}}} @step verify-years

  /// #{{{ @step verify-paths

  if ( !isDirectory(DIR.SRC) )
    throw setDirError(new Error, 'DIR.SRC', DIR.SRC);
  if ( !isDirectory(DIR.TASK) )
    throw setDirError(new Error, 'DIR.TASK', DIR.TASK);
  if ( !isDirectory(DIR.TEST) )
    throw setDirError(new Error, 'DIR.TEST', DIR.TEST);
  if ( !isFile(FILE.LICENSE) )
    throw setFileError(new Error, 'FILE.LICENSE', FILE.LICENSE);
  if ( !isFile(FILE.COPYRIGHT) )
    throw setFileError(new Error, 'FILE.COPYRIGHT', FILE.COPYRIGHT);

  /// #}}} @step verify-paths

  /// #{{{ @step update-src

  files = getFilePaths(DIR.SRC, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/
  });
  update(files, PATT.DOCTAG, YEAR);

  /// #}}} @step update-src

  /// #{{{ @step update-dist

  if ( isDirectory(DIR.DIST) ) {
    files = getFilePaths(DIR.DIST, {
      'deep': true,
      'full': true,
      'validFiles': /\.js$/
    });
    update(files, PATT.DOCTAG, YEAR);
  }

  /// #}}} @step update-dist

  /// #{{{ @step update-task

  files = getFilePaths(DIR.TASK, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/
  });
  update(files, PATT.DOCTAG, YEAR);

  /// #}}} @step update-task

  /// #{{{ @step update-test

  files = getFilePaths(DIR.TEST, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/
  });
  update(files, PATT.DOCTAG, YEAR);

  /// #}}} @step update-test

  /// #{{{ @step update-license

  update(FILE.LICENSE, PATT.ANY, YEAR);
  update(FILE.COPYRIGHT, PATT.ANY, YEAR);

  /// #}}} @step update-license
}
/// #}}} @func updateAll

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
