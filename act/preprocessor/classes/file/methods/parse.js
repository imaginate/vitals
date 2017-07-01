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

/// #{{{ @func setPhaseError
/**
 * @private
 * @param {!Error} err
 * @param {string} func
 * @param {(!Blk|!Cond|!Def|!Incl|!Ins)} node
 * @return {!Error}
 */
var setPhaseError = setError.phase;
/// #}}} @func setPhaseError

/// #}}} @group ERROR

/// #{{{ @group GET

/// #{{{ @func getOwnedCommand
/**
 * @private
 * @param {(!File|!Blk|!Cond)} src
 * @param {(string|!Blk|!Cond|!Incl)} node
 * @return {(?Blk|?Cond|?Incl)}
 */
var getOwnedCommand = loadHelper('get-owned-command');
/// #}}} @func getOwnedCommand

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

/// #{{{ @func hasInclude
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasInclude = loadHelper('has-include-command');
/// #}}} @func hasInclude

/// #{{{ @func hasOpen
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasOpen = loadHelper('has-open-command');
/// #}}} @func hasOpen

/// #}}} @group HAS

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

/// #{{{ @func File.prototype.parse
/**
 * @public
 * @this {!File}
 * @return {!File}
 */
function parse() {

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

  /// #{{{ @step verify-phase

  if (this.content.length !== 0)
    throw setPhaseError(new Error, 'parse', this);

  /// #}}} @step verify-phase

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

      setupOffProperty(incls, cmd.key, cmd, true);
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

        if (!own)
          setupOffProperty(conds, cmd.key, cmd, true);
        else
          throw setOwnCmdError(new ReferenceError, own, line);

        /// #}}} @step parse-conditional-command
      }
      else {
        /// #{{{ @step parse-block-command

        cmd = new Blk(line, this);
        own = getOwnedCommand(this, cmd.key);

        if (!own)
          setupOffProperty(blks, cmd.key, cmd, true);
        else
          throw setOwnCmdError(new ReferenceError, own, line);

        /// #}}} @step parse-block-command
      }
      content.push(cmd);
      i = cmd.parse(lines, i, this);

      /// #}}} @step parse-group-command
    }

    /// #}}} @step parse-scoped-line
  }

  /// #}}} @step parse-scoped-lines

  /// #{{{ @step freeze-instance

  freezeObject(this);
  freezeObject(blks);
  freezeObject(conds);
  freezeObject(incls);
  freezeObject(content);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func File.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parse;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
