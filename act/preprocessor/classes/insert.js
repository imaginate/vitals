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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
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

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
var getKeys = loadHelper('get-keys');
/// #}}} @func getKeys

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

/// #{{{ @func hasValidInsert
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidInsert = loadHelper('has-valid-insert');
/// #}}} @func hasValidInsert

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

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

  /** @type {!Array<string>} */
  var keys;

  /// #{{{ @group Verify-Parameters

  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isNumber(index) )
    throw new TypeError('invalid `index` data type\n' +
      '    valid-types: `number`');
  if ( !isWholeNumber(index) || index < 0 )
    throw new Error('invalid `number` for `index`\n' +
      '    should-pass: `isWholeNumber(index) && index >= 0`');
  if ( !isFileNode(file) )
    throw new TypeError('invalid `file` data type\n' +
      '    valid-types: `!File`');

  /// #}}} @group Verify-Parameters

  /// #{{{ @group Set-Constants

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

  /// #}}} @group Set-Constants

  /// #{{{ @group Verify-Syntax

  if (!TAG)
    throw new Error('invalid `tag` component syntax\n' +
      '    should-match: `/[ \\t]@[a-zA-Z0-9_\\.\\-]+[ \\t]/`\n' +
      '    valid-chars: `"a-z", "A-Z", "0-9", "_", ".", "-"`\n' +
      '    linenum: `' + LINE.linenum + '`\n' +
      '    file: `' + LINE.file.path + '`\n' +
      '    text: `' + TEXT + '`');
  if (!ID)
    throw new Error('invalid `ID` component syntax\n' +
      '    should-match: `/[ \\t][a-zA-Z0-9_\\.\\-\\$]+[ \\t]?/`\n' +
      '    valid-chars: `"a-z", "A-Z", "0-9", "_", ".", "-", "$"`\n' +
      '    linenum: `' + LINE.linenum + '`\n' +
      '    file: `' + LINE.file.path + '`\n' +
      '    text: `' + TEXT + '`');
  if ( !hasValidInsert(TEXT) )
    throw new Error('invalid `insert` command syntax\n' +
      '    linenum: `' + LINE.linenum + '`\n' +
      '    file: `' + LINE.file.path + '`\n' +
      '    text: `' + TEXT + '`');

  /// #}}} @group Verify-Syntax

  /// #{{{ @group Verify-Path-Node

  if (!DEFS)
    throw new Error('no `File` node found for `path` component\n' +
      '    linenum: `' + LINE.linenum + '`\n' +
      '    file: `' + LINE.file.path + '`\n' +
      '    text: `' + TEXT + '`\n' +
      '    path: `' + PATH + '`');

  /// #}}} @group Verify-Path-Node

  /// #{{{ @group Verify-Def-Node

  if (!DEF) {
    keys = getKeys(DEFS);
    throw new Error('no `Def` node found in inserted `File`\n' +
      '    src-linenum: `' + LINE.linenum + '`\n' +
      '    src-file: `' + LINE.file.path + '`\n' +
      '    src-text: `' + TEXT + '`\n' +
      '    src-def: `"' + KEY + '"`\n' +
      '    ins-file: `' + NODE.path + '`\n' +
      '    ins-defs:' +
      (!keys.length
        ? ' No `Def` Instances Found\n'
        : '\n        `"' + keys.join('"`\n        `"') + '"`\n'));
  }

  /// #}}} @group Verify-Def-Node

  /// #{{{ @group Insert-Members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProp(this, 'type', {
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
  defineProp(this, 'tag', {
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
  defineProp(this, 'id', {
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
  defineProp(this, 'path', {
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
  defineProp(this, 'file', {
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
  defineProp(this, 'line', {
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
  defineProp(this, 'def', {
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
  defineProp(this, 'args', {
    'value': mkArgs(INDEX, DEF),
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member args

  /// #}}} @group Insert-Members

  freezeObject(this);
}
/// #}}} @func Ins

/// #}}} @group CONSTRUCTORS

/// #{{{ @group INS-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// INS-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Ins.prototype = createObject(null);
Ins.prototype.constructor = Ins;

/// #}}} @group INS-PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Ins;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
