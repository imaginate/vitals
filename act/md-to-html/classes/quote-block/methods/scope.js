/**
 * ---------------------------------------------------------------------------
 * SCOPE METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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
var loadHelper = require('../../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const QUOTE_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var QUOTE_PATTERN = /^( *>+).*$/;
/// #}}} @const QUOTE_PATTERN

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadTaskHelper('set-error');
/// #}}} @func setError

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

/// #{{{ @group IS

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isHtml
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHtml = IS.html;
/// #}}} @func isHtml

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

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func QuoteBlock.prototype.scope
/**
 * @public
 * @this {!QuoteBlock}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {number} index
 * @param {number} depth
 * @return {!Block}
 */
function scopeQuoteBlock(ROOT, BLOCK, index, depth) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ROOT');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'index');
    case 3:
      throw setNoArgError(new Error, 'depth');
  }

  if ( !isHtml(ROOT, Html) || ROOT !== this.BLOCK.ROOT ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isBlock(BLOCK, Block) || BLOCK !== this.BLOCK ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  if ( !isWholeNumber(index) || index < 0 ) {
    throw setIndexError(new RangeError, 'index', index, 0);
  }
  if ( !isWholeNumber(depth) ) {
    throw setWholeError(new RangeError, 'depth', depth);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-line-variable

  line = ROOT.LINES[index];

  /// #}}} @step set-line-variable

  /// #{{{ @step set-constants

  /// #{{{ @const PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var PATTERN = new RegExp('^' + line.replace(QUOTE_PATTERN, '$1'));
  /// #}}} @const PATTERN

  /// #}}} @step set-constants

  /// #{{{ @step save-lines-in-scope

  BLOCK.LINES.push(line);

  while (++index < ROOT.LEN) {
    line = ROOT.LINES[index];
    if ( PATTERN.test(line) ) {
      BLOCK.LINES.push(line);
    }
    else {
      break;
    }
  }

  /// #}}} @step save-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLOCK;

  /// #}}} @step return-block-instance
}
/// #}}} @func QuoteBlock.prototype.scope

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = scopeQuoteBlock;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol