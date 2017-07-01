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

/// #{{{ @func setDefChildError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} child
 * @param {!Line} parent
 * @return {!SyntaxError}
 */
var setDefChildError = setError.defChild;
/// #}}} @func setDefChildError

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

/// #{{{ @group HAS

/// #{{{ @func hasClose
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasClose = loadHelper('has-close-command');
/// #}}} @func hasClose

/// #{{{ @func hasDefine
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasDefine = loadHelper('has-define-command');
/// #}}} @func hasDefine

/// #{{{ @func hasInsert
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasInsert = loadHelper('has-insert-command');
/// #}}} @func hasInsert

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

/// #{{{ @func Def.prototype.load
/**
 * @public
 * @this {!Def}
 * @param {!Array<string>} textRows
 * @param {number} i
 * @param {number} len
 * @param {!File} file
 * @return {number}
 */
function load(textRows, i, len, file) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Line} */
  var line;
  /** @type {string} */
  var text;
  /** @type {!Loc} */
  var loc;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'textRows');
    case 1:
      throw setNoArgError(new Error, 'i');
    case 2:
      throw setNoArgError(new Error, 'len');
    case 3:
      throw setNoArgError(new Error, 'file');
  }

  if ( !isArray(textRows) )
    throw setTypeError(new TypeError, 'textRows', '!Array<string>');
  if ( !isNumber(i) )
    throw setTypeError(new TypeError, 'i', 'number');
  if ( !isNumber(len) )
    throw setTypeError(new TypeError, 'len', 'number');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  if ( !isWholeNumber(i) || i < 0 )
    throw setIndexError(new RangeError, 'i', i);
  if ( !isWholeNumber(len) || len < 0 )
    throw setIndexError(new RangeError, 'len', len);

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-lines-member

  if (this.lines)
    throw setPhaseError(new Error, 'load', this);

  /// #}}} @step verify-lines-member

  /// #{{{ @step set-member-refs

  lines = [];
  setupOffProperty(this, 'lines', lines, true);

  /// #}}} @step set-member-refs

  /// #{{{ @step make-lines

  while (i < len) {
    text = textRows[i];
    loc = new Loc(++i, file);
    line = new Line(text, loc);
    if ( hasInsert(text) )
      throw setDefChildError(new SyntaxError, line, this.open);
    else if ( !hasDefine(text) )
      lines.push(line);
    else if ( !hasClose(text) )
      throw setDefChildError(new SyntaxError, line, this.open);
    else {
      this.setClose(line);
      break;
    }
  }

  /// #}}} @step make-lines

  /// #{{{ @step verify-close

  if (!this.close)
    throw setNoCloseError(new SyntaxError, this.open);

  /// #}}} @step verify-close

  /// #{{{ @step freeze-instance

  freezeObject(lines);
  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-index

  return i;

  /// #}}} @step return-index
}
/// #}}} @func Def.prototype.load

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = load;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
