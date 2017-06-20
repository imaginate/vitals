/**
 * ---------------------------------------------------------------------------
 * INSERT CLASS
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

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const INS_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var INS_TYPE_ID = loadHelper('type-ids').insert;
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

/// #{{{ @group STATE

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

/// #}}} @group STATE

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

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

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

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

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
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setCmdError = setError.cmd;
/// #}}} @func setCmdError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setIdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
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
 * @param {boolean=} loading = `false`
 * @return {(!SyntaxError|!Error)}
 */
var setPathCompError = setError.pathComp;
/// #}}} @func setPathCompError

/// #{{{ @func setTagError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
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

/// #{{{ @func mkArgs
/**
 * @private
 * @param {number} index
 * @param {!Def} def
 * @return {!Array<(number|!Line)>}
 */
function mkArgs(index, def) {

  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Array} */
  var args;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  args = [ index, 1 ];
  lines = def.lines;
  len = lines.length;
  i = -1;
  while (++i < len)
    args.push(lines[i]);
  return freezeObject(args);
}
/// #}}} @func mkArgs

/// #}}} @group METHODS

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

  /// #{{{ @step verify-parameters

  if ( !isLineNode(line) )
    throw setTypeError(new TypeError, 'line', '!Line');
  if ( !isNumber(index) )
    throw setTypeError(new TypeError, 'index', 'number');
  if ( !isWholeNumber(index) || index < 0 )
    throw setIndexError(new RangeError, 'index', index);
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

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
  var DEF = DEFS && hasOwnProperty(DEFS, KEY)
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
    throw setTagError(new SyntaxError, LINE, true);
  if (!ID)
    throw setIdError(new SyntaxError, LINE, true);
  if ( hasAnyPathComponent(TEXT) && !PATH )
    throw setPathCompError(new SyntaxError, LINE, true);
  if ( !hasValidInsert(TEXT) )
    throw setCmdError(new SyntaxError, LINE, true);

  /// #}}} @step verify-syntax

  /// #{{{ @step verify-path-node

  if (!DEFS)
    throw setPathCompError(new Error, LINE, true);

  /// #}}} @step verify-path-node

  /// #{{{ @step verify-def-node

  if (!DEF)
    throw setNoDefError(new Error, LINE, KEY, NODE);

  /// #}}} @step verify-def-node

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': INS_TYPE_ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member type

  /// #{{{ @member tag
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'tag', {
    'value': TAG,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member tag

  /// #{{{ @member id
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'id', {
    'value': ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member id

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

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  defineProperty(this, 'file', {
    'value': FILE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member file

  /// #{{{ @member line
  /**
   * @public
   * @const {!Line}
   */
  defineProperty(this, 'line', {
    'value': LINE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member line

  /// #{{{ @member def
  /**
   * @public
   * @const {!Def}
   */
  defineProperty(this, 'def', {
    'value': DEF,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member def

  /// #{{{ @member args
  /**
   * @public
   * @const {!Array<(number|!Line)>}
   */
  defineProperty(this, 'args', {
    'value': mkArgs(INDEX, DEF),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member args

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Ins

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Ins.prototype = createObject(null);
Ins.prototype.constructor = Ins;

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Ins;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
