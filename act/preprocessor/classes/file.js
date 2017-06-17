/**
 * ---------------------------------------------------------------------------
 * FILE CLASS
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

/// #{{{ @const FILE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var FILE_TYPE_ID = loadHelper('type-ids').file;
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

/// #{{{ @func hasBlock
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasBlock = loadHelper('has-block-command');
/// #}}} @func hasBlock

/// #{{{ @func hasClose
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasClose = loadHelper('has-close-command');
/// #}}} @func hasClose

/// #{{{ @func hasCommand
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasCommand = loadHelper('has-command');
/// #}}} @func hasCommand

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

/// #{{{ @func hasConditional
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasConditional = loadHelper('has-conditional-command');
/// #}}} @func hasConditional

/// #{{{ @func hasDefine
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasDefine = loadHelper('has-define-command');
/// #}}} @func hasDefine

/// #{{{ @func hasInclude
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasInclude = loadHelper('has-include-command');
/// #}}} @func hasInclude

/// #{{{ @func hasInsert
/**
 * @private
 * @param {string} val
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
 * @param {string} val
 * @return {boolean}
 */
var hasOpen = loadHelper('has-open-command');
/// #}}} @func hasOpen

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isBooleanMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBooleanMap = IS.booleanHashMap;
/// #}}} @func isBooleanMap

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

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

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

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func sealObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var sealObject = loadHelper('seal-object');
/// #}}} @func sealObject

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

/// #{{{ @func setDefChildError
/**
 * @private
 */
var setDefChildError = setError.defChild;
/// #}}} @func setDefChildError

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

