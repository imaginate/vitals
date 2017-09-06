/**
 * ---------------------------------------------------------------------------
 * CODE-BLOCK CONSTRUCTOR
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

/// #{{{ @const PRE_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var PRE_TYPE = loadHelper('type-id').create('pre');
/// #}}} @const PRE_TYPE

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

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

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

/// #}}} @group HELPERS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func CodeBlock
/**
 * @private
 * @param {!Block} BLOCK
 * @constructor
 * @struct
 */
function CodeBlock(BLOCK) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, CodeBlock) ) {
    throw setNewError(new SyntaxError, 'CodeBlock');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'BLOCK');
  }
  if ( !isBlock(BLOCK) || BLOCK.ID !== 'pre' || BLOCK.TYPE.ID !== 'blk' ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }

  /// #}}} @step verify-parameters

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
  setConstantProperty(BLOCK, 'TYPE', PRE_TYPE);
  /// #}}} @member TYPE

  /// #}}} @step update-block-members
}
/// #}}} @func CodeBlock

/// #{{{ @func isCodeBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCodeBlock = IS.codeBlock;
/// #}}} @func isCodeBlock

/// #{{{ @func newCodeBlock
/**
 * @public
 * @param {!Block} BLOCK
 * @return {!CodeBlock}
 */
function newCodeBlock(BLOCK) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'BLOCK');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-code-block-instance

  return new CodeBlock(BLOCK);

  /// #}}} @step return-new-code-block-instance
}
/// #}}} @func newCodeBlock

/// #{{{ @step setup-code-block-constructor

CodeBlock.is = isCodeBlock;
CodeBlock.TYPE = PRE_TYPE;
CodeBlock.create = newCodeBlock;
CodeBlock.construct = newCodeBlock;
CodeBlock.CodeBlock = CodeBlock;
CodeBlock.isCodeBlock = isCodeBlock;
CodeBlock.newCodeBlock = newCodeBlock;

/// #}}} @step setup-code-block-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = CodeBlock;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
