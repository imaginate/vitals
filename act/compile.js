/**
 * ---------------------------------------------------------------------------
 * COMPILE TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task compiles the source code into distributable code. Use
 *   `act compile` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @const 
/**
 * @private
 * @const {!RegExp}
 */
/// #}}} @const 

/// #{{{ @func 
/// #}}} @func 

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'compiles the src';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'compiles the browser & node src',
    'method': compileAll
  },
  'browser': {
    'desc': 'compiles the browser src',
    'method': compileBrowser
  },
  'node': {
    'desc': 'compiles the node src',
    'method': compileNode
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

/// #{{{ @const CONFIG
/**
 * @private
 * @const {!Object}
 */
var CONFIG = require('./preprocessor/config.json');
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

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func mergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var mergeObject = loadHelper('merge-object');
/// #}}} @func mergeObject

/// #{{{ @func mkdir
/**
 * @private
 * @param {string} path
 * @param {string} mode
 * @return {void}
 */
var mkdir = require('fs').mkdirSync;
/// #}}} @func mkdir

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

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

/// #{{{ @func compileAll
/**
 * @public
 * @return {void}
 */
function compileAll() {

  /** @type {!Dir} */
  var dir;

  dir = initPreprocessor(SRC);
  compileBranches(dir, CONFIG.branches, SRC, DEST, STATE);
}
/// #}}} @func compileAll

/// #{{{ @func compileBrowser
/**
 * @public
 * @return {void}
 */
function compileBrowser() {

  /** @type {!Object} */
  var branch;
  /** @type {!Dir} */
  var dir;

  dir = initPreprocessor(SRC);
  branch = CONFIG.branches.browser;
  compileBranch(dir, branch, SRC, DEST, STATE);
}
/// #}}} @func compileBrowser

/// #{{{ @func compileNode
/**
 * @public
 * @return {void}
 */
function compileNode() {

  /** @type {!Object} */
  var branch;
  /** @type {!Dir} */
  var dir;

  dir = initPreprocessor(SRC);
  branch = CONFIG.branches.node;
  compileBranch(dir, branch, SRC, DEST, STATE);
}
/// #}}} @func compileNode

/// #{{{ @func compileBranches
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object<string, !Object>} branches
 * @param {string} src
 * @param {string} dest
 * @param {!Object} state
 * @param {?function=} alter
 * @return {void}
 */
function compileBranches(dir, branches, src, dest, state, alter) {

  /** @type {string} */
  var key;

  if ( !isDirectory(dest) )
    mkdir(dest, MODE);

  for (key in branches) {
    if ( hasOwnProperty(branches, key) ) {
      compileBranch(dir, branches[key], src, dest, state, alter);
    }
  }
}
/// #}}} @func compileBranch

/// #{{{ @func compileBranch
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object} branch
 * @param {string} src
 * @param {string} dest
 * @param {!Object} state
 * @param {?function=} alter
 * @return {void}
 */
function compileBranch(dir, branch, src, dest, state, alter) {

  if ( !isDirectory(dest) )
    mkdir(dest, MODE);

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
    compileFiles(dir, branch.files, src, dest, state, alter);

  if ( hasOwnProperty(branch, 'branches') )
    compileBranches(dir, branch.branches, src, dest, state, alter);
}
/// #}}} @func compileBranch

/// #{{{ @func compileFiles
/**
 * @private
 * @param {!Dir} dir
 * @param {!Array<!Object>} files
 * @param {string} src
 * @param {string} dest
 * @param {!Object} state
 * @param {?function=} alter
 * @return {void}
 */
function compileFiles(dir, files, src, dest, state, alter) {

  /** @type {!Array<!Object>} */
  var files;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isDirectory(dest) )
    mkdir(dest, MODE);

  len = files.length;
  i = -1;
  while (++i < len)
    compileFile(dir, files[i], src, dest, state, alter);
}
/// #}}} @func compileFiles

/// #{{{ @func compileFile
/**
 * @private
 * @param {!Dir} dir
 * @param {!Object} file
 * @param {string} src
 * @param {string} dest
 * @param {!Object} state
 * @param {?function=} alter
 * @return {string}
 */
function compileFile(dir, file, src, dest, state, alter) {

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
/// #}}} @func compileFile

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
