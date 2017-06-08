/**
 * ---------------------------------------------------------------------------
 * DIR CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group OBJECT-CONTROL
//////////////////////////////////////////////////////////////////////////////
// OBJECT-CONTROL
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func capObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('mk-object');
/// #}}} @func createObject

/// #{{{ @func defineProp
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProp = loadHelper('define-property');
/// #}}} @func defineProp

/// #{{{ @func freezeObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func sealObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var sealObject = loadHelper('seal-object');
/// #}}} @func sealObject
/// #}}} @group OBJECT-CONTROL

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR_ID
/**
 * @private
 * @const {!Object}
 */
var DIR_ID = freezeObject({});
/// #}}} @const DIR_ID

/// #{{{ @const SRC_EXT
/**
 * @private
 * @const {!RegExp}
 */
var SRC_EXT = /\.js$/;
/// #}}} @const SRC_EXT

/// #{{{ @const DEST_EXT
/**
 * @private
 * @const {!RegExp}
 */
var DEST_EXT = /\.js$/;
/// #}}} @const DEST_EXT

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

/// #{{{ @func cleanDirpath
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirpath = loadHelper('clean-dirpath');
/// #}}} @func cleanDirpath

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = loadHelper('clean-path');
/// #}}} @func cleanPath

/// #{{{ @func getDirpaths
/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
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
var getDirpaths = loadHelper('get-dirpaths');
/// #}}} @func getDirpaths

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

/// #{{{ @func getPathname
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathname = loadHelper('get-pathname');
/// #}}} @func getPathname

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isDirInst
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isDirInst(val) {
  return isObject(val) && val.type === DIR_ID;
}
/// #}}} @func isDirInst

/// #{{{ @func isFile
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileInst
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileInst = require('./file.js').isFile;
/// #}}} @func isFileInst

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

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func trimPathname
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathname = loadHelper('trim-pathname');
/// #}}} @func trimPathname
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getKid
/**
 * @private
 * @param {!Dir} dir
 * @param {string} name
 * @return {(?Dir|?File)}
 */
function getKid(dir, name) {

  /** @type {!Array<(!Dir|!File)>} */
  var kids;
  /** @type {(!Dir|!File)} */
  var kid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if (!name || name === '.')
    return dir;

  if (name === '..')
    return dir.parent;

  kids = dir.kids;
  len = kids.length;
  i = -1;
  while (++i < len) {
    kid = kids[i];
    if (kid.name === name)
      return kid;
  }
  return null;
}
/// #}}} @func getKid

/// #{{{ @func mkKids
/**
 * @private
 * @param {!Dir} dir
 * @return {void}
 */
function mkKids(dir) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {string} */
  var path;
  /** @type {!Array<(!Dir|!File)>} */
  var kids;
  /** @type {(!Dir|!File)} */
  var kid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  kids = dir.kids;

  paths = getFilepaths(dir.path, {
    'deep': false,
    'full': true,
    'validFiles': /\.js$/
  });
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    kid = new File(path, dir);
    kids.push(kid);
  }

  paths = getDirpaths(dir.path, {
    'deep': false,
    'full': true,
    'extend': true,
    'invalidDirs': /^\./
  });
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    kid = new Dir(path, dir);
    kids.push(kid);
  }

  capObject(kids);
  sealObject(kids);
}
/// #}}} @func mkKids
/// #}}} @group METHODS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Dir
/**
 * @public
 * @param {string} path
 * @param {?Dir=} dir
 * @return {void}
 * @constructor
 * @struct
 */
