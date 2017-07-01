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

/// #{{{ @func setCmdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setCmdError = setError.cmd;
/// #}}} @func setCmdError

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

/// #{{{ @func setPhaseError
/**
 * @private
 * @param {!Error} err
 * @param {string} func
 * @param {(!File|!Blk|!Cond|!Def|!Incl|!Ins)} node
 * @return {!Error}
 */
var setPhaseError = setError.phase;
/// #}}} @func setPhaseError

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

/// #{{{ @func getOwnedCommand
/**
 * @private
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Incl)} node
 * @return {(?Blk|?Incl)}
 */
var getOwnedCommand = loadHelper('get-owned-command');
/// #}}} @func getOwnedCommand

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

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

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
  /** @type {!Array<!Cond>} */
  var conds;
  /** @type {!Object<string, !Blk>} */
  var blks;
  /** @type {!Line} */
  var line;
  /** @type {string} */
  var text;
  /** @type {(!Blk|!Cond|!Incl)} */
  var cmd;
  /** @type {(?Line|?Blk|?Incl)} */
  var own;
  /** @type {number} */
  var len;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');
    case 1:
      throw setNoArgError(new Error, 'i');
    case 2:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isArray(lines) )
    throw setTypeError(new TypeError, 'lines', '!Array<!Line>');
  if ( !isNumber(i) )
    throw setTypeError(new TypeError, 'i', 'number');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  if ( !isWholeNumber(i) || i < 0 )
    throw setIndexError(new RangeError, 'i', i);

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-phase

  if (this.content || this.close)
    throw setPhaseError(new Error, 'parse', this);

  /// #}}} @step verify-phase

  /// #{{{ @step set-member-refs

  blks = this.blks;
  conds = this.conds;
  incls = this.incls;

  content = [];

  /// #{{{ @member content
  /**
   * @public
   * @const {!Array<(!Line|!Blk|!Cond|!Incl)>}
   */
  setupOffProperty(this, 'content', content, true);
  /// #}}} @member content

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

      setupOffProperty(incls, cmd.key, cmd, true);
      content.push(cmd);

      /// #}}} @step parse-include-command
    }
    else if ( hasOpen(text) ) {
      /// #{{{ @step parse-group-command

      if ( hasConditional(text) ) {
        /// #{{{ @step parse-conditional-command

        cmd = new Cond(line, file, this);
        conds.push(cmd);

        /// #}}} @step parse-conditional-command
      }
      else {
        /// #{{{ @step parse-block-command

        cmd = new Blk(line, file, this);
        own = getOwnedCommand(this, cmd.key);

        if (!own)
          setupOffProperty(blks, cmd.key, cmd, true);
        else
          throw setOwnCmdError(new ReferenceError, own, line, this);

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

  /// #{{{ @step freeze-instance

  freezeObject(this);
  freezeObject(blks);
  freezeObject(conds);
  freezeObject(incls);
  freezeObject(content);

  /// #}}} @step freeze-instance

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
