/**
 * ---------------------------------------------------------------------------
 * DIRECTORY CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var DIR_TYPE_ID = loadHelper('type-ids').DIR;
/// #}}} @const DIR_TYPE_ID

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

/// #{{{ @group STATE

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProperty = loadHelper('define-property');
/// #}}} @func defineProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func lockObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var lockObject = loadHelper('lock-object');
/// #}}} @func lockObject

/// #{{{ @func sealObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var sealObject = loadHelper('seal-object');
/// #}}} @func sealObject

/// #}}} @group STATE

/// #{{{ @group GET

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

/// #{{{ @func getOwnedCommand
/**
 * @private
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Cond|!Incl)} node
 * @return {(?Blk|?Cond|?Incl)}
 */
var getOwnedCommand = loadHelper('get-owned-command');
/// #}}} @func getOwnedCommand

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadHelper('get-pathname');
/// #}}} @func getPathName

/// #{{{ @func getPathNode
/**
 * @private
 * @param {(!Dir|!File)} src
 * @param {string} path
 * @return {(?Dir|?File)}
 */
var getPathNode = loadHelper('get-path-node');
/// #}}} @func getPathNode

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasDirectory
/**
 * @private
 * @param {string} src
 *   The file path to check in.
 * @param {string} path
 *   The directory path to check for.
 * @return {boolean}
 */
var hasDirectory = loadHelper('has-directory');
/// #}}} @func hasDirectory

/// #{{{ @func hasJsExt
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasJsExt = loadHelper('has-file-ext').construct('.js');
/// #}}} @func hasJsExt

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

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isCondFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondFlagsNode = loadHelper('is-conditional-flags-node');
/// #}}} @func isCondFlagsNode

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
var isDirNode = loadHelper('is-directory-node');
/// #}}} @func isDirNode

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

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

/// #{{{ @func isStateObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStateObject = loadHelper('is-state-object');
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

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group TO

/// #{{{ @func cleanDirPath
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirPath = loadHelper('clean-dirpath');
/// #}}} @func cleanDirPath

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = loadHelper('clean-path');
/// #}}} @func cleanPath

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func trimPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathName = loadHelper('trim-pathname');
/// #}}} @func trimPathName

/// #}}} @group TO

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

/// #{{{ @func setLocError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {!Dir} parent
 * @param {boolean} contain
 * @return {!RangeError}
 */
var setLocError = setError.loc;
/// #}}} @func setLocError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

/// #{{{ @func setPathNodeError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setPathNodeError = setError.pathNode;
/// #}}} @func setPathNodeError

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

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mkDirs
/**
 * @private
 * @param {!Dir} parent
 * @return {!Object<string, !Dir>}
 */
function mkDirs(parent) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var paths;
  /** @type {string} */
  var path;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {!Dir} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-dirs-ref

  dirs = parent.dirs;

  /// #}}} @step set-dirs-ref

  /// #{{{ @step get-dir-paths

  paths = getDirpaths(parent.path, {
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
    path = paths[i];
    dir = new Dir(path, parent);
    dirs[dir.name] = dir;
  }

  /// #}}} @step make-dir-nodes

  /// #{{{ @step freeze-dirs

  freezeObject(dirs);

  /// #}}} @step freeze-dirs

  /// #{{{ @step return-dirs

  return dirs;

  /// #}}} @step return-dirs
}
/// #}}} @func mkDirs

/// #{{{ @func mkFiles
/**
 * @private
 * @param {!Dir} parent
 * @return {!Object<string, !File>}
 */
function mkFiles(parent) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !File>} */
  var files;
  /** @type {!Array<string>} */
  var paths;
  /** @type {!File} */
  var file;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-files-ref

  files = parent.files;

  /// #}}} @step set-files-ref

  /// #{{{ @step get-file-paths

  paths = getFilepaths(parent.path, {
    'deep': false,
    'full': true,
    'validFiles': /\.js$/
  });

  /// #}}} @step get-file-paths

  /// #{{{ @step make-file-nodes

  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    file = new File(path, parent);
    files[file.name] = file;
  }

  /// #}}} @step make-file-nodes

  /// #{{{ @step freeze-files

  freezeObject(files);

  /// #}}} @step freeze-files

  /// #{{{ @step return-files

  return files;

  /// #}}} @step return-files
}
/// #}}} @func mkFiles

/// #}}} @group METHODS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func CondFlags
/**
 * @private
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @constructor
 * @struct
 */
var CondFlags = require('./conditional-flags.js');
/// #}}} @func CondFlags

