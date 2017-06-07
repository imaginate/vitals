/**
 * ---------------------------------------------------------------------------
 * VERSION TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task updates the version number in the entire repo. Use
 *   `act version` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'updates version for the repo';
exports['value'] = 'x.x.x-pre.x';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates version for entire repo',
    'value': 'x.x.x-pre.x',
    'method': updateAllVersion
  },
  'npm': {
    'desc': 'updates only npm version',
    'value': 'x.x.x-pre.x',
    'method': updateNPMVersion
  },
  'docs': {
    'desc': 'updates the docs version',
    'value': 'x.x.x-pre.x',
    'method': updateDocsVersion
  }
};

/// #}}} @group EXPORTS

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./_load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const SEMANTIC
/**
 * @private
 * @const {!RegExp}
 */
var SEMANTIC  = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
/// #}}} @const SEMANTIC

/// #{{{ @const NPM_BADGE
/**
 * @private
 * @const {!RegExp}
 */
var NPM_BADGE = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
/// #}}} @const NPM_BADGE

/// #{{{ @const ALL_VERSION
/**
 * @private
 * @const {!RegExp}
 */
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
/// #}}} @const ALL_VERSION

/// #{{{ @const NPM_VERSION
/**
 * @private
 * @const {!RegExp}
 */
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;
/// #}}} @const NPM_VERSION

/// #{{{ @const REPO_ROOT
/**
 * @private
 * @const {string}
 */
var REPO_ROOT = loadHelper('get-repo-root')();
/// #}}} @const REPO_ROOT

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isSemVersion
/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && SEMANTIC.test(version);
}
/// #}}} @func isSemVersion

/// #{{{ @func getFile
/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFile = loadHelper('get-file-content');
/// #}}} @func getFile

/// #{{{ @func getFilepaths
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
var getFilepaths = loadHelper('get-filepaths');
/// #}}} @func getFilepaths

/// #{{{ @func getVersion
/**
 * @private
 * @return {string}
 */
var getVersion = loadHelper('get-version');
/// #}}} @func getVersion

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func toFile
/**
 * @private
 * @param {(!Buffer|string)} content
 * @param {string} filepath
 * @return {(!Buffer|string)}
 */
var toFile = loadHelper('to-file');
/// #}}} @func toFile
/// #}}} @group HELPERS

/// #{{{ @group MAIN-METHODS
//////////////////////////////////////////////////////////////////////////////
// MAIN-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func updateAllVersion
/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var path;

  if ( !isSemVersion(version) )
    throw new Error('invalid `version` (must be a semantic version)');

  files = getFilepaths(REPO_ROOT, {
    'deep': false,
    'full': true,
    'validFiles': /\.js$/
  });
  insertVersions(files, version);

  path = resolvePath(REPO_ROOT, './src');
  files = getFilepaths(path, {
    'deep': true,
    'full': true,
    'validFiles': /\.js$/
  });
  insertVersions(files, version);

  updateNPMVersion(version);
}
/// #}}} @func updateAllVersion

/// #{{{ @func updateNPMVersion
/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  /** @type {string} */
  var content;
  /** @type {string} */
  var path;

  if ( !isSemVersion(version) )
    throw new Error('invalid `version` (must be a semantic version)');

  path = resolvePath(REPO_ROOT, './README.md');
  insertBadge(path, version);

  path = resolvePath(REPO_ROOT, './package.json');
  content = getFile(path);
  content = content.replace(NPM_VERSION, '$1' + version);
  toFile(content, path);
}
/// #}}} @func updateNPMVersion

/// #{{{ @func updateDocsVersion
/**
 * @public
 * @param {string=} version
 */
function updateDocsVersion(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var path;

  version = version || getVersion();

  if ( !isSemVersion(version) )
    throw new Error('invalid `version` (must be a semantic version)');

  path = resolvePath(REPO_ROOT, '../vitals-wiki');
  files = getFilepaths(path, {
    'deep': false,
    'full': true,
    'validFiles': /\.md$/
  });
  insertBadges(files, version);

  path = resolvePath(REPO_ROOT, './act/mk-doc/templates');
  files = getFilepaths(path, {
    'deep': true,
    'full': true,
    'validFiles': /\.(?:tmpl|md)$/
  });
  insertBadges(files, version);
}
/// #}}} @func updateDocsVersion
/// #}}} @group MAIN-METHODS

/// #{{{ @group INSERT-METHODS
//////////////////////////////////////////////////////////////////////////////
// INSERT-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func insertBadge
/**
 * @private
 * @param {string} filepath
 * @param {string} version
 * @return {void}
 */
function insertBadge(filepath, version) {

  /** @type {string} */
  var content;

  version = '$1' + version.replace(/-/g, '--');
  content = getFile(filepath);
  content = content.replace(NPM_BADGE, version);
  toFile(content, filepath);
}
/// #}}} @func insertBadge

/// #{{{ @func insertBadges
/**
 * @private
 * @param {!Array<string>} files
 * @param {string} version
 * @return {void}
 */
function insertBadges(files, version) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = files.length;
  i = -1;
  while (++i < len)
    insertBadge(files[i], version);
}
/// #}}} @func insertBadges

/// #{{{ @func insertVersion
/**
 * @private
 * @param {string} filepath
 * @param {string} version
 * @return {void}
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = getFile(filepath);
  content = content.replace(ALL_VERSION, '$1' + version);
  toFile(content, filepath);
}
/// #}}} @func insertVersion

/// #{{{ @func insertVersions
/**
 * @private
 * @param {!Array<string>} files
 * @param {string} version
 * @return {void}
 */
function insertVersions(files, version) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = files.length;
  i = -1;
  while (++i < len)
    insertVersion(files[i], version);
}
/// #}}} @func insertVersions
/// #}}} @group INSERT-METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
