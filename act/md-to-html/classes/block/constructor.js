/**
 * ---------------------------------------------------------------------------
 * BLOCK CONSTRUCTOR
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

/// #{{{ @const BLK_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var BLK_TYPE = loadHelper('type-id').create('blk');
/// #}}} @const BLK_TYPE

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

/// #{{{ @func setBlockIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} id
 * @return {!RangeError}
 */
function setBlockIdError(err, param, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'param');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid element id for `' + param + '` parameter in `new Block` call'
    + '\n    invalid-id: `"' + id + '"`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setBlockIdError

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

/// #{{{ @func isBlockId
/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var isBlockId = loadHelper('is-block-id');
/// #}}} @func isBlockId

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isHtml
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHtml = IS.html;
/// #}}} @func isHtml

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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
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

/// #{{{ @func setProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} seal = `false`
 * @return {!Object}
 */
var setProperty = loadHelper('set-property');
/// #}}} @func setProperty

/// #}}} @group OBJECT

/// #{{{ @group SPECIAL

/// #{{{ @func getBlockId
/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getBlockId = loadHelper('get-block-id');
/// #}}} @func getBlockId

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Block
/**
 * @private
 * @param {(!Html|!Block)} parent
 * @param {number} index
 * @param {number} depth
 * @param {string=} id = `""`
 * @constructor
 * @struct
 */
function Block(parent, index, depth, id) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Block) ) {
    throw setNewError(new SyntaxError, 'Block');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'index');
    case 2:
      throw setNoArgError(new Error, 'depth');
    case 3:
      id = '';
      break;
    default:
      if ( isUndefined(id) ) {
        id = '';
      }
      else if ( !isString(id) ) {
        throw setTypeError(new TypeError, 'id', 'string=');
      }
      else if ( !!id && !isBlockId(id) ) {
        throw setBlockIdError(new RangeError, 'id', id);
      }
  }

  if ( !isBlock(parent) && !isHtml(parent) ) {
    throw setTypeError(new TypeError, 'parent', '(!Html|!Block)');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  if ( !isWholeNumber(index) ) {
    throw setWholeError(new RangeError, 'index', index);
  }
  if ( !isWholeNumber(depth) ) {
    throw setWholeError(new RangeError, 'depth', depth);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const TYPE
  /**
   * @private
   * @const {!TypeId}
   */
  var TYPE = BLK_TYPE;
  /// #}}} @const TYPE

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {(!Html|!Block)}
   */
  var PARENT = parent;
  /// #}}} @const PARENT

  /// #{{{ @const INDEX
  /**
   * @private
   * @const {number}
   */
  var INDEX = index;
  /// #}}} @const INDEX

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = depth;
  /// #}}} @const DEPTH

  /// #{{{ @const ELEMS
  /**
   * @private
   * @const {!Array<!Block>}
   */
  var ELEMS = [];
  /// #}}} @const ELEMS

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = [];
  /// #}}} @const LINES

  /// #{{{ @const RANK
  /**
   * @description
   *   The `RANK` is the *index* of the new `Block` instance's place within
   *   the `ELEMS` of its `PARENT`.
   * @private
   * @const {number}
   */
  var RANK = PARENT.ELEMS.length;
  /// #}}} @const RANK

  /// #{{{ @const ROOT
  /**
   * @private
   * @const {!Html}
   */
  var ROOT = PARENT.ROOT;
  /// #}}} @const ROOT

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = id || getBlockId(ROOT.LINES[INDEX]);
  /// #}}} @const ID

  /// #{{{ @const isEmptyLine
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isEmptyLine = ROOT.isEmptyLine;
  /// #}}} @const isEmptyLine

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = ROOT.isIndented;
  /// #}}} @const isIndented

  /// #{{{ @const makeIndent
  /**
   * @private
   * @const {!function(number): string}
   */
  var makeIndent = ROOT.makeIndent;
  /// #}}} @const makeIndent

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member DEPTH
  /**
   * @const {number}
   */
  setConstantProperty(this, 'DEPTH', DEPTH);
  /// #}}} @member DEPTH

  /// #{{{ @member ELEMS
  /**
   * @const {!Array<(!Block|!List)>}
   */
  setConstantProperty(this, 'ELEMS', ELEMS);
  /// #}}} @member ELEMS

  /// #{{{ @member END
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'END', null);
  /// #}}} @member END

  /// #{{{ @member ID
  /**
   * @const {string}
   */
  setConstantProperty(this, 'ID', ID);
  /// #}}} @member ID

  /// #{{{ @member INDEX
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDEX', INDEX);
  /// #}}} @member INDEX

  /// #{{{ @member LAST
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'LAST', null);
  /// #}}} @member LAST

  /// #{{{ @member LEN
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'LEN', null);
  /// #}}} @member LEN

  /// #{{{ @member LINES
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'LINES', LINES);
  /// #}}} @member LINES

  /// #{{{ @member PARENT
  /**
   * @const {(!Html|!Block|!List)}
   */
  setConstantProperty(this, 'PARENT', PARENT);
  /// #}}} @member PARENT

  /// #{{{ @member RANK
  /**
   * @const {number}
   */
  setConstantProperty(this, 'RANK', RANK);
  /// #}}} @member RANK

  /// #{{{ @member RESULT
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.parse` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a `string`.
   * @type {?string}
   */
  setProperty(this, 'RESULT', null);
  /// #}}} @member RESULT

  /// #{{{ @member ROOT
  /**
   * @const {!Html}
   */
  setConstantProperty(this, 'ROOT', ROOT);
  /// #}}} @member ROOT

  /// #{{{ @member TYPE
  /**
   * @type {!TypeId}
   */
  setProperty(this, 'TYPE', TYPE);
  /// #}}} @member TYPE

  /// #{{{ @member isEmptyLine
  /**
   * @private
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  setConstantProperty(this, 'isEmptyLine', isEmptyLine);
  /// #}}} @member isEmptyLine

  /// #{{{ @member isIndented
  /**
   * @private
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  setConstantProperty(this, 'isIndented', isIndented);
  /// #}}} @member isIndented

  /// #{{{ @member makeIndent
  /**
   * @private
   * @param {number} depth
   * @return {string}
   */
  setConstantProperty(this, 'makeIndent', makeIndent);
  /// #}}} @member makeIndent

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step setup-sub-class

  this = this.subClass();

  /// #}}} @step setup-sub-class

  /// #{{{ @step setup-scope

  this.scope();

  /// #}}} @step setup-scope

  /// #{{{ @step parse-lines

  this.parse();

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Block

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func newBlock
/**
 * @public
 * @param {(!Html|!Block)} parent
 * @param {number} index
 * @param {number} depth
 * @param {string=} id = `""`
 * @return {!Block}
 */
function newBlock(parent, index, depth, id) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
    case 1:
      throw setNoArgError(new Error, 'index');
    case 2:
      throw setNoArgError(new Error, 'depth');
    case 3:
      id = undefined;
      break;
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-block-instance

  return new Block(parent, index, depth, id);

  /// #}}} @step return-new-block-instance
}
/// #}}} @func newBlock

/// #{{{ @step setup-block-constructor

Block.is = isBlock;
Block.TYPE = BLK_TYPE;
Block.Block = Block;
Block.create = newBlock;
Block.isBlock = isBlock;
Block.newBlock = newBlock;
Block.construct = newBlock;

/// #}}} @step setup-block-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Block;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
