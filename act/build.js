/**
 * ---------------------------------------------------------------------------
 * BUILD TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task preprocesses, compiles, and minifies the vitals source code
 *   into distributable versions and documentation. Use `act build` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'builds distributable versions of vitals';
exports['default'] = '-dist';
exports['methods'] = {
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

/// #{{{ @func loadJsppHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadJsppHelper = require('./preprocessor/helpers/load-helper.js');
/// #}}} @func loadJsppHelper

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

/// #{{{ @const MODE
/**
 * @private
 * @const {string}
 */
var MODE = '0755';
/// #}}} @const MODE

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

/// #{{{ @group MAKE

/// #{{{ @func makeDirectory
/**
 * @private
 * @param {string} path
 * @param {string=} mode = `"0755"`
 * @return {string}
 */
var makeDirectory = loadHelper('make-directory');
/// #}}} @func makeDirectory

/// #}}} @group MAKE

/// #{{{ @group GOOG

/// #}}} @group GOOG

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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isDirNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDirNode = loadJsppHelper('is-directory-node');
/// #}}} @func isDirNode

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

/// #{{{ @func isStateObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStateObject = loadJsppHelper('is-state-object');
/// #}}} @func isStateObject

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
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group JSPP

/// #{{{ @func initPreprocessor
/**
 * @private
 * @param {string} src
 *   The file-system path to the root directory containing the source code you
 *   want to preprocess.
 * @param {(?function(string))=} log = `console.log || null`
 *   The `function` to use when logging progress indicators. If it is `null`,
 *   no progress messages are logged.
 * @return {!Dir}
 */
var initPreprocessor = require('./preprocessor/main.js');
/// #}}} @func initPreprocessor

/// #}}} @group JSPP

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

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func buildDist
/**
 * @public
 * @return {void}
 */
function buildDist() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var branch;
  /** @type {!Dir} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  dir = initPreprocessor(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-browser-dist

  branch = CONFIG.branches.browser;
  buildBranch(dir, branch, SRC, DEST, STATE);

  /// #}}} @step build-browser-dist

  /// #{{{ @step build-node-dist

  branch = CONFIG.branches.node;
  buildBranch(dir, branch, SRC, DEST, STATE);

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
  /** @type {!Dir} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  dir = initPreprocessor(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-browser-dist

  branch = CONFIG.branches.browser;
  buildBranch(dir, branch, SRC, DEST, STATE);

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
  /** @type {!Dir} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  dir = initPreprocessor(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-node-dist

  branch = CONFIG.branches.node;
  buildBranch(dir, branch, SRC, DEST, STATE);

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
  /** @type {!Dir} */
  var dir;

  /// #}}} @step declare-variables

  /// #{{{ @step preprocess-source

  dir = initPreprocessor(SRC);

  /// #}}} @step preprocess-source

  /// #{{{ @step build-docs

  branch = CONFIG.branches.docs;
  buildBranch(dir, branch, SRC, DEST, STATE);

  /// #}}} @step build-docs
}
/// #}}} @func buildDocs

/// #{{{ @func buildBranches
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object<string, !Object>} branches
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(?function(string): string)=} alter
 * @return {void}
 */
function buildBranches(dir, branches, src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isDirNode(dir) )
    throw setTypeError(new TypeError, 'dir', '!Dir');
  if ( !isObject(branches) || !isObjectHashMap(branches) )
    throw setTypeError(new TypeError, 'branches', '!Object<string, !Object>');
  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');
  if (!src)
    throw setEmptyError(new Error, 'src');
  if ( !isDirectory(src) )
    throw setDirError(new Error, 'src', src);
  if ( !isString(dest) )
    throw setTypeError(new TypeError, 'dest', 'string');
  if (!dest)
    throw setEmptyError(new Error, 'dest');
  if ( !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');
  if ( !isNull(alter) && !isUndefined(alter) && !isFunction(alter) )
    throw setTypeError(new TypeError, 'alter', '(?function(string): string)=');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) )
    makeDirectory(dest, MODE);

  /// #}}} @step make-dest

  /// #{{{ @step build-each-branch

  for (key in branches) {
    if ( hasOwnProperty(branches, key) ) {
      buildBranch(dir, branches[key], src, dest, state, alter);
    }
  }

  /// #}}} @step build-each-branch
}
/// #}}} @func buildBranches

/// #{{{ @func buildBranch
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object} branch
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(?function(string): string)=} alter
 * @return {void}
 */
function buildBranch(dir, branch, src, dest, state, alter) {

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) )
    makeDirectory(dest, MODE);

  /// #}}} @step make-dest

  src = hasOwnProperty(branch, 'src')
    ? resolvePath(src, branch.src)
    : resolvePath(src);
  dest = hasOwnProperty(branch, 'dest')
    ? resolvePath(dest, branch.dest)
    : resolvePath(dest);
  state = hasOwnProperty(branch, 'state')
    ? mergeObject(state, branch.state)
    : cloneObject(state);

  if ( hasOwnProperty(branch, 'files') )
    buildFiles(dir, branch.files, src, dest, state, alter);

  if ( hasOwnProperty(branch, 'branches') )
    buildBranches(dir, branch.branches, src, dest, state, alter);
}
/// #}}} @func buildBranch

/// #{{{ @func buildFiles
/**
 * @private
 * @param {!Dir} dir
 * @param {!Array<!Object>} files
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(?function(string): string)=} alter
 * @return {void}
 */
function buildFiles(dir, files, src, dest, state, alter) {

  /** @type {!Array<!Object>} */
  var files;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #{{{ @step make-dest

  if ( !isDirectory(dest) )
    makeDirectory(dest, MODE);

  /// #}}} @step make-dest

  len = files.length;
  i = -1;
  while (++i < len)
    buildFile(dir, files[i], src, dest, state, alter);
}
/// #}}} @func buildFiles

/// #{{{ @func buildFile
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object} file
 * @param {string} src
 * @param {string} dest
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @param {(?function(string): string)=} alter
 * @return {string}
 */
function buildFile(dir, file, src, dest, state, alter) {

  if ( !hasOwnProperty(file, 'src') )
    throw new ReferenceError('missing `src` property for a `file` in `config`');
  if ( !hasOwnProperty(file, 'dest') )
    throw new ReferenceError('missing `dest` property for a `file` in `config`');

  src = resolvePath(src, file.src);
  dest = resolvePath(dest, file.dest);
  state = hasOwnProperty(file, 'state')
    ? mergeObject(state, file.state)
    : cloneObject(state);
  return alter
    ? dir.run(src, dest, state, alter)
    : dir.run(src, dest, state);
}
/// #}}} @func buildFile

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
