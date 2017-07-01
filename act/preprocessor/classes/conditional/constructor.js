/**
 * ---------------------------------------------------------------------------
 * CONDITIONAL CONSTRUCTOR
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

/// #{{{ @const COND_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var COND_TYPE_ID = loadHelper('get-type-id')('conditional');
/// #}}} @const COND_TYPE_ID

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

/// #{{{ @func setOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setOpenError = setError.open;
/// #}}} @func setOpenError

/// #{{{ @func setTagError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setTagError = setError.tag;
/// #}}} @func setTagError

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

/// #{{{ @func getCondAction
/**
 * @private
 * @param {(string|!Line)} text
 * @return {boolean}
 */
var getCondAction = loadHelper('get-conditional-action');
/// #}}} @func getCondAction

/// #{{{ @func getIdComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getIdComponent = loadHelper('get-id-component');
/// #}}} @func getIdComponent

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

/// #{{{ @func hasOpen
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasOpen = loadHelper('has-open-command');
/// #}}} @func hasOpen

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func hasValidConditional
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidConditional = loadHelper('has-valid-conditional');
/// #}}} @func hasValidConditional

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

/// #{{{ @func Cond
/**
 * @public
 * @param {!Line} open
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
function Cond(open, file, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Cond) )
    throw setNewError(new SyntaxError, 'Cond');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'open');
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
  if ( !isLineNode(open) )
    throw setTypeError(new TypeError, 'open', '!Line');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {(?Blk|?Cond)}
   */
  var PARENT = !!parent
    ? parent
    : null;
  /// #}}} @const PARENT

  /// #{{{ @const OPEN
  /**
   * @private
   * @const {!Line}
   */
  var OPEN = open;
  /// #}}} @const OPEN

  /// #{{{ @const FILE
  /**
   * @private
   * @const {!File}
   */
  var FILE = file;
  /// #}}} @const FILE

  /// #{{{ @const TEXT
  /**
   * @private
   * @const {string}
   */
  var TEXT = OPEN.text;
  /// #}}} @const TEXT

  /// #{{{ @const ACTION
  /**
   * @private
   * @const {boolean}
   */
  var ACTION = getCondAction(TEXT);
  /// #}}} @const ACTION

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

  /// #}}} @step set-constants

  /// #{{{ @step verify-syntax

  if (!TAG)
    throw setTagError(new SyntaxError, OPEN);
  if (!ID)
    throw setIdError(new SyntaxError, OPEN);
  if ( !hasOpen(TEXT) )
    throw setOpenError(new SyntaxError, OPEN);
  if ( !hasValidConditional(TEXT) )
    throw setCmdError(new SyntaxError, OPEN);

  /// #}}} @step verify-syntax

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  setupOffProperty(this, 'type', COND_TYPE_ID, true);
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

  /// #{{{ @member action
  /**
   * @public
   * @const {boolean}
   */
  setupOffProperty(this, 'action', ACTION, true);
  /// #}}} @member action

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  setupOffProperty(this, 'file', FILE, true);
  /// #}}} @member file

  /// #{{{ @member open
  /**
   * @public
   * @const {!Line}
   */
  setupOffProperty(this, 'open', OPEN, true);
  /// #}}} @member open

  /// #{{{ @member close
  /**
   * @public
   * @type {?Line}
   */
  setupOnProperty(this, 'close', null);
  /// #}}} @member close

  /// #{{{ @member parent
  /**
   * @public
   * @const {(?Blk|?Cond)}
   */
  setupOffProperty(this, 'parent', PARENT, true);
  /// #}}} @member parent

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
   * @const {!Object<string, !Cond>}
   */
  setupOffProperty(this, 'conds', createObject(null), true);
  /// #}}} @member conds

  /// #{{{ @member incls
  /**
   * @public
   * @const {!Object<string, !Incl>}
   */
  setupOffProperty(this, 'incls', createObject(null), true);
  /// #}}} @member incls

  /// #{{{ @member content
  /**
   * @public
   * @type {?Array<(!Line|!Blk|!Cond|!Incl)>}
   */
  setupOnProperty(this, 'content', null);
  /// #}}} @member content

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance
}
/// #}}} @func Cond

setupPrototype('conditional', Cond, 'Cond', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Cond;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
