/**
 * ---------------------------------------------------------------------------
 * SETUP-DUMMY-TREE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group TYPEDEFS
//////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
//////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {(string|!Array<string>)} Files
 */

/**
 * @typedef {!Object<string, (?Files|?Dirs)>} Dirs
 */

/// #}}} @group TYPEDEFS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group FS

/// #{{{ @func clearDummyTree
/**
 * @private
 * @return {void}
 */
var clearDummyTree = require('./clear-dummy-tree.js');
/// #}}} @func clearDummyTree

/// #{{{ @func makeDirectory
/**
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
var makeDirectory = require('./make-directory.js');
/// #}}} @func makeDirectory

/// #{{{ @func makeDummyPaths
/**
 * @private
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
var makeDummyPaths = require('./make-dummy-paths.js');
/// #}}} @func makeDummyPaths

/// #}}} @group FS

/// #{{{ @group PATH

/// #{{{ @func resolveDummyPath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolveDummyPath = require('./resolve-dummy-path.js');
/// #}}} @func resolveDummyPath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func setupDummyTree
/**
 * @public
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
function setupDummyTree(paths) {

  /// #{{{ @step clear-dummy-tree

  clearDummyTree();

  /// #}}} @step clear-dummy-tree

  /// #{{{ @step make-dummy-root-directory

  /// #{{{ @const ROOT_DIR
  /**
   * @private
   * @const {string}
   */
  var ROOT_DIR = resolveDummyPath();
  /// #}}} @const ROOT_DIR

  makeDirectory(ROOT_DIR, {
    'mode': '0755',
    'parents': false
  });

  /// #}}} @step make-dummy-root-directory

  /// #{{{ @step make-dummy-paths

  makeDummyPaths(paths);

  /// #}}} @step make-dummy-paths
}
/// #}}} @func setupDummyTree

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = setupDummyTree;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
