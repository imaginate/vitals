/**
 * ---------------------------------------------------------------------------
 * MAKE-DIRS METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} name
 * @return {!Function}
 */
var loadClass = loadHelper('load-class');
/// #}}} @func loadClass

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @group CONSTRUCTORS

/// #{{{ @func Dir
/**
 * @private
 * @param {string} path
 * @param {?Dir=} parent
 * @constructor
 * @struct
 */
var Dir = loadClass('directory');
/// #}}} @func Dir

/// #}}} @group CONSTRUCTORS

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

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

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

/// #{{{ @group FS

/// #{{{ @func getDirectoryPaths
/**
 * @private
 * @param {string} dirpath
 * @param {(?Object|?boolean)=} opts
 *   If the #opts is a `boolean`, the #opts.deep option is set to its value.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid directory paths.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute directory paths instead of relative directory paths.
 * @param {?boolean=} opts.extend = `false`
 *   When supplying a valid or invalid pattern to check paths against, the
 *   #opts.extend option allows you to supplement instead of overwrite the
 *   default valid or invalid test. If the default value is `null`, this
 *   option does not have any side effects.
 * @param {?RegExp=} opts.valid
 *   An alias for `opts.validDirs`.
 * @param {?RegExp=} opts.invalid
 *   An alias for `opts.invalidDirs`.
 * @param {?RegExp=} opts.validDirs = `null`
 *   A pattern for matching valid directory paths. If #opts.validDirs is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.validDirs pattern. Otherwise (i.e.
 *   if it does not have a forward slash), the path name is tested against the
 *   #opts.validDirs pattern.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   A pattern for matching invalid directory paths. If #opts.invalidDirs is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.invalidDirs pattern. Otherwise
 *   (i.e. if it does not have a forward slash), the path name is tested
 *   against the #opts.invalidDirs pattern.
 * @return {!Array<string>}
 */
var getDirectoryPaths = loadHelper('get-directory-paths');
/// #}}} @func getDirectoryPaths

/// #}}} @group FS

/// #{{{ @group OBJECT

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = loadHelper('setup-off-property');
/// #}}} @func setupOffProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Dir.prototype.makeDirs
/**
 * @public
 * @this {!Dir}
 * @return {!Dir}
 */
function makeDirs() {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {!Dir} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step check-dirs-member

  if (this.dirs)
    return this;

  /// #}}} @step check-dirs-member

  /// #{{{ @step setup-dirs

  dirs = createObject(null);

  /// #}}} @step setup-dirs

  /// #{{{ @step get-dir-paths

  paths = getDirectoryPaths(this.path, {
    'deep': false,
    'full': true,
    'extend': true,
    'invalidDirs': /^\./
  });

  /// #}}} @step get-dir-paths

  /// #{{{ @step make-dir-nodes

  len = paths.length;
  i = -1;
  while (++i < len) {
    dir = new Dir(paths[i], this);
    setupOffProperty(dirs, dir.name, dir, true);
  }

  /// #}}} @step make-dir-nodes

  /// #{{{ @step set-dirs-member

  freezeObject(dirs);
  setupOffProperty(this, 'dirs', dirs, true);

  /// #}}} @step set-dirs-member

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Dir.prototype.makeDirs

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeDirs;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
