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

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #}}} @group OBJECT

/// #{{{ @group SPECIAL

/// #{{{ @func newBlock
/**
 * @private
 * @param {(!Html|!Block)} parent
 * @param {number} index
 * @param {number} depth
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

/// #{{{ @func Html.prototype.parse
/**
 * @public
 * @this {!Html}
 * @return {!Html}
 */
function parseHtml() {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {!Block} */
  var blk;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-constants

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = this.DEPTH;
  /// #}}} @const DEPTH

  /// #{{{ @const ELEMS
  /**
   * @private
   * @const {!Array<!Block>}
   */
  var ELEMS = this.ELEMS;
  /// #}}} @const ELEMS

  /// #{{{ @const LEN
  /**
   * @private
   * @const {number}
   */
  var LEN = this.LEN;
  /// #}}} @const LEN

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = this.LINES;
  /// #}}} @const LINES

  /// #}}} @step set-constants

  /// #{{{ @step parse-lines

  result = '';
  i = 0;
  while (i < LEN) {
    blk = newBlock(this, i, DEPTH);
    result += blk.RESULT;
    ELEMS.push(blk);
    i = skipBlankLines(LINES, LEN, blk.END);
  }

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-scoped-elements

  freezeObject(ELEMS);

  /// #}}} @step freeze-scoped-elements

  /// #{{{ @step save-result

  setConstantProperty(this, 'RESULT', result);

  /// #}}} @step save-result

  /// #{{{ @step return-html-instance

  return this;

  /// #}}} @step return-html-instance
}
/// #}}} @func Html.prototype.parse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseHtml;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
