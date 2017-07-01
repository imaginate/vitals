/**
 * ---------------------------------------------------------------------------
 * FILE CONSTRUCTOR
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

/// #{{{ @const FILE_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var FILE_TYPE_ID = loadHelper('get-type-id')('file');
/// #}}} @const FILE_TYPE_ID

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

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

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

/// #{{{ @func File
/**
 * @public
 * @param {string} path
 * @param {!Dir} parent
 * @constructor
 * @struct
 */
function File(path, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, File) )
    throw setNewError(new SyntaxError, 'File');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      throw setNoArgError(new Error, 'parent');
  }

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');
  if ( !isFile(path) )
    throw setFileError(new Error, 'path', path);

  if ( !isDirNode(parent) )
    throw setTypeError(new TypeError, 'parent', '!Dir');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {!Dir}
   */
  var PARENT = parent;
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
  var TREE = PARENT.tree + NAME;
  /// #}}} @const TREE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', FILE_TYPE_ID, true);
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
   * @const {!Dir}
   */
  setupOffProperty(this, 'parent', PARENT, true);
  /// #}}} @member parent

  /// #{{{ @member lines
  /**
   * @public
   * @const {!Array<!Line>}
   */
  setupOffProperty(this, 'lines', [], true);
  /// #}}} @member lines

  /// #{{{ @member defs
  /**
   * @public
   * @const {!Object<string, !Def>}
   */
  setupOffProperty(this, 'defs', createObject(null), true);
  /// #}}} @member defs

  /// #{{{ @member blks
  /**
   * @public
   * @const {!Object<string, !Blk>}
   */
  setupOffProperty(this, 'blks', createObject(null), true);
  /// #}}} @member blks

  /// #{{{ @member conds
  /**
   * @public
   * @const {!Array<!Cond>}
   */
  setupOffProperty(this, 'conds', [], true);
  /// #}}} @member conds

  /// #{{{ @member incls
  /**
   * @public
   * @const {!Object<string, !Incl>}
   */
  setupOffProperty(this, 'incls', createObject(null), true);
  /// #}}} @member incls

  /// #{{{ @member inserts
  /**
   * @public
   * @type {?Array<!Ins>}
   */
  setupOnProperty(this, 'inserts', null);
  /// #}}} @member inserts

  /// #{{{ @member content
  /**
   * @public
   * @const {!Array<(!Line|!Blk|!Cond|!Incl)>}
   */
  setupOffProperty(this, 'content', [], true);
  /// #}}} @member content

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance
}
/// #}}} @func File

setupPrototype('file', File, 'File', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = File;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
