/**
 * ---------------------------------------------------------------------------
 * VERSION TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task updates the semantic version for the *vitals* repo. Use
 *   `act version` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'updates semantic version for vitals repo';
exports['value'] = 'x.x.x-pre.x';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates semantic version for entire repo',
    'value': 'x.x.x-pre.x',
    'method': updateAll
  },
  'src': {
    'desc': 'updates semantic version in the source code',
    'value': 'x.x.x-pre.x',
    'method': updateSrc
  },
  'dist': {
    'desc': 'updates semantic version in the compiled code',
    'value': 'x.x.x-pre.x',
    'method': updateDist
  },
  'npm': {
    'desc': 'updates semantic version for npm in package & readme',
    'value': 'x.x.x-pre.x',
    'method': updateNpm
  },
  'docs': {
    'desc': 'updates semantic version for vitals docs',
    'value': 'x.x.x-pre.x',
    'method': updateDocs
  }
};

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

/// #{{{ @const SEMVER
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var SEMVER = {
  ANY: /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?\b/,
  BADGE: /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+(?:\.[0-9]+)?)?(?=[a-z]+\.svg)/,
  CONST: /\b(var[ \t]+VERSION[ \t]*=[ \t]*')[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?(?=';)/,
  DOCTAG: /\b(@version[ \t]+)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?\b/,
  NODEPKG: /("version"[ \t]*:[ \t]*")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?(?=")/
};
/// #}}} @const SEMVER

/// #{{{ @const VERSION
/**
 * @private
 * @const {string}
 */
var VERSION = loadHelper('get-version')();
/// #}}} @const VERSION

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

/// #{{{ @func setSemVerError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} version
 * @return {!RangeError}
 */
function setSemVerError(err, version) {

  /** @type {string} */
  var patt;
  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(version) )
    throw setTypeError(new TypeError, 'version', 'string');

  patt = '/^[0-9]+\\.[0-9]+\\.[0-9]+(-[a-z]+(\\.[0-9]+)?)?$/';

  msg = 'invalid semantic version for `version` parameter\n' +
    '    valid-semver-pattern: `' + patt + '`\n' +
    '    received-version: `' + version + '`';

  return setError(err, msg);
}
/// #}}} @func setSemVerError

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

/// #{{{ @func isSemanticVersion
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isSemanticVersion = IS.semanticVersion;
/// #}}} @func isSemanticVersion

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

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeBadge
/**
 * @private
 * @param {string} version
 * @return {string}
 */
function makeBadge(version) {

  if ( !isString(version) )
    throw setTypeError(new TypeError, 'version', 'string');

  return version.replace(/-/g, '--');
}
/// #}}} @func makeBadge

/// #}}} @group MAKE

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
 * @param {string} version
 * @return {void}
 */
