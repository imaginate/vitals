/**
 * ---------------------------------------------------------------------------
 * BLOCK CLASS
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

/// #{{{ @const BLK_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var BLK_TYPE_ID = loadHelper('type-ids').block;
/// #}}} @const BLK_TYPE_ID

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

/// #{{{ @func getIdComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getIdComponent = loadHelper('get-id-component');
/// #}}} @func getIdComponent

/// #{{{ @func getOwnedCommand
/**
 * @private
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Cond|!Incl)} node
 * @return {(?Blk|?Cond|?Incl)}
 */
var getOwnedCommand = loadHelper('get-owned-command');
/// #}}} @func getOwnedCommand

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

/// #{{{ @func hasConditional
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasConditional = loadHelper('has-conditional-command');
/// #}}} @func hasConditional

/// #{{{ @func hasInclude
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var hasInclude = loadHelper('has-include-command');
/// #}}} @func hasInclude

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

/// #{{{ @func hasValidBlock
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidBlock = loadHelper('has-valid-block');
/// #}}} @func hasValidBlock

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

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

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

/// #{{{ @func setCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setCloseError = setError.close;
/// #}}} @func setCloseError

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

/// #{{{ @func setMatchError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} open
 * @param {!Line} close
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setMatchError = setError.match;
/// #}}} @func setMatchError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

/// #{{{ @func setNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setNoCloseError = setError.noClose;
/// #}}} @func setNoCloseError

/// #{{{ @func setOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setOpenError = setError.open;
/// #}}} @func setOpenError

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

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Blk
/**
 * @public
 * @param {!Line} open
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
function Blk(open, file, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Blk) )
    throw setNewError(new SyntaxError, 'Blk');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isLineNode(open) )
    throw setTypeError(new TypeError, 'open', '!Line');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');
  if (!isUndefined(parent)
      && !isNull(parent)
      && !isBlkNode(parent)
      && !isCondNode(parent) )
    throw setTypeError(new TypeError, 'parent', '(?Blk|?Cond)=');

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
  if ( !hasValidBlock(TEXT) )
    throw setCmdError(new SyntaxError, OPEN);

  /// #}}} @step verify-syntax

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': BLK_TYPE_ID,
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

  /// #{{{ @member key
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'key', {
    'value': KEY,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member key

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

  /// #{{{ @member open
  /**
   * @public
   * @const {!Line}
   */
  defineProperty(this, 'open', {
    'value': OPEN,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member open

  /// #{{{ @member close
  /**
   * @public
   * @type {?Line}
   */
  defineProperty(this, 'close', {
    'value': null,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });
  /// #}}} @member close

  /// #{{{ @member parent
  /**
   * @public
   * @const {(?Blk|?Cond)}
   */
  defineProperty(this, 'parent', {
    'value': PARENT,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member parent

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

  capObject(this);
  sealObject(this);

  /// #}}} @step lock-instance
}
/// #}}} @func Blk

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Blk.prototype = createObject(null);
Blk.prototype.constructor = Blk;

/// #{{{ @func Blk.prototype.parse
/**
 * @param {!Array<!Line>} lines
 * @param {number} i
 * @param {!File} file
 * @return {number}
 */
Blk.prototype.parse = function parse(lines, i, file) {

  /// #{{{ @step declare-variables

  /** @type {!Array<(!Line|!Blk|!Cond|!Incl)>} */
  var content;
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
  /** @type {(?Line|?Blk|?Cond|?Incl)} */
  var own;
  /** @type {number} */
  var len;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isArray(lines) )
    throw setTypeError(new TypeError, 'lines', '!Array<!Line>');
  if ( !isNumber(i) )
    throw setTypeError(new TypeError, 'i', 'number');
  if ( !isWholeNumber(i) || i < 0 )
    throw setIndexError(new RangeError, 'i', i);
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-member-refs

  content = this.content;
  incls = this.incls;
  conds = this.conds;
  blks = this.blks;

  /// #}}} @step set-member-refs

  /// #{{{ @step parse-scoped-lines

  len = lines.length;
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

      cmd = new Incl(line, file, this);
      own = getOwnedCommand(this, cmd.key);

      if (own)
        throw setOwnCmdError(new ReferenceError, own, line, this);

      incls[cmd.key] = cmd;
      content.push(cmd);

      /// #}}} @step parse-include-command
    }
    else if ( hasOpen(text) ) {
      /// #{{{ @step parse-group-command

      if ( hasConditional(text) ) {
        /// #{{{ @step parse-conditional-command

        cmd = new Cond(line, file, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line, this);

        conds[cmd.key] = cmd;

        /// #}}} @step parse-conditional-command
      }
      else {
        /// #{{{ @step parse-block-command

        cmd = new Blk(line, file, this);
        own = getOwnedCommand(this, cmd.key);

        if (own)
          throw setOwnCmdError(new ReferenceError, own, line, this);

        blks[cmd.key] = cmd;

        /// #}}} @step parse-block-command
      }
      content.push(cmd);
      i = cmd.parse(lines, i, file);

      /// #}}} @step parse-group-command
    }
    else if ( !hasClose(text) )
      throw setCmdError(new SyntaxError, line);
    else {
      /// #{{{ @step parse-close-command

      this.setClose(line);

      /// #}}} @step parse-close-command
      break;
    }

    /// #}}} @step parse-scoped-line
  }

  /// #}}} @step parse-scoped-lines

  /// #{{{ @step verify-close

  if (!this.close)
    throw setNoCloseError(new SyntaxError, this.open);

  /// #}}} @step verify-close

  /// #{{{ @step freeze-members

  freezeObject(blks);
  freezeObject(conds);
  freezeObject(incls);
  freezeObject(content);

  /// #}}} @step freeze-members

  /// #{{{ @step return-index

  return i;

  /// #}}} @step return-index
};
/// #}}} @func Blk.prototype.parse

