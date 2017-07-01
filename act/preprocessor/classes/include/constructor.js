/**
 * ---------------------------------------------------------------------------
 * INCLUDE CONSTRUCTOR
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

/// #{{{ @const INCL_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var INCL_TYPE_ID = loadHelper('get-type-id')('include');
/// #}}} @const INCL_TYPE_ID

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

/// #{{{ @func setCmdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setCmdError = setError.cmd;
/// #}}} @func setCmdError

/// #{{{ @func setIdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setIdError = setError.id;
/// #}}} @func setIdError

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

/// #{{{ @func setPathCompError
/**
 * @private
 * @param {(!SyntaxError|!Error)} err
 * @param {!Line} line
 * @return {(!SyntaxError|!Error)}
 */
var setPathCompError = setError.pathComp;
/// #}}} @func setPathCompError

/// #{{{ @func setTagError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setTagError = setError.tag;
/// #}}} @func setTagError

/// #{{{ @func setTreeError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {?Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
var setTreeError = setError.tree;
/// #}}} @func setTreeError

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

/// #{{{ @group GET

/// #{{{ @func getPathNode
/**
 * @private
 * @param {(!Dir|!File)} src
 * @param {string} path
 * @return {(?Dir|?File)}
 */
var getPathNode = loadHelper('get-path-node');
/// #}}} @func getPathNode

/// #{{{ @func getIdComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getIdComponent = loadHelper('get-id-component');
/// #}}} @func getIdComponent

/// #{{{ @func getPathComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getPathComponent = loadHelper('get-path-component');
/// #}}} @func getPathComponent

/// #{{{ @func getTagComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getTagComponent = loadHelper('get-tag-component');
/// #}}} @func getTagComponent

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasValidInclude
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidInclude = loadHelper('has-valid-include');
/// #}}} @func hasValidInclude

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = loadHelper('is-block-node');
/// #}}} @func isBlkNode

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = loadHelper('is-conditional-node');
/// #}}} @func isCondNode

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

/// #{{{ @func isLineNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLineNode = loadHelper('is-line-node');
/// #}}} @func isLineNode

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

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

/// #{{{ @func Incl
/**
 * @public
 * @param {!Line} line
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
function Incl(line, file, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Incl) )
    throw setNewError(new SyntaxError, 'Incl');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'line');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      break;
    default:
      if (!isUndefined(parent)
          && !isNull(parent)
          && !isBlkNode(parent)
          && !isCondNode(parent) )
        throw setTypeError(new TypeError, 'parent', '(?Blk|?Cond)=');
  }

  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');
  if ( !isLineNode(line) )
    throw setTypeError(new TypeError, 'line', '!Line');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {(?Blk|?Cond)}
   */
  var PARENT = parent || null;
  /// #}}} @const PARENT

  /// #{{{ @const FILE
  /**
   * @private
   * @const {!File}
   */
  var FILE = file;
  /// #}}} @const FILE

  /// #{{{ @const LINE
  /**
   * @private
   * @const {!Line}
   */
  var LINE = line;
  /// #}}} @const LINE

  /// #{{{ @const TEXT
  /**
   * @private
   * @const {string}
   */
  var TEXT = LINE.text;
  /// #}}} @const TEXT

  /// #{{{ @const TAG
  /**
   * @private
   * @const {string}
   */
  var TAG = getTagComponent(TEXT);
  /// #}}} @const TAG

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = getIdComponent(TEXT);
  /// #}}} @const ID

  /// #{{{ @const KEY
  /**
   * @private
   * @const {string}
   */
  var KEY = TAG + ':' + ID;
  /// #}}} @const KEY

  /// #{{{ @const PATH
  /**
   * @private
   * @const {string}
   */
  var PATH = getPathComponent(TEXT);
  /// #}}} @const PATH

  /// #{{{ @const NODE
  /**
   * @private
   * @const {(?Dir|?File)}
   */
  var NODE = !!PATH
    ? getPathNode(FILE, PATH)
    : null;
  /// #}}} @const NODE

  /// #{{{ @const LINK
  /**
   * @private
   * @const {?File}
   */
  var LINK = isFileNode(NODE)
    ? NODE
    : null;
  /// #}}} @const LINK

  /// #}}} @step set-constants

  /// #{{{ @step verify-syntax

  if (!TAG)
    throw setTagError(new SyntaxError, LINE);
  if (!ID)
    throw setIdError(new SyntaxError, LINE);
  if (!PATH)
    throw setPathCompError(new SyntaxError, LINE);
  if ( !hasValidInclude(TEXT) )
    throw setCmdError(new SyntaxError, LINE);

  /// #}}} @step verify-syntax

  /// #{{{ @step verify-path-node

  if (!LINK)
    throw setPathCompError(new Error, LINE);

  /// #}}} @step verify-path-node

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', INCL_TYPE_ID, true);
  /// #}}} @member type

  /// #{{{ @member tag
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'tag', TAG, true);
  /// #}}} @member tag

  /// #{{{ @member id
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'id', ID, true);
  /// #}}} @member id

  /// #{{{ @member key
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'key', KEY, true);
  /// #}}} @member key

  /// #{{{ @member path
  /**
   * @public
   * @const {string}
   */
  setupOffProperty(this, 'path', PATH, true);
  /// #}}} @member path

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  setupOffProperty(this, 'file', FILE, true);
  /// #}}} @member file

  /// #{{{ @member line
  /**
   * @public
   * @const {!Line}
   */
  setupOffProperty(this, 'line', LINE, true);
  /// #}}} @member line

  /// #{{{ @member parent
  /**
   * @public
   * @const {(?Blk|?Cond)}
   */
  setupOffProperty(this, 'parent', PARENT, true);
  /// #}}} @member parent

  /// #{{{ @member link
  /**
   * @public
   * @const {!File}
   */
  setupOffProperty(this, 'link', LINK, true);
  /// #}}} @member link

  /// #{{{ @member cmd
  /**
   * @public
   * @type {?Blk}
   */
  setupOnProperty(this, 'cmd', null);
  /// #}}} @member cmd

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step catch-include-loop

  if (FILE === LINK)
    throw setTreeError(new ReferenceError, null, this);

  /// #}}} @step catch-include-loop
}
/// #}}} @func Incl

setupPrototype('include', Incl, 'Incl', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Incl;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
