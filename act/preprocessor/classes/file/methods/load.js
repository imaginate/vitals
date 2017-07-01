/**
 * ---------------------------------------------------------------------------
 * LOAD METHOD
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

/// #{{{ @func Def
/**
 * @private
 * @param {!Line} open
 * @param {!File} file
 * @constructor
 * @struct
 */
var Def = loadClass('define');
/// #}}} @func Def

/// #{{{ @func Line
/**
 * @private
 * @param {string} text
 * @param {!Loc} before
 * @param {?Loc=} after
 * @constructor
 * @struct
 */
var Line = loadClass('line');
/// #}}} @func Line

/// #{{{ @func Loc
/**
 * @private
 * @param {number} linenum
 * @param {!File} file
 * @constructor
 * @struct
 */
var Loc = loadClass('location');
/// #}}} @func Loc

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

/// #{{{ @func setDefError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setDefError = setError.def;
/// #}}} @func setDefError

/// #{{{ @func setNoOpenError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
var setNoOpenError = setError.noOpen;
/// #}}} @func setNoOpenError

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

/// #{{{ @group FS

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer = `false`
 * @return {(!Buffer|string)}
 */
var getFileContent = loadHelper('get-file-content');
/// #}}} @func getFileContent

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasCommand
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasCommand = loadHelper('has-command');
/// #}}} @func hasCommand

/// #{{{ @func hasDefine
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasDefine = loadHelper('has-define-command');
/// #}}} @func hasDefine

/// #{{{ @func hasOpen
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasOpen = loadHelper('has-open-command');
/// #}}} @func hasOpen

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

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

/// #{{{ @func File.prototype.load
/**
 * @public
 * @this {!File}
 * @return {!File}
 */
function load() {

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
  /** @type {!Loc} */
  var loc;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-phase

  if (this.lines.length !== 0)
    throw setPhaseError(new Error, 'load', this);

  /// #}}} @step verify-phase

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
    loc = new Loc(++i, this);
    line = new Line(text, loc);

    if ( !hasCommand(text) ) {
      lines.push(line);
    }
    else if ( hasDefine(text) ) {
    /// #{{{ @step make-def

      if ( !hasOpen(text) )
        throw setNoOpenError(new SyntaxError, line);

      def = new Def(line, this);

      if (def.key in defs)
        throw setOwnDefError(new ReferenceError, defs[def.key], def);

      setupOffProperty(defs, def.key, def, true);
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
    loc = new Loc(++i, this);
    line = new Line(text, loc);

    if ( hasDefine(text) )
      throw setDefError(new SyntaxError, line);

    lines.push(line);
  }

  /// #}}} @step finish-making-lines

  /// #}}} @step make-lines

  /// #{{{ @step freeze-defs

  freezeObject(defs);

  /// #}}} @step freeze-defs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func File.prototype.load

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = load;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
