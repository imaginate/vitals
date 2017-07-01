/**
 * ---------------------------------------------------------------------------
 * MANAGER CONSTRUCTOR
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

/// #{{{ @const MNG_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var MNG_TYPE_ID = loadHelper('get-type-id')('manager');
/// #}}} @const MNG_TYPE_ID

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

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isMngNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isMngNode = loadHelper('is-manager-node');
/// #}}} @func isMngNode

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeFiles
/**
 * @private
 * @param {!File} file
 * @return {!Object<string, ?Incl>}
 */
function makeFiles(file) {

  /** @type {!Object<string, ?Incl>} */
  var files;

  if (!arguments.length)
    throw setNoArgError(new Error, 'file');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  files = createObject(null);
  setupOffProperty(files, file.tree, null, true);
  freezeObject(files);
  return files;
}
/// #}}} @func makeFiles

/// #}}} @group MAKE

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

/// #{{{ @func Mng
/**
 * @public
 * @param {(!File|!Mng)} node
 * @constructor
 * @struct
 */
function Mng(node) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Mng) )
    throw setNewError(new SyntaxError, 'Mng');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'node');
  if ( !isMngNode(node) && !isFileNode(node) )
    throw setTypeError(new TypeError, 'node', '(!File|!Mng)');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const MNG
  /**
   * @private
   * @const {?Mng}
   */
  var MNG = isMngNode(node)
    ? node
    : null;
  /// #}}} @const MNG

  /// #{{{ @const FILE
  /**
   * @private
   * @const {!File}
   */
  var FILE = !!MNG
    ? MNG.file
    : node;
  /// #}}} @const FILE

  /// #{{{ @const FILES
  /**
   * @private
   * @const {!Object<string, ?Incl>}
   */
  var FILES = !!MNG
    ? MNG.files
    : makeFiles(FILE);
  /// #}}} @const FILES

  /// #{{{ @const NODES
  /**
   * @private
   * @const {!Object<string, ?Incl>}
   */
  var NODES = !!MNG
    ? MNG.nodes
    : createObject(null);
  /// #}}} @const NODES

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', MNG_TYPE_ID, true);
  /// #}}} @member type

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  setupOffProperty(this, 'file', FILE, true);
  /// #}}} @member file

  /// #{{{ @member files
  /**
   * @public
   * @type {!Object<string, ?Incl>}
   * @dict
   */
  setupOnProperty(this, 'files', FILES);
  /// #}}} @member files

  /// #{{{ @member nodes
  /**
   * @public
   * @const {!Object<string, !Incl>}
   * @dict
   */
  setupOffProperty(this, 'nodes', NODES, true);
  /// #}}} @member nodes

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance
}
/// #}}} @func Mng

setupPrototype('manager', Mng, 'Mng', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Mng;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
