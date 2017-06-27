/**
 * ---------------------------------------------------------------------------
 * FILE CLASS
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

/// #{{{ @const FILE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var FILE_TYPE_ID = loadHelper('type-ids').FILE;
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

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer = `false`
 * @return {(!Buffer|string)}
 */
var getFileContent = loadHelper('get-file-content');
/// #}}} @func getFileContent

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

/// #{{{ @func hasBlock
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasBlock = loadHelper('has-block-command');
/// #}}} @func hasBlock

/// #{{{ @func hasClose
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasClose = loadHelper('has-close-command');
/// #}}} @func hasClose

/// #{{{ @func hasCommand
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasCommand = loadHelper('has-command');
/// #}}} @func hasCommand

/// #{{{ @func hasConditional
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasConditional = loadHelper('has-conditional-command');
/// #}}} @func hasConditional

/// #{{{ @func hasDefine
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasDefine = loadHelper('has-define-command');
/// #}}} @func hasDefine

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

/// #{{{ @func hasInclude
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasInclude = loadHelper('has-include-command');
/// #}}} @func hasInclude

/// #{{{ @func hasInsert
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasInsert = loadHelper('has-insert-command');
/// #}}} @func hasInsert

/// #{{{ @func hasJsExt
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasJsExt = loadHelper('has-file-ext').construct('.js');
/// #}}} @func hasJsExt

/// #{{{ @func hasOpen
/**
 * @private
 * @param {string} text
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

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = loadHelper('is-block-node');
/// #}}} @func isBlkNode

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = loadHelper('is-conditional-node');
/// #}}} @func isCondNode

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

/// #{{{ @func isInclNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isInclNode = loadHelper('is-include-node');
/// #}}} @func isInclNode

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

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func toFile
/**
 * @private
 * @param {(!Buffer|string)} content
 * @param {string} filepath
 * @return {(!Buffer|string)}
 */
var toFile = loadHelper('to-file');
/// #}}} @func toFile

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

/// #{{{ @func setDefError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setDefError = setError.def;
/// #}}} @func setDefError

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

/// #{{{ @func setNoOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setNoOpenError = setError.noOpen;
/// #}}} @func setNoOpenError

/// #{{{ @func setOwnCmdError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {(!Line|!Blk|!Cond|!Incl)} node1
 * @param {(!Line|!Blk|!Cond|!Incl)} node2
 * @param {(?Blk|?Cond)=} scope = `null`
 * @return {!ReferenceError}
 */
var setOwnCmdError = setError.ownCmd;
/// #}}} @func setOwnCmdError

/// #{{{ @func setRetError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} method
 * @param {string} types
 * @return {!TypeError}
 */
var setRetError = setError.ret;
/// #}}} @func setRetError

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

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Blk
/**
 * @private
 * @param {!Line} open
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
var Blk = require('./block.js');
/// #}}} @func Blk

/// #{{{ @func Cond
/**
 * @private
 * @param {!Line} open
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
var Cond = require('./conditional.js');
/// #}}} @func Cond

/// #{{{ @func CondFlags
/**
 * @private
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @constructor
 * @struct
 */
var CondFlags = require('./conditional-flags.js');
/// #}}} @func CondFlags

/// #{{{ @func Def
/**
 * @private
 * @param {!Line} open
 * @param {!File} file
 * @constructor
 * @struct
 */