/// #{{{ @func Blk.prototype.run
/**
 * @param {!CondFlags} condFlags
 * @param {!Object<string, ?Incl>} inclFiles
 * @param {!Object<string, !Incl>} inclNodes
 * @return {string}
 */
Blk.prototype.run = function run(condFlags, inclFiles, inclNodes) {

  /// #{{{ @step declare-variables

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

  if ( !isCondFlagsNode(condFlags) )
    throw setTypeError(new TypeError, 'condFlags', '!CondFlags');
  if ( !isObject(inclFiles) )
    throw setTypeError(new TypeError, 'inclFiles', '!Object<string, ?Incl>');
  if ( !isObject(inclNodes) )
    throw setTypeError(new TypeError, 'inclNodes', '!Object<string, !Incl>');

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-refs

  /// #{{{ @group members

  content = this.content;

  /// #}}} @group members

  /// #{{{ @group results

  result = '';

  /// #}}} @group results

  /// #}}} @step setup-refs

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

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
};
/// #}}} @func Blk.prototype.run

/// #{{{ @func Blk.prototype.setClose
/**
 * @param {!Line} close
 * @return {void}
 */
Blk.prototype.setClose = function setClose(close) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var text;
  /** @type {string} */
  var tag;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isLineNode(close) )
    throw setTypeError(new TypeError, 'close', '!Line');

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-syntax

  text = close.text;
  tag = getTagComponent(text);
  id = getIdComponent(text);

  if ( !hasClose(text) )
    throw setCloseError(new SyntaxError, close);
  if ( !hasBlock(text) )
    throw setMatchError(new SyntaxError, this.open, close);
  if (!tag)
    throw setTagError(new SyntaxError, close);
  if (!id)
    throw setIdError(new SyntaxError, close);
  if ( !hasValidBlock(text) )
    throw setCmdError(new SyntaxError, close);
  if (tag !== this.tag || id !== this.id)
    throw setMatchError(new SyntaxError, this.open, close);

  /// #}}} @step verify-syntax

  /// #{{{ @step set-members

  /// #{{{ @member close
  /**
   * @public
   * @const {!Line}
   */
  defineProperty(this, 'close', {
    'value': close,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member close

  /// #}}} @step set-members
};
/// #}}} @func Blk.prototype.setClose

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Blk;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