/// #{{{ @func setNoOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
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

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');
  if ( !isFile(path) )
    throw setFileError(new Error, 'path', path);
  if ( !isDirNode(parent) )
    throw setTypeError(new TypeError, 'parent', '!Dir');

  /// #{{{ @group File-Constants

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

  /// #}}} @group File-Constants

  /// #{{{ @group File-Members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProp(this, 'type', {
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
  defineProp(this, 'name', {
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
  defineProp(this, 'tree', {
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
  defineProp(this, 'path', {
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
  defineProp(this, 'parent', {
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
  defineProp(this, 'lines', {
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
  defineProp(this, 'defs', {
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
  defineProp(this, 'blks', {
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
  defineProp(this, 'conds', {
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
  defineProp(this, 'incls', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member incls

  /// #{{{ @member inserts
  /**
   * @public
   * @const {!Array<!Ins>}
   */
  defineProp(this, 'inserts', {
    'value': [],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member inserts

  /// #{{{ @member content
  /**
   * @public
   * @const {!Array<(!Line|!Blk|!Cond|!Incl)>}
   */
  defineProp(this, 'content', {
    'value': [],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member content

  /// #}}} @group File-Members

  capObject(this);
  sealObject(this);
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

/// #{{{ @group FILE-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// FILE-PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

File.prototype = createObject(null);
File.prototype.constructor = File;

/// #{{{ @func File.prototype.load
/**
 * @return {void}
 */
File.prototype.load = function load() {

  /** @type {boolean} */
  var passedCmd;
  /** @type {!Array<string>} */
  var textRows;
  /** @type {number} */
  var linenum;
  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Line} */
  var line;
  /** @type {string} */
  var text;
  /** @type {!Object<string, !Def>} */
  var defs;
  /** @type {?Def} */
  var def;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  passedCmd = false;
  textRows = getFileContent(this.path).split('\n');
  lines = this.lines;
  defs = this.defs;
  def = null;
  len = content.length;
  i = -1;
  while (++i < len) {
    linenum = i + 1;
    text = textRows[i];
    line = new Line(text, linenum, this);
    if (def) {
      if ( !hasCommand(text) )
        def.lines.push(line);
      else if ( hasDefine(text) ) {

        if ( !hasClose(text) )
          throw setDefChild(new SyntaxError, line, def.open);

        def.setClose(line);
        def = null;
      }
      else if ( hasInsert(text) )
        throw new Error('invalid `insert` within `define`\n' +
          '    linenum: `' + linenum + '`\n' +
          '    file: `' + this.path + '`\n' +
          '    text: `' + text + '`');
      else
        def.lines.push(line);
    }
    else if ( !hasCommand(text) )
      lines.push(line);
    else if ( hasDefine(text) ) {
      if ( passedCmd || !hasOpen(text) )
        throw new Error('invalid `define` command order\n' +
          '    linenum: `' + linenum + '`\n' +
          '    file: `' + this.path + '`\n' +
          '    text: `' + text + '`');

      def = new Def(line, this);
      defs[def.tag + ':' + def.id] = def;
    }
    else {
      if (!passedCmd)
        passedCmd = true;
      lines.push(line);
    }
  }

  capObject(defs);
  sealObject(defs);
};
/// #}}} @func File.prototype.load

/// #{{{ @func File.prototype.preparse
/**
 * @return {void}
 */
File.prototype.preparse = function preparse() {

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

  inserts = this.inserts;
  lines = this.lines;
  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    if ( hasInsert(line.text) ) {
      insert = new Ins(line, i, this);
      inserts.push(insert);
    }
  }

  i = inserts.length;
  while (i--) {
    insert = inserts[i];
    lines.splice.apply(lines, insert.args);
  }

  len = lines.length;
  i = 0;
  while (i < len) {
    line = lines[i];
    line.setAfter(++i, this);
  }

  capObject(lines);
  sealObject(lines);
  capObject(inserts);
  sealObject(inserts);
};
/// #}}} @func File.prototype.preparse

/// #{{{ @func File.prototype.parse
/**
 * @return {void}
 */
File.prototype.parse = function parse() {

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

  content = this.content;
  lines = this.lines;
  incls = this.incls;
  conds = this.conds;
  blks = this.blks;

  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    text = line.text;
    if ( !hasCommand(text) )
      content.push(line);
    else if ( hasInclude(text) ) {
      cmd = new Incl(line, this);
      own = getOwnedCommand(this, cmd.key);

      if (own)
        throw setOwnCmdError(new ReferenceError, own, line);

      incls[cmd.key] = cmd;
      content.push(cmd);
    }
    else if ( hasClose(text) )
      throw setNoOpenError(new SyntaxError, line);
    else if ( !hasOpen(text) )
      throw setCmdError(new SyntaxError, line);
    else {
      if ( hasConditional(text) ) {
        cmd = new Cond(line, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line);

        conds[cmd.key] = cmd;
      }
      else {
        cmd = new Blk(line, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line);

        blks[cmd.key] = cmd;
      }
      content.push(cmd);
      i = cmd.parse(lines, i, this);
    }
  }

  freezeObject(blks);
  freezeObject(conds);
  freezeObject(incls);
  freezeObject(content);
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
 * @param {!Object<string, boolean>} state
 *   The enabled, `true`, or disabled, `false`, state for every conditional
 *   command defined within the `File` instance's *content* `array`. Each
 *   #state `object` key must be *hashed* (i.e. created) by combining each
 *   `Cond` instance's *tag* and *ID* with a colon, `":"`, separating them
 *   (e.g. `"tag:id"`). Every `Cond` instance within the `File` instance must
 *   be defined in the #state or an error will be thrown.
 * @param {(!function(string): string)=} alter
 *   The #alter `function` is optional. If it is defined, it allows you to
 *   provide custom alterations to the preprocessed result before it is saved
 *   to the #dest.
 * @return {string}
 */
File.prototype.run = function run(dest, state, alter) {

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
  /** @type {string} */
  var key;
  /** @type {string} */
  var pwd;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isUndefined(alter) && !isFunction(alter) )
    throw setTypeError(new TypeError, 'alter', '(!function(string): string)=');
  if ( !isObject(state) || !isBooleanMap(state) )
    throw setTypeError(new TypeError, 'state', '!Object<string, boolean>');
  if ( !isString(dest) )
    throw setTypeError(new TypeError, 'dest', 'string');

  if (!dest)
    throw setEmptyError(new Error, 'dest');
  if ( !hasJsExt(dest) )
    throw setExtError(new Error, 'dest', '.js');

  pwd = this.parent.path;
  dest = resolvePath(dest);
  path = trimPathName(dest);

  if ( !isDirectory(path) )
    throw new Error('invalid readable directory path for `dest`\n' +
      '    dest-path: `' + dest + '`\n' +
      '    dir-path: `' + path + '`');
  if ( hasDirectory(dest, pwd) )
    throw new Error('invalid `dest` file path location (' +
      'must NOT be within parent `Dir`)\n' +
      '    dir-path: `' + pwd + '`\n' +
      '    dest-path: `' + dest + '`');

  freezeObject(state);

  inclFiles = {};
  inclFiles[this.tree] = null;
  inclFiles = freezeObject(inclFiles);

  inclNodes = {};

  content = this.content;
  result = '';
  len = content.length;
  i = -1;
  while (++i < len) {
    node = content[i];
    if ( isLineNode(node) )
      result += node.text + '\n';
    else if ( isInclNode(node) ) {
      key = node.file.tree + '|' + node.key;

      if ( hasOwnProperty(inclNodes, key) )
        throw new Error('duplicate `include` command\n' +
          '    linenum: `' + inclNodes[key].line.linenum + '`\n' +
          '    file: `' + inclNodes[key].line.file.path + '`\n' +
          '    text: `' + inclNodes[key].line.text + '`\n' +
          '    linenum: `' + node.line.linenum + '`\n' +
          '    file: `' + node.line.file.path + '`\n' +
          '    text: `' + node.line.text + '`');
      if ( hasOwnProperty(inclFiles, node.cmd.file.tree) )
        throw new Error('invalid `include` call to parent file\n' +
          '    src-file: `' + node.file.path + '`\n' +
          '    linenum: `' + node.line.linenum + '`\n' +
          '    file: `' + node.line.file.path + '`\n' +
          '    text: `' + node.line.text + '`');

      defineProp(inclNodes, key, {
        'value': node,
        'writable': false,
        'enumerable': true,
        'configurable': false
      });
    }
    else if ( isCondNode(node) ) {

      if ( !hasOwnProperty(state, node.key) )
        throw new Error('undefined `conditional` in `state`\n' +
          '    missing-key: `"' + node.key + '"`');

      if (state[node.key]) {
        if (node.action)
          result += node.run(state, inclFiles, inclNodes);
      }
      else if (!node.action)
        result += node.run(state, inclFiles, inclNodes);
    }
    else {
      result += node.run(state, inclFiles, inclNodes);
    }
  }

  if ( isFunction(alter) ) {
    result = alter(result);

    if ( !isString(result) )
      throw new TypeError('invalid returned `alter` data type\n' +
        '    valid-types: `string`');
  }

  return toFile(result, dest);
};
/// #}}} @func File.prototype.run

/// #}}} @group FILE-PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = File;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