var update = (function updatePrivateScope() {

  /// #{{{ @func update
  /**
   * @param {(!Array<string>|string)} path
   * @param {!RegExp} pattern
   * @param {string} version
   * @return {void}
   */
  function update(path, pattern, version) {

    /// #{{{ @step declare-variables

    /** @type {string} */
    var replacement;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    if ( !isString(path) && !isStringList(path) )
      throw setTypeError(new TypeError, 'path', '(!Array<string>|string)');
    if ( !isRegExp(pattern) )
      throw setTypeError(new TypeError, 'pattern', '!RegExp');
    if ( !isString(version) )
      throw setTypeError(new TypeError, 'version', 'string');

    /// #}}} @step verify-parameters

    /// #{{{ @step make-replacement

    replacement = '$1' + version;

    /// #}}} @step make-replacement

    /// #{{{ @step update-paths

    if ( isString(path) )
      _update(path, pattern, replacement);
    else
      _updateEach(path, pattern, replacement);

    /// #}}} @step update-paths
  }
  /// #}}} @func update

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
  DOCS: resolvePath(REPO, CONFIG.dest, CONFIG.branches.docs.dest),
  TMPLS: resolvePath(REPO, './act/docs/templates')
};
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var FILE = {
  PKG: resolvePath(REPO, './package.json'),
  CONST: resolvePath(DIR.SRC, './constants/version.js'),
  README: resolvePath(REPO, './README.md')
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
 * @param {(?string|undefined)=} version = `require("../package.json").version`
 */
function updateAll(version) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var badge;

  /// #}}} @step declare-variables

  /// #{{{ @step setup-version

  if ( !isNull(version) && !isUndefined(version) && !isString(version) )
    throw setTypeError(new TypeError, 'version', '?string=');

  if (!version)
    version = VERSION;

  if ( !isSemanticVersion(version) )
    throw setSemVerError(new RangeError, version);

  /// #}}} @step setup-version

  /// #{{{ @step make-badge

  badge = makeBadge(version);

  /// #}}} @step make-badge

  /// #{{{ @step update-src

  if ( !isDirectory(DIR.SRC) )
    throw setDirError(new Error, 'DIR.SRC', DIR.SRC);
  if ( !isFile(FILE.CONST) )
    throw setFileError(new Error, 'FILE.CONST', FILE.CONST);

  files = getFilePaths(DIR.SRC, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.DOCTAG, version);
  update(FILE.CONST, SEMVER.CONST, version);

  /// #}}} @step update-src

  /// #{{{ @step update-dist

  if ( isDirectory(DIR.DIST) ) {
    files = getFilePaths(DIR.DIST, {
      'deep': true,
      'full': true,
      'validFiles': /\.js$/,
      'invalidFiles': /^\./
    });
    update(files, SEMVER.CONST, version);
    update(files, SEMVER.DOCTAG, version);
  }

  /// #}}} @step update-dist

  /// #{{{ @step update-npm

  if ( !isFile(FILE.PKG) )
    throw setFileError(new Error, 'FILE.PKG', FILE.PKG);
  if ( !isFile(FILE.README) )
    throw setFileError(new Error, 'FILE.README', FILE.README);

  update(FILE.PKG, SEMVER.NODEPKG, version);
  update(FILE.README, SEMVER.BADGE, badge);

  /// #}}} @step update-npm

  /// #{{{ @step update-docs

  if ( isDirectory(DIR.DOCS) ) {
    files = getFilePaths(DIR.DOCS, {
      'deep': true,
      'full': true,
      'validFiles': /\.md$/,
      'invalidFiles': /^\./
    });
    update(files, SEMVER.BADGE, badge);
  }

  /// #}}} @step update-docs

  /// #{{{ @step update-templates

  if ( !isDirectory(DIR.TMPLS) )
    throw setDirError(new Error, 'DIR.TMPLS', DIR.TMPLS);

  files = getFilePaths(DIR.TMPLS, {
    'deep': true,
    'full': true,
    'validFiles': /\.(?:md|tmpl)$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.BADGE, badge);

  /// #}}} @step update-templates
}
/// #}}} @func updateAll

/// #{{{ @func updateSrc
/**
 * @public
 * @param {(?string|undefined)=} version = `require("../package.json").version`
 */
function updateSrc(version) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var files;

  /// #}}} @step declare-variables

  /// #{{{ @step setup-version

  if ( !isNull(version) && !isUndefined(version) && !isString(version) )
    throw setTypeError(new TypeError, 'version', '?string=');

  if (!version)
    version = VERSION;

  if ( !isSemanticVersion(version) )
    throw setSemVerError(new RangeError, version);

  /// #}}} @step setup-version

  /// #{{{ @step update-src

  if ( !isDirectory(DIR.SRC) )
    throw setDirError(new Error, 'DIR.SRC', DIR.SRC);
  if ( !isFile(FILE.CONST) )
    throw setFileError(new Error, 'FILE.CONST', FILE.CONST);

  files = getFilePaths(DIR.SRC, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.DOCTAG, version);
  update(FILE.CONST, SEMVER.CONST, version);

  /// #}}} @step update-src
}
/// #}}} @func updateSrc

/// #{{{ @func updateDist
/**
 * @public
 * @param {(?string|undefined)=} version = `require("../package.json").version`
 */
function updateDist(version) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var files;

  /// #}}} @step declare-variables

  /// #{{{ @step setup-version

  if ( !isNull(version) && !isUndefined(version) && !isString(version) )
    throw setTypeError(new TypeError, 'version', '?string=');

  if (!version)
    version = VERSION;

  if ( !isSemanticVersion(version) )
    throw setSemVerError(new RangeError, version);

  /// #}}} @step setup-version

  /// #{{{ @step update-dist

  if ( !isDirectory(DIR.DIST) )
    throw setDirError(new Error, 'DIR.DIST', DIR.DIST);

  files = getFilePaths(DIR.DIST, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.CONST, version);
  update(files, SEMVER.DOCTAG, version);

  /// #}}} @step update-dist
}
/// #}}} @func updateDist

/// #{{{ @func updateNpm
/**
 * @public
 * @param {(?string|undefined)=} version = `require("../package.json").version`
 */
function updateNpm(version) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var badge;

  /// #}}} @step declare-variables

  /// #{{{ @step setup-version

  if ( !isNull(version) && !isUndefined(version) && !isString(version) )
    throw setTypeError(new TypeError, 'version', '?string=');

  if (!version)
    version = VERSION;

  if ( !isSemanticVersion(version) )
    throw setSemVerError(new RangeError, version);

  /// #}}} @step setup-version

  /// #{{{ @step make-badge

  badge = makeBadge(version);

  /// #}}} @step make-badge

  /// #{{{ @step update-npm

  if ( !isFile(FILE.PKG) )
    throw setFileError(new Error, 'FILE.PKG', FILE.PKG);
  if ( !isFile(FILE.README) )
    throw setFileError(new Error, 'FILE.README', FILE.README);

  update(FILE.PKG, SEMVER.NODEPKG, version);
  update(FILE.README, SEMVER.BADGE, badge);

  /// #}}} @step update-npm
}
/// #}}} @func updateNpm

/// #{{{ @func updateDocs
/**
 * @public
 * @param {(?string|undefined)=} version = `require("../package.json").version`
 */
function updateDocs(version) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var badge;

  /// #}}} @step declare-variables

  /// #{{{ @step setup-version

  if ( !isNull(version) && !isUndefined(version) && !isString(version) )
    throw setTypeError(new TypeError, 'version', '?string=');

  if (!version)
    version = VERSION;

  if ( !isSemanticVersion(version) )
    throw setSemVerError(new RangeError, version);

  /// #}}} @step setup-version

  /// #{{{ @step make-badge

  badge = makeBadge(version);

  /// #}}} @step make-badge

  /// #{{{ @step update-docs

  if ( !isDirectory(DIR.DOCS) )
    throw setDirError(new Error, 'DIR.DOCS', DIR.DOCS);

  files = getFilePaths(DIR.DOCS, {
    'deep': true,
    'full': true,
    'validFiles': /\.md$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.BADGE, badge);

  /// #}}} @step update-docs

  /// #{{{ @step update-templates

  if ( !isDirectory(DIR.TMPLS) )
    throw setDirError(new Error, 'DIR.TMPLS', DIR.TMPLS);

  files = getFilePaths(DIR.TMPLS, {
    'deep': true,
    'full': true,
    'validFiles': /\.(?:md|tmpl)$/,
    'invalidFiles': /^\./
  });
  update(files, SEMVER.BADGE, badge);

  /// #}}} @step update-templates
}
/// #}}} @func updateDocs

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
