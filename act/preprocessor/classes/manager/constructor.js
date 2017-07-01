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

/// #{{{ @func isFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFlagsNode = loadHelper('is-flags-node');
/// #}}} @func isFlagsNode

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeIncls
/**
 * @private
 * @param {!File} file
 * @return {!Object<string, !Object>}
 */
function makeIncls(file) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Object>} */
  var incls;
  /** @type {!Object<string, ?Incl>} */
  var files;
  /** @type {!Object<string, !Incl>} */
  var nodes;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'file');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-incl-files

  files = createObject(null);
  setupOffProperty(files, file.tree, null, true);
  freezeObject(files);

  /// #}}} @step make-incl-files

  /// #{{{ @step make-incl-nodes

  nodes = createObject(null);

  /// #}}} @step make-incl-nodes

  /// #{{{ @step make-incls

  incls = createObject(null);
  defineProperty(incls, 'files', {
    'value': files,
    'writable': true,
    'enumerable': true,
    'configurable': false
  });
  setupOffProperty(incls, 'nodes', nodes, true);

  /// #}}} @step make-incls

  /// #{{{ @step cap-incls

  capObject(incls);

  /// #}}} @step cap-incls

  /// #{{{ @step return-incls

  return incls;

  /// #}}} @step return-incls
}
/// #}}} @func makeIncls

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
 * @param {!Flags} flags
 * @param {!File} file
 * @constructor
 * @struct
 */
function Mng(flags, file) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Mng) )
    throw setNewError(new SyntaxError, 'Mng');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const FLAGS
  /**
   * @private
   * @const {!Flags}
   */
  var FLAGS = flags;
  /// #}}} @const FLAGS

  /// #{{{ @const FILE
  /**
   * @private
   * @const {!File}
   */
  var FILE = file;
  /// #}}} @const FILE

  /// #{{{ @const INCLS
  /**
   * @private
   * @const {!Object<string, !Object>}
   */
  var INCLS = makeIncls(file);
  /// #}}} @const INCLS

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', MNG_TYPE_ID, true);
  /// #}}} @member type

  /// #{{{ @member flags
  /**
   * @public
   * @const {!Flags}
   */
  setupOffProperty(this, 'flags', FLAGS, true);
  /// #}}} @member flags

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  setupOffProperty(this, 'file', FILE, true);
  /// #}}} @member file

  /// #{{{ @member incls
  /**
   * @public
   * @const {!Object<string, !Object>}
   * @struct
   */
  setupOffProperty(this, 'incls', INCLS, true);
  /// #}}} @member incls

  /// #{{{ @member incls.files
  /**
   * @public
   * @const {!Object<string, ?Incl>}
   * @dict
   */
  this.incls.files;
  /// #}}} @member incls.files

  /// #{{{ @member incls.nodes
  /**
   * @public
   * @const {!Object<string, !Incl>}
   * @dict
   */
  this.incls.nodes;
  /// #}}} @member incls.nodes

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
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
