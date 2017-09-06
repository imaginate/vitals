/**
 * ---------------------------------------------------------------------------
 * PARSE METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} id
 * @return {!Function}
 */
var loadClass = require('../../../helpers/load-class.js');
/// #}}} @func loadClass

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
var setError = loadHelper('set-error');
/// #}}} @func setError

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

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

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

/// #}}} @group IS

/// #{{{ @group SPECIAL

/// #{{{ @func newBlock
/**
 * @private
 * @param {(!Html|!Block)} parent
 * @param {number} index
 * @param {number} depth
 * @param {string=} id = `""`
 * @return {!Block}
 */
var newBlock = loadClass('blk').create;
/// #}}} @func newBlock

/// #{{{ @func skipBlankLines
/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} len
 * @param {number} i
 * @return {number}
 */
var skipBlankLines = loadHelper('skip-blank-lines');
/// #}}} @func skipBlankLines

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func UnorderedList.prototype.parse
/**
 * @public
 * @this {!UnorderedList}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {!Array<!Block>} ELEMS
 * @param {!Array<string>} LINES
 * @param {number} LEN
 * @param {number} DEPTH
 * @return {string}
 */
function parseUnorderedList(ROOT, BLOCK, ELEMS, LINES, LEN, DEPTH) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {!Block} */
  var blk;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ROOT');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'ELEMS');
    case 3:
      throw setNoArgError(new Error, 'LINES');
    case 4:
      throw setNoArgError(new Error, 'LEN');
    case 5:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isHtml(ROOT) || ROOT !== this.BLOCK.ROOT ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isBlock(BLOCK) || BLOCK !== this.BLOCK ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isArray(ELEMS) || ELEMS !== BLOCK.ELEMS ) {
    throw setTypeError(new TypeError, 'ELEMS', '!Array<!Block>');
  }
  if ( !isArray(LINES) || LINES !== BLOCK.LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }
  if ( !isNumber(LEN) || LEN !== BLOCK.LEN ) {
    throw setTypeError(new TypeError, 'LEN', 'number');
  }
  if ( !isNumber(DEPTH) || DEPTH !== BLOCK.DEPTH ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step parse-each-line

  result = '<ul>';
  i = 0;
  while (i < LEN) {
    blk = new Block(BLOCK, i, DEPTH, 'li');
    result += blk.RESULT;
    ELEMS.push(blk);
    i = blk.END;
    i = skipBlankLines(LINES, LEN, i);
  }
  result += '</ul>';

  /// #}}} @step parse-each-line

  /// #{{{ @step return-parsed-result

  return result;

  /// #}}} @step return-parsed-result
}
/// #}}} @func UnorderedList.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseUnorderedList;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