function Dir(path, dir) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` data type (valid types: `string`)');
  if (!path)
    throw new Error('invalid empty `path` `string`');
  if ( !isDirectory(path) )
    throw new Error('invalid `path` `string` (must be a readable directory)');
  if ( !isNull(dir) && !isUndefined(dir) && !isDirInst(dir) )
    throw new TypeError('invalid `dir` data type (valid types: `?Dir=`)');

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {?Dir}
   */
  var PARENT = dir || null;
  /// #}}} @const PARENT

  /// #{{{ @const PATH
  /**
   * @private
   * @const {string}
   */
  var PATH = resolvePath(path);
  /// #}}} @const PATH

  /// #{{{ @const NAME
  /**
   * @private
   * @const {string}
   */
  var NAME = getPathname(PATH);
  /// #}}} @const NAME

  /// #{{{ @const TREE
  /**
   * @private
   * @const {string}
   */
  var TREE = !!PARENT
    ? cleanDirpath(PARENT.tree + name)
    : '';
  /// #}}} @const TREE

  /// #{{{ @member kids
  /**
   * @public
   * @const {string}
   */
  defineProp(this, 'kids', {
    'value': [],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member kids

  /// #{{{ @member name
  /**
   * @public
   * @const {string}
   */
  defineProp(this, 'name', {
    'value': NAME,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member name

  /// #{{{ @member parent
  /**
   * @public
   * @const {?Dir}
   */
  defineProp(this, 'parent', {
    'value': PARENT,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member parent

  /// #{{{ @member path
  /**
   * @public
   * @const {string}
   */
  defineProp(this, 'path', {
    'value': PATH,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member path

  /// #{{{ @member tree
  /**
   * @public
   * @const {string}
   */
  defineProp(this, 'tree', {
    'value': TREE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member tree

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProp(this, 'type', {
    'value': DIR_ID,
    'writable': false,
    'enumerable': false,
    'configurable': false
  });
  /// #}}} @member type

  sealObject(this);
  capObject(this);
  mkKids(this);
}
/// #}}} @func Dir

/// #{{{ @func File
/**
 * @private
 * @param {string} path
 * @param {!Dir} dir
 * @return {void}
 * @constructor
 * @struct
 */
var File = require('./file.js');
/// #}}} @func File
/// #}}} @group CONSTRUCTORS

/// #{{{ @group DIR-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// DIR-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Dir.prototype = createObject(null);
Dir.prototype.constructor = Dir;

/// #{{{ @func Dir.prototype.compile
/**
 * @param {string} src
 *   Must be a valid file path relative to the Dir instance's path.
 * @param {string} dest
 *   Must be a valid absolute or relative file path. All directories must be
 *   existing and a new or existing filename may be provided. Note that the
 *   `cwd` is used for relative paths.
 * @param {!Object<string, boolean>} flags
 * @return {string}
 */
Dir.prototype.compile = function compile(src, dest, flags) {

  /** @type {!Array<string>} */
  var names;
  /** @type {string} */
  var path;
  /** @type {(?Dir|?File)} */
  var kid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isObject(flags) )
    throw new TypeError('invalid `flags` data type (valid types: `!Object`)');

  if ( !isString(dest) )
    throw new TypeError('invalid `dest` data type (valid types: `string`)');
  if (!dest)
    throw new Error('invalid empty `dest` `string`');

  dest = resolvePath(dest);

  if ( !DEST_EXT.test(dest) )
    throw new Error('invalid `dest` file ext (must match `' + DEST_EXT.toString() + '`)');

  path = trimPathname(dest);

  if ( !isDirectory(path) )
    throw new Error('invalid `dest` directory path `' + path + '` (must be a readable directory)');

  if ( !isString(src) )
    throw new TypeError('invalid `src` data type (valid types: `string`)');
  if (!src)
    throw new Error('invalid empty `src` `string`');
  if ( !SRC_EXT.test(src) )
    throw new Error('invalid `src` file ext (must match `' + SRC_EXT.toString() + '`)');

  src = cleanPath(src);
  names = src.split('/');
  len = names.length;
  kid = this;
  i = -1;
  while (++i < len && kid)
    kid = getKid(kid, names[i]);

  if (!kid)
    throw new Error('invalid `src` file path (must exist within `Dir` tree)');
  if ( !isFileInst(kid) )
    throw new TypeError('invalid `src` `kid` data type (valid types: `!File`)');

  return kid.compile(dest, flags);
};
/// #}}} @func Dir.prototype.compile

/// #{{{ @func Dir.prototype.load
/**
 * @return {void}
 */
Dir.prototype.load = function load() {

  /** @type {!Array<(!Dir|!File)>} */
  var kids;
  /** @type {(!Dir|!File)} */
  var kid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  kids = this.kids;
  len = kids.length;
  i = -1;
  while (++i < len)
    kids[i].load();
};
/// #}}} @func Dir.prototype.load

/// #{{{ @func Dir.prototype.parse
/**
 * @return {void}
 */
Dir.prototype.parse = function parse() {

  /** @type {!Array<(!Dir|!File)>} */
  var kids;
  /** @type {(!Dir|!File)} */
  var kid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  kids = this.kids;
  len = kids.length;
  i = -1;
  while (++i < len)
    kids[i].parse();
};
/// #}}} @func Dir.prototype.parse
/// #}}} @group DIR-PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

Dir.isDir = isDirInst;
module.exports = Dir;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
