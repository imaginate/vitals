/**
 * ---------------------------------------------------------------------------
 * DIRECTORY CONSTRUCTOR
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

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var DIR_TYPE_ID = loadHelper('get-type-id')('directory');
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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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
var isDirNode = loadHelper('is-directory-node');
/// #}}} @func isDirNode

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

/// #{{{ @group OBJECT

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

/// #{{{ @func setupOnProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setupOnProperty = loadHelper('setup-on-property');
/// #}}} @func setupOnProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func cleanDirectoryPath
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirectoryPath = loadHelper('clean-dirpath');
/// #}}} @func cleanDirectoryPath

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = loadHelper('clean-path');
/// #}}} @func cleanPath

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadHelper('get-path-name');
/// #}}} @func getPathName

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

/// #}}} @group PATH

/// #{{{ @group PROTOTYPE

/// #{{{ @func setupPrototype
/**
 * @private
 * @param {string} classname
 * @param {!Function} constructor
 * @param {string} funcname
 *   The constructor's name.
 * @param {string} path
 *   The absolute path to the directory containing the methods for the class.
 * @return {!Function}
 */
var setupPrototype = loadHelper('setup-prototype');
/// #}}} @func setupPrototype

/// #}}} @group PROTOTYPE

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @enum {string}
 * @const
 * @struct
 */
var DIR = freezeObject({
  MAIN: resolvePath(__dirname),
  METHODS: resolvePath(__dirname, './methods')
});
/// #}}} @const DIR

/// #}}} @group PATHS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

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

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      break;
    default:
      if ( !isNull(parent) && !isUndefined(parent) && !isDirNode(parent) )
        throw setTypeError(new TypeError, 'parent', '?Dir=');
  }

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');
  if ( !isDirectory(path) )
    throw setDirError(new Error, 'path', path);

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
    ? cleanDirectoryPath(PARENT.tree + NAME)
    : '';
  /// #}}} @const TREE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', DIR_TYPE_ID, true);
  /// #}}} @member type

  /// #{{{ @member name
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'name', NAME, true);
  /// #}}} @member name

  /// #{{{ @member tree
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'tree', TREE, true);
  /// #}}} @member tree

  /// #{{{ @member path
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'path', PATH, true);
  /// #}}} @member path

  /// #{{{ @member parent
  /**
   * @public
   * @const {?Dir}
   */
  setupOffProperty(this, 'parent', PARENT, true);
  /// #}}} @member parent

  /// #{{{ @member dirs
  /**
   * @public
   * @type {?Object<string, !Dir>}
   */
  setupOnProperty(this, 'dirs', null);
  /// #}}} @member dirs

  /// #{{{ @member files
  /**
   * @public
   * @type {?Object<string, !File>}
   */
  setupOnProperty(this, 'files', null);
  /// #}}} @member files

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step make-child-nodes

  this.makeFiles();
  this.makeDirs();

  /// #}}} @step make-child-nodes

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Dir

setupPrototype('directory', Dir, 'Dir', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Dir;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
