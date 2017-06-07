/**
 * ---------------------------------------------------------------------------
 * YEAR TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task updates the copyright year for the entire repo. Use `act year`
 *   to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'updates year in entire repo';
exports['value'] = '2xxx';
exports['method'] = updateYear;

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

/// #{{{ @const YEAR_FIND
/**
 * @private
 * @const {!RegExp}
 */
var YEAR_FIND = /(copyright )2[0-9]{3}/ig;
/// #}}} @const YEAR_FIND

/// #{{{ @const YEAR_VAL
/**
 * @private
 * @const {!RegExp}
 */
var YEAR_VAL = /^2[0-9]{3}$/;
/// #}}} @const YEAR_VAL

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

/// #{{{ @func isYear
/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && YEAR_VAL.test(year);
}
/// #}}} @func isYear

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

/// #{{{ @func updateYear
/**
 * @public
 * @param {string} year
 */
function updateYear(year) {

  /** @type {!Array<string>} */
  var files;

  if ( !isYear(year) )
    throw new Error('invalid `year` (must be a year - `2xxx`)');

  files = getFilepaths(REPO_ROOT, {
    'deep': true,
    'full': true,
    'validFiles': /\.(?:js|tmpl|md)$/
  });
  insertYears(files, year);
}
/// #}}} @func updateYear
/// #}}} @group MAIN-METHODS

/// #{{{ @group INSERT-METHODS
//////////////////////////////////////////////////////////////////////////////
// INSERT-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func insertYear
/**
 * @private
 * @param {string} filepath
 * @param {string} year
 * @return {void}
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;

  year = '$1' + year;
  content = getFile(filepath);
  content = content.replace(YEAR_FIND, year);
  toFile(content, filepath);
}
/// #}}} @func insertYear

/// #{{{ @func insertYears
/**
 * @private
 * @param {!Array<string>} files
 * @param {string} year
 * @return {void}
 */
function insertYears(files, year) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = files.length;
  i = -1;
  while (++i < len)
    insertYear(files[i], year);
}
/// #}}} @func insertYears
/// #}}} @group INSERT-METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
