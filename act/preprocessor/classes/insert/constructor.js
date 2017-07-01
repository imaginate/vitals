/**
 * ---------------------------------------------------------------------------
 * INSERT CONSTRUCTOR
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

/// #{{{ @const INS_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var INS_TYPE_ID = loadHelper('get-type-id')('insert');
/// #}}} @const INS_TYPE_ID

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

/// #{{{ @func setNoDefError
/**
 * @private
 * @param {!Error} err
 * @param {!Line} line
 * @param {string} key
 * @param {!File} file
 * @return {!Error}
 */
var setNoDefError = setError.noDef;
/// #}}} @func setNoDefError

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

/// #{{{ @func hasAnyPathComponent
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasAnyPathComponent = loadHelper('has-any-path-component');
/// #}}} @func hasAnyPathComponent

/// #{{{ @func hasValidInsert
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidInsert = loadHelper('has-valid-insert');
/// #}}} @func hasValidInsert

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

/// #{{{ @func isInsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isInsNode = loadHelper('is-insert-node');
/// #}}} @func isInsNode

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

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeArgs
/**
 * @private
 * @param {!Ins} ins
 * @param {number} index
 * @return {!Ins}
 */
function makeArgs(ins, index) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Array<(number|!Line)>} */
  var args;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ins');
    case 1:
      throw setNoArgError(new Error, 'index');
  }

  if ( !isInsNode(ins) )
    throw setTypeError(new TypeError, 'ins', '!Ins');
  if ( !isNumber(index) )
    throw setTypeError(new TypeError, 'index', 'number');

  if ( !isWholeNumber(index) || index < 0 )
    throw setIndexError(new RangeError, 'index', index);

  /// #}}} @step verify-parameters

  /// #{{{ @step set-member-refs

  args = ins.args;
  lines = ins.def.lines;

  /// #}}} @step set-member-refs

  /// #{{{ @step push-splice-from-index

  args.push(index);
  args.push(1);

  /// #}}} @step push-splice-from-index

  /// #{{{ @step push-each-line

  len = lines.length;
  i = -1;
  while (++i < len)
    args.push(lines[i]);

  /// #}}} @step push-each-line

  /// #{{{ @step freeze-args

  freezeObject(args);

  /// #}}} @step freeze-args

  /// #{{{ @step return-instance

  return ins;

  /// #}}} @step return-instance
}
/// #}}} @func makeArgs

/// #}}} @group MAKE

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

/// #{{{ @func Ins
/**
 * @public
 * @param {!Line} line
 * @param {number} index
 * @param {!File} file
 * @constructor
 * @struct
 */
function Ins(line, index, file) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Ins) )
    throw setNewError(new SyntaxError, 'Ins');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'line');
    case 1:
      throw setNoArgError(new Error, 'index');
    case 2:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isLineNode(line) )
    throw setTypeError(new TypeError, 'line', '!Line');
  if ( !isNumber(index) )
    throw setTypeError(new TypeError, 'index', 'number');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  if ( !isWholeNumber(index) || index < 0 )
    throw setIndexError(new RangeError, 'index', index);

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

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
    : FILE;
  /// #}}} @const NODE

  /// #{{{ @const DEFS
  /**
   * @private
   * @const {?Object<string, !Def>}
   */
  var DEFS = isFileNode(NODE)
    ? NODE.defs
    : null;
  /// #}}} @const DEFS

  /// #{{{ @const DEF
  /**
   * @private
   * @const {?Def}
   */
  var DEF = DEFS && KEY in DEFS
    ? DEFS[KEY]
    : null;
  /// #}}} @const DEF

  /// #{{{ @const INDEX
  /**
   * @private
   * @const {number}
   */
  var INDEX = index;
  /// #}}} @const INDEX

  /// #}}} @step set-constants

  /// #{{{ @step verify-syntax

  if (!TAG)
    throw setTagError(new SyntaxError, LINE);
  if (!ID)
    throw setIdError(new SyntaxError, LINE);
  if ( hasAnyPathComponent(TEXT) && !PATH )
    throw setPathCompError(new SyntaxError, LINE);
  if ( !hasValidInsert(TEXT) )
    throw setCmdError(new SyntaxError, LINE);

  /// #}}} @step verify-syntax

  /// #{{{ @step verify-path-node

  if (!DEFS)
    throw setPathCompError(new Error, LINE);

  /// #}}} @step verify-path-node

  /// #{{{ @step verify-def-node

  if (!DEF)
    throw setNoDefError(new Error, LINE, KEY, NODE);

  /// #}}} @step verify-def-node

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', INS_TYPE_ID, true);
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

  /// #{{{ @member def
  /**
   * @public
   * @const {!Def}
   */
  setupOffProperty(this, 'def', DEF, true);
  /// #}}} @member def

  /// #{{{ @member args
  /**
   * @public
   * @const {!Array<(number|!Line)>}
   */
  setupOffProperty(this, 'args', [], true);
  /// #}}} @member args

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step make-args

  makeArgs(this, INDEX);

  /// #}}} @step make-args
}
/// #}}} @func Ins

setupPrototype('insert', Ins, 'Ins', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Ins;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
