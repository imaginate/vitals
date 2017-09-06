/**
 * ---------------------------------------------------------------------------
 * LIST-ITEM CONSTRUCTOR
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
var loadHelper = require('../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const LI_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var LI_TYPE = loadHelper('type-id').create('li');
/// #}}} @const LI_TYPE

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

/// #{{{ @func setLiIndentError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} INDEX
 * @param {number} DEPTH
 * @return {!SyntaxError}
 */
function setLiIndentError(err, BLOCK, INDEX, DEPTH) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'INDEX');
    case 3:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(INDEX) ) {
    throw setTypeError(new TypeError, 'INDEX', 'number');
  }
  if ( !isNumber(DEPTH) ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {number}
   */
  var INDENTS = BLOCK.makeIndent.INDENT_COUNT * (DEPTH - 1);

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^ {' + INDENTS + '}/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid line indentation for `li` list-item in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    valid-line-indent-regexp: `' + PATT + '`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 8;
  i = INDEX - 7;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
      ? '--> '
      : '    ';
    line = lines[i++] || ' ';
    line = line.replace(/`/g, '\\`');
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setLiIndentError

/// #{{{ @func setLiParentError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Block} BLOCK
 * @param {number} INDEX
 * @return {!SyntaxError}
 */
function setLiParentError(err, BLOCK, INDEX) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var msg;
  /** @type {number} */
  var end;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'INDEX');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isNumber(INDEX) ) {
    throw setTypeError(new TypeError, 'INDEX', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid line indentation for a `pre` code-block in documentation\n'
    + '    line-number-within-snippet: `' + (INDEX + 1) + '`\n'
    + '    invalid-parent-id: `"' + BLOCK.PARENT.ID + '"`\n'
    + '    valid-parent-ids: `"ol"` or `"ul"`\n'
    + '    snippet-of-lines:';

  lines = BLOCK.ROOT.LINES;
  end = INDEX + 8;
  i = INDEX - 7;
  if (end > lines.length) {
    end = lines.length;
  }
  if (i < 0) {
    i = 0;
  }
  while (i < end) {
    msg += '\n    ';
    msg += i === INDEX
      ? '--> '
      : '    ';
    line = lines[i++] || ' ';
    line = line.replace(/`/g, '\\`');
    msg += i + ' `' + line + '`';
  }

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setLiParentError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

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

/// #{{{ @func getIndent
/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getIndent = loadHelper('get-indent');
/// #}}} @func getIndent

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func ListItem
/**
 * @private
 * @param {!Block} BLOCK
 * @constructor
 * @struct
 */
function ListItem(BLOCK) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, ListItem) ) {
    throw setNewError(new SyntaxError, 'ListItem');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'BLOCK');
  }

  if ( !isBlock(BLOCK) || BLOCK.ID !== 'li' || BLOCK.TYPE.ID !== 'blk' ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-line-indentation

  if (getIndent(BLOCK.PARENT.LINES[0] || '')
      !== BLOCK.makeIndent(BLOCK.DEPTH - 1) ) {
    throw setLiIndentError(new SyntaxError, BLOCK, BLOCK.INDEX, BLOCK.DEPTH);
  }

  /// #}}} @step verify-line-indentation

  /// #{{{ @step verify-parent-id

  if (BLOCK.PARENT.ID !== 'ol' && BLOCK.PARENT.ID !== 'ul') {
    throw setLiParentError(new SyntaxError, BLOCK, BLOCK.INDEX);
  }

  /// #}}} @step verify-parent-id

  /// #{{{ @step set-instance-members

  /// #{{{ @member BLOCK
  /**
   * @const {!Block}
   */
  setConstantProperty(this, 'BLOCK', BLOCK);
  /// #}}} @member BLOCK

  /// #}}} @step set-instance-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step update-block-members

  /// #{{{ @member CLASS
  /**
   * @const {!Object}
   */
  setConstantProperty(BLOCK, 'CLASS', this);
  /// #}}} @member CLASS

  /// #{{{ @member TYPE
  /**
   * @const {!TypeId}
   */
  setConstantProperty(BLOCK, 'TYPE', LI_TYPE);
  /// #}}} @member TYPE

  /// #}}} @step update-block-members
}
/// #}}} @func ListItem

/// #{{{ @func isListItem
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isListItem = IS.listItem;
/// #}}} @func isListItem

/// #{{{ @func newListItem
/**
 * @public
 * @param {!Block} BLOCK
 * @return {!ListItem}
 */
function newListItem(BLOCK) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'BLOCK');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-list-item-instance

  return new ListItem(BLOCK);

  /// #}}} @step return-new-list-item-instance
}
/// #}}} @func newListItem

/// #{{{ @step setup-list-item-constructor

ListItem.is = isListItem;
ListItem.TYPE = LI_TYPE;
ListItem.create = newListItem;
ListItem.ListItem = ListItem;
ListItem.construct = newListItem;
ListItem.isListItem = isListItem;
ListItem.newListItem = newListItem;

/// #}}} @step setup-list-item-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = ListItem;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