/// #{{{ @func Dir
/**
 * @public
 * @param {string} path
 * @param {?Dir=} parent
 * @constructor
 * @struct
 */
function Dir(path, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Dir) )
    throw setNewError(new SyntaxError, 'Dir');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');
  if ( !isDirectory(path) )
    throw setDirError(new Error, 'path', path);
  if ( !isNull(parent) && !isUndefined(parent) && !isDirNode(parent) )
    throw setTypeError(new TypeError, 'parent', '?Dir=');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {?Dir}
   */
  var PARENT = parent || null;
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
  var NAME = getPathName(PATH);
  /// #}}} @const NAME

  /// #{{{ @const TREE
  /**
   * @private
   * @const {string}
   */
  var TREE = !!PARENT
    ? cleanDirPath(PARENT.tree + NAME)
    : '';
  /// #}}} @const TREE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': DIR_TYPE_ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member type

  /// #{{{ @member name
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'name', {
    'value': NAME,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member name

  /// #{{{ @member tree
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'tree', {
    'value': TREE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member tree

  /// #{{{ @member path
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'path', {
    'value': PATH,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member path

  /// #{{{ @member parent
  /**
   * @public
   * @const {?Dir}
   */
  defineProperty(this, 'parent', {
    'value': PARENT,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member parent

  /// #{{{ @member dirs
  /**
   * @public
   * @const {!Object<string, !Dir>}
   */
  defineProperty(this, 'dirs', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member dirs

  /// #{{{ @member files
  /**
   * @public
   * @const {!Object<string, !File>}
   */
  defineProperty(this, 'files', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member files

  /// #}}} @step set-members

  /// #{{{ @step lock-instance

  capObject(this);
  sealObject(this);

  /// #}}} @step lock-instance

  /// #{{{ @step make-child-nodes

  mkFiles(this);
  mkDirs(this);

  /// #}}} @step make-child-nodes

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Dir

/// #{{{ @func File
/**
 * @private
 * @param {string} path
 * @param {!Dir} parent
 * @constructor
 * @struct
 */
var File = require('./file.js');
/// #}}} @func File

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Dir.prototype = createObject(null);
Dir.prototype.constructor = Dir;

/// #{{{ @func Dir.prototype.load
/**
 * @return {!Dir}
 */
Dir.prototype.load = function load() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !File>} */
  var files;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {string} */
  var name;
  /** @type {!File} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  files = this.files;
  dirs = this.dirs;

  /// #}}} @step set-member-refs

  /// #{{{ @step load-files

  for (name in files) {
    if ( hasOwnProperty(files, name) ) {
      file = files[name];
      if (file.lines.length === 0)
        file.load();
    }
  }

  /// #}}} @step load-files

  /// #{{{ @step load-dirs

  for (name in dirs) {
    if ( hasOwnProperty(dirs, name) )
      dirs[name].load();
  }

  /// #}}} @step load-dirs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func Dir.prototype.load

/// #{{{ @func Dir.prototype.preparse
/**
 * @return {!Dir}
 */
Dir.prototype.preparse = function preparse() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !File>} */
  var files;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {string} */
  var name;
  /** @type {!File} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  files = this.files;
  dirs = this.dirs;

  /// #}}} @step set-member-refs

  /// #{{{ @step preparse-files

  for (name in files) {
    if ( hasOwnProperty(files, name) ) {
      file = files[name];
      if (!file.inserts)
        file.preparse();
    }
  }

  /// #}}} @step preparse-files

  /// #{{{ @step preparse-dirs

  for (name in dirs) {
    if ( hasOwnProperty(dirs, name) )
      dirs[name].preparse();
  }

  /// #}}} @step preparse-dirs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func Dir.prototype.preparse

/// #{{{ @func Dir.prototype.parse
/**
 * @return {!Dir}
 */
Dir.prototype.parse = function parse() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !File>} */
  var files;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {string} */
  var name;
  /** @type {!File} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  files = this.files;
  dirs = this.dirs;

  /// #}}} @step set-member-refs

  /// #{{{ @step parse-files

  for (name in files) {
    if ( hasOwnProperty(files, name) ) {
      file = files[name];
      if (file.content.length === 0)
        file.parse();
    }
  }

  /// #}}} @step parse-files

  /// #{{{ @step parse-dirs

  for (name in dirs) {
    if ( hasOwnProperty(dirs, name) )
      dirs[name].parse();
  }

  /// #}}} @step parse-dirs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func Dir.prototype.parse

/// #{{{ @func Dir.prototype.run
/**
 * @param {string} src
 *   The file path to the source `File` instance you want to call
 *   `File.prototype.run` from. The file path may be relative or absolute. If
 *   it is a relative path, it is relative to the `Dir` instance (i.e. since
 *   only the root `Dir` instance is called from the exposed API, it is
 *   essentially relative to the root `Dir` instance).
 * @param {string} dest
 *   The file path to the destination you want to save the preprocessed result
 *   of `File.prototype.run`. The file path may be relative or absolute. If
 *   it is a relative path, it is relative to the `cwd`. The directory path up
 *   to the file name of the resolved #dest path must already exist. If a file
 *   exists at the resolved *dest* path, it is overwritten.
 * @param {(!Object<string, (boolean|!Object<string, boolean>)>|!CondFlags)} state
 *   The enabled, `true`, or disabled, `false`, state for every conditional
 *   command defined within the *src* `File` instance's *content* `array`.
 *   Each parent *state* `object` key must be a `Cond` instance's *tag*, *ID*
 *   (note that a leading colon, `":id"` or `"*:id"`, is required for parent
 *   *ID* key names), or *key* (e.g. `"tag:id"`). Parent *tag* keys may use a
 *   `boolean` or an `object` with *ID* key names and `boolean` values for
 *   their value. Parent *ID* or *key* keys must use a `boolean` value. The
 *   asterisk, `"*"`, denotes any number of wildcard characters within a *tag*
 *   or *ID* (within a *key* it only applies to the *tag* or *ID* where it is
 *   defined - it does NOT cross-over the separating colon). The question
 *   mark, `"?"`, denotes a single wildcard character within a *tag*, *ID*, or
 *   *key*. Every `Cond` instance within the *src* `File` instance must be
 *   defined in the *state* or an error will be thrown.
 * @param {(!function(string): string)=} alter
 *   The *alter* `function` is optional. If it is defined, it allows you to
 *   provide custom alterations to the preprocessed result of
 *   `File.prototype.run` before it is saved to the *dest*.
 * @return {string}
 */
Dir.prototype.run = function run(src, dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {!CondFlags} */
  var condFlags;
  /** @type {string} */
  var result;
  /** @type {(?Dir|?File)} */
  var node;
  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameter-data-types

  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');
  if ( !isString(dest) )
    throw setTypeError(new TypeError, 'dest', 'string');
  if ( !isCondFlagsNode(state) && !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '(!Object<string, (boolean|!Object<string, boolean>)>|!CondFlags)');
  if ( !isUndefined(alter) && !isFunction(alter) )
    throw setTypeError(new TypeError, 'alter', '(!function(string): string)=');

  /// #}}} @step verify-parameter-data-types

  /// #{{{ @step verify-src-path

  if (!src)
    throw setEmptyError(new Error, 'src');
  if ( !hasJsExt(src) )
    throw setExtError(new RangeError, 'src', src, '.js');

  src = resolvePath(this.path, src);

  if ( !isFile(src) )
    throw setFileError(new Error, 'src', src);
  if ( !hasDirectory(src, this.path) )
    throw setLocError(new RangeError, 'src', src, this, true);

  /// #}}} @step verify-src-path

  /// #{{{ @step get-src-node

  node = getPathNode(this, src);

  /// #}}} @step get-src-node

  /// #{{{ @step verify-src-node

  if ( !isFileNode(node) )
    throw setPathNodeError(new Error, 'src', src);

  /// #}}} @step verify-src-node

  /// #{{{ @step verify-dest-path

  if (!dest)
    throw setEmptyError(new Error, 'dest');
  if ( !hasJsExt(dest) )
    throw setExtError(new RangeError, 'dest', dest, '.js');

  dest = resolvePath(dest);
  path = trimPathName(dest);

  if ( !isDirectory(path) )
    throw setDirError(new Error, 'dest', path);
  if ( hasDirectory(dest, this.path) )
    throw setLocError(new RangeError, 'dest', dest, this, false);

  /// #}}} @step verify-dest-path

  /// #{{{ @step make-cond-flags

  condFlags = isCondFlagsNode(state)
    ? state
    : new CondFlags(state);

  /// #}}} @step make-cond-flags

  /// #{{{ @step get-results

  result = isFunction(alter)
    ? node.run(dest, condFlags, alter)
    : node.run(dest, condFlags);

  /// #}}} @step get-results

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
};
/// #}}} @func Dir.prototype.run

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Dir;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