var Def = require('./define.js');
/// #}}} @func Def

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
  var TREE = PARENT.tree + name;
  /// #}}} @const TREE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': FILE_TYPE_ID,
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
   * @const {!Dir}
   */
  defineProperty(this, 'parent', {
    'value': PARENT,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member parent

  /// #{{{ @member lines
  /**
   * @public
   * @const {!Array<!Line>}
   */
  defineProperty(this, 'lines', {
    'value': [],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member lines

  /// #{{{ @member defs
  /**
   * @public
   * @const {!Object<string, !Def>}
   */
  defineProperty(this, 'defs', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member defs

  /// #{{{ @member blks
  /**
   * @public
   * @const {!Object<string, !Blk>}
   */
  defineProperty(this, 'blks', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member blks

  /// #{{{ @member conds
  /**
   * @public
   * @const {!Object<string, !Cond>}
   */
  defineProperty(this, 'conds', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member conds

  /// #{{{ @member incls
  /**
   * @public
   * @const {!Object<string, !Incl>}
   */
  defineProperty(this, 'incls', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member incls

  /// #{{{ @member inserts
  /**
   * @public
   * @type {?Array<!Ins>}
   */
  defineProperty(this, 'inserts', {
    'value': null,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });
  /// #}}} @member inserts

  /// #{{{ @member content
  /**
   * @public
   * @const {!Array<(!Line|!Blk|!Cond|!Incl)>}
   */
  defineProperty(this, 'content', {
    'value': [],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member content

  /// #}}} @step set-members

  /// #{{{ @step lock-instance

  lockObject(this);

  /// #}}} @step lock-instance
}
/// #}}} @func File

/// #{{{ @func Incl
/**
 * @private
 * @param {!Line} line
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
var Incl = require('./include.js');
/// #}}} @func Incl

/// #{{{ @func Ins
/**
 * @private
 * @param {!Line} line
 * @param {number} index
 * @param {!File} file
 * @constructor
 * @struct
 */
var Ins = require('./insert.js');
/// #}}} @func Ins

/// #{{{ @func Line
/**
 * @private
 * @param {string} text
 * @param {number} linenum
 * @param {!File} file
 * @constructor
 * @struct
 */
var Line = require('./line.js');
/// #}}} @func Line

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

File.prototype = createObject(null);
File.prototype.constructor = File;

/// #{{{ @func File.prototype.load
/**
 * @return {!File}
 */
File.prototype.load = function load() {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var textRows;
  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Line} */
  var line;
  /** @type {string} */
  var text;
  /** @type {!Object<string, !Def>} */
  var defs;
  /** @type {!Def} */
  var def;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  lines = this.lines;
  defs = this.defs;

  /// #}}} @step set-member-refs

  /// #{{{ @step load-file-text

  textRows = getFileContent(this.path).split('\n');
  switch (textRows.length) {
    case 0:
      textRows.push('');
      break;
    case 1:
      if ( !isString(textRows[0]) )
        textRows[0] = '';
      break;
  }
  freezeObject(textRows);

  /// #}}} @step load-file-text

  /// #{{{ @step make-lines

  /// #{{{ @step make-defs

  len = textRows.length;
  i = 0;
  while (i < len) {
    text = textRows[i];
    line = new Line(text, ++i, this);
    if ( !hasCommand(text) )
      lines.push(line);
    else if ( hasDefine(text) ) {
    /// #{{{ @step make-def

      if ( !hasOpen(text) )
        throw setNoOpenError(new SyntaxError, line, true);

      def = new Def(line, this);

      if ( hasOwnProperty(defs, def.key) )
        throw setOwnDefError(new ReferenceError, defs[def.key], def);

      defs[def.key] = def;
      i = def.load(textRows, i, len, this);

    /// #}}} @step make-def
    }
    else {
      lines.push(line);
      break;
    }
  }

  /// #}}} @step make-defs

  /// #{{{ @step finish-making-lines

  while (i < len) {
    text = textRows[i];
    line = new Line(text, ++i, this);

    if ( hasDefine(text) )
      throw setDefError(new SyntaxError, line);

    lines.push(line);
  }

  /// #}}} @step finish-making-lines

  /// #}}} @step make-lines

  /// #{{{ @step lock-defs

  lockObject(defs);

  /// #}}} @step lock-defs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func File.prototype.load

/// #{{{ @func File.prototype.preparse
/**
 * @return {!File}
 */
File.prototype.preparse = function preparse() {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Ins>} */
  var inserts;
  /** @type {!Ins} */
  var insert;
  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Line} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  lines = this.lines;

  /// #}}} @step set-member-refs

  /// #{{{ @step make-inserts

  inserts = [];
  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    if ( hasInsert(line.text) ) {
      insert = new Ins(line, i, this);
      inserts.push(insert);
    }
  }

  /// #}}} @step make-inserts

  /// #{{{ @step lock-inserts

  lockObject(inserts);

  /// #}}} @step lock-inserts

  /// #{{{ @step set-inserts

  /// #{{{ @member inserts
  /**
   * @public
   * @const {!Array<!Ins>}
   */
  defineProperty(this, 'inserts', {
    'value': inserts,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member inserts

  /// #}}} @step set-inserts

  /// #{{{ @step insert-lines

  i = inserts.length;
  while (i--) {
    insert = inserts[i];
    lines.splice.apply(lines, insert.args);
  }

  /// #}}} @step insert-lines

  /// #{{{ @step update-lines

  len = lines.length;
  i = 0;
  while (i < len) {
    line = lines[i];
    line.setAfter(++i, this);
  }

  /// #}}} @step update-lines

  /// #{{{ @step freeze-members

  freezeObject(inserts);
  freezeObject(lines);
  freezeObject(defs);

  /// #}}} @step freeze-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func File.prototype.preparse

/// #{{{ @func File.prototype.parse
/**
 * @return {!File}
 */
File.prototype.parse = function parse() {

  /// #{{{ @step declare-variables

  /** @type {!Array<(!Line|!Blk|!Cond|!Incl)>} */
  var content;
  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Object<string, !Incl>} */
  var incls;
  /** @type {!Object<string, !Cond>} */
  var conds;
  /** @type {!Object<string, !Blk>} */
  var blks;
  /** @type {!Line} */
  var line;
  /** @type {string} */
  var text;
  /** @type {(!Blk|!Cond|!Incl)} */
  var cmd;
  /** @type {(?Blk|?Cond|?Incl)} */
  var own;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  content = this.content;
  lines = this.lines;
  incls = this.incls;
  conds = this.conds;
  blks = this.blks;

  /// #}}} @step set-member-refs

  /// #{{{ @step parse-scoped-lines

  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    text = line.text;
    /// #{{{ @step parse-scoped-line

    if ( !hasCommand(text) ) {
      /// #{{{ @step parse-line-of-code

      content.push(line);

      /// #}}} @step parse-line-of-code
    }
    else if ( hasInclude(text) ) {
      /// #{{{ @step parse-include-command

      cmd = new Incl(line, this);
      own = getOwnedCommand(this, cmd.key);

      if (own)
        throw setOwnCmdError(new ReferenceError, own, line);

      incls[cmd.key] = cmd;
      content.push(cmd);

      /// #}}} @step parse-include-command
    }
    else if ( hasClose(text) )
      throw setNoOpenError(new SyntaxError, line);
    else if ( !hasOpen(text) )
      throw setCmdError(new SyntaxError, line);
    else {
      /// #{{{ @step parse-group-command

      if ( hasConditional(text) ) {
        /// #{{{ @step parse-conditional-command

        cmd = new Cond(line, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line);

        conds[cmd.key] = cmd;

        /// #}}} @step parse-conditional-command
      }
      else {
        /// #{{{ @step parse-block-command

        cmd = new Blk(line, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line);

        blks[cmd.key] = cmd;

        /// #}}} @step parse-block-command
      }
      content.push(cmd);
      i = cmd.parse(lines, i, this);

      /// #}}} @step parse-group-command
    }

    /// #}}} @step parse-scoped-line
  }

  /// #}}} @step parse-scoped-lines

  /// #{{{ @step freeze-members

  freezeObject(blks);
  freezeObject(conds);
  freezeObject(incls);
  freezeObject(content);

  /// #}}} @step freeze-members

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func File.prototype.parse

/// #{{{ @func File.prototype.run
/**
 * @param {string} dest
 *   The file path to the destination you want to save the preprocessed
 *   result. The file path may be relative or absolute. If it is a relative
 *   path, it is relative to the `cwd`. The directory path up to the file name
 *   of the resolved #dest path must already exist. If a file exists at the
 *   resolved #dest path, it is overwritten.
 * @param {(!Object<string, (boolean|!Object<string, boolean>)>|!CondFlags)} state
 *   The enabled, `true`, or disabled, `false`, state for every conditional
 *   command defined within the `File` instance's *content* `array`. Each
 *   parent *state* `object` key must be a `Cond` instance's *tag*, *ID* (note
 *   that a leading colon, `":id"` or `"*:id"`, is required for parent *ID*
 *   key names), or *key* (e.g. `"tag:id"`). Parent *tag* keys may use a
 *   `boolean` or an `object` with *ID* key names and `boolean` values for
 *   their value. Parent *ID* or *key* keys must use a `boolean` value. The
 *   asterisk, `"*"`, denotes any number of wildcard characters within a *tag*
 *   or *ID* (within a *key* it only applies to the *tag* or *ID* where it is
 *   defined - it does NOT cross-over the separating colon). The question
 *   mark, `"?"`, denotes a single wildcard character within a *tag*, *ID*, or
 *   *key*. Every `Cond` instance within the `File` instance must be defined
 *   in the *state* or an error will be thrown.
 * @param {(!function(string): string)=} alter
 *   The *alter* `function` is optional. If it is defined, it allows you to
 *   provide custom alterations to the preprocessed result before it is saved
 *   to the *dest*.
 * @return {string}
 */
File.prototype.run = function run(dest, state, alter) {

  /// #{{{ @step declare-variables

  /** @type {!CondFlags} */
  var condFlags;
  /** @type {!Object<string, ?Incl>} */
  var inclFiles;
  /** @type {!Object<string, !Incl>} */
  var inclNodes;
  /** @type {!Array<(!Line|!Blk|!Cond|!Incl)>} */
  var content;
  /** @type {string} */
  var result;
  /** @type {(!Line|!Blk|!Cond|!Incl)} */
  var node;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  /// #{{{ @step verify-data-types

  if ( !isString(dest) )
    throw setTypeError(new TypeError, 'dest', 'string');
  if ( !isCondFlagsNode(state) && !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '(!Object<string, (boolean|!Object<string, boolean>)>|!CondFlags)');
  if ( !isUndefined(alter) && !isFunction(alter) )
    throw setTypeError(new TypeError, 'alter', '(!function(string): string)=');

  /// #}}} @step verify-data-types

  /// #{{{ @step verify-dest-path

  if (!dest)
    throw setEmptyError(new Error, 'dest');
  if ( !hasJsExt(dest) )
    throw setExtError(new RangeError, 'dest', dest, '.js');

  dest = resolvePath(dest);
  path = trimPathName(dest);

  if ( !isDirectory(path) )
    throw setDirError(new Error, 'dest', path);
  if ( hasDirectory(dest, this.parent.path) )
    throw setLocError(new RangeError, 'dest', dest, this.parent, false);

  /// #}}} @step verify-dest-path

  /// #}}} @step verify-parameters

  /// #{{{ @step set-member-refs

  content = this.content;

  /// #}}} @step set-member-refs

  /// #{{{ @step make-cond-flags

  condFlags = isCondFlagsNode(state)
    ? state
    : new CondFlags(state);

  /// #}}} @step make-cond-flags

  /// #{{{ @step setup-include-management

  inclFiles = {};
  inclFiles[this.tree] = null;
  inclFiles = freezeObject(inclFiles);

  inclNodes = {};

  /// #}}} @step setup-include-management

  /// #{{{ @step setup-results

  result = '';

  /// #}}} @step setup-results

  /// #{{{ @step process-content

  len = content.length;
  i = -1;
  while (++i < len) {
    node = content[i];
    result += isLineNode(node)
      ? node.text + '\n'
      : node.run(condFlags, inclFiles, inclNodes);
  }

  /// #}}} @step process-content

  /// #{{{ @step run-alter

  if ( isFunction(alter) ) {
    result = alter(result);

    if ( !isString(result) )
      throw setRetError(new TypeError, 'alter', 'string');
  }

  /// #}}} @step run-alter

  /// #{{{ @step save-results

  toFile(result, dest);

  /// #}}} @step save-results

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
};
/// #}}} @func File.prototype.run

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = File;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
