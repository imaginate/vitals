/**
 * ---------------------------------------------------------------------------
 * PARSE METHOD
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

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} name
 * @return {!Function}
 */
var loadClass = loadHelper('load-class');
/// #}}} @func loadClass

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @group CONSTRUCTORS

/// #{{{ @func Blk
/**
 * @private
 * @param {!Line} open
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
var Blk = loadClass('block');
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
var Cond = loadClass('conditional');
/// #}}} @func Cond

/// #{{{ @func Incl
/**
 * @private
 * @param {!Line} line
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
var Incl = loadClass('include');
/// #}}} @func Incl

/// #}}} @group CONSTRUCTORS

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
 * @return {!SyntaxError}
 */
var setCloseError = setError.close;
/// #}}} @func setCloseError

/// #{{{ @func setCmdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
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
 * @return {!SyntaxError}
 */
var setMatchError = setError.match;
/// #}}} @func setMatchError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setNoCloseError = setError.noClose;
/// #}}} @func setNoCloseError

/// #{{{ @func setOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
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

/// #{{{ @func isFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFlagsNode = loadHelper('is-flags-node');
/// #}}} @func isFlagsNode

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

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Cond.prototype.parse
/**
 * @public
 * @this {!Cond}
 * @param {!Array<!Line>} lines
 * @param {number} i
 * @param {!File} file
 * @return {number}
 */
function parse(lines, i, file) {

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
}
/// #}}} @func Cond.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parse;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
